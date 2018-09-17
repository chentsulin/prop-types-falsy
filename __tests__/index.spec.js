const PropTypes = require('prop-types');

const falsy = require('..');

function resetWarningCache() {
  jest.resetModules();
}

function getPropTypeWarningMessage(propTypes, object, componentName) {
  if (!console.error.calls) {
    spyOn(console, 'error');
  } else {
    console.error.calls.reset();
  }
  resetWarningCache();

  PropTypes.checkPropTypes(propTypes, object, 'prop', componentName);
  const callCount = console.error.calls.count();
  if (callCount > 1) {
    throw new Error('Too many warnings.');
  }
  const message = console.error.calls.argsFor(0)[0] || null;
  console.error.calls.reset();

  return message;
}

function typeCheckPass(declaration, value) {
  const propTypes = {
    testProp: declaration,
  };
  const props = {
    testProp: value,
  };
  const message = getPropTypeWarningMessage(propTypes, props, 'testComponent');
  expect(message).toBe(null);
}

function typeCheckFail(declaration, value, expectedMessage) {
  const propTypes = {
    testProp: declaration,
  };
  const props = {
    testProp: value,
  };
  const message = getPropTypeWarningMessage(propTypes, props, 'testComponent');
  if (expectedMessage) {
    expect(message).toContain(expectedMessage);
  } else {
    expect(message).toBeDefined();
  }
}

it('should not warn for valid values', () => {
  typeCheckPass(falsy, false);
  typeCheckPass(falsy, null);
  typeCheckPass(falsy, undefined);
  typeCheckPass(falsy, 0);
  typeCheckPass(falsy, NaN);
  typeCheckPass(falsy, '');
});

// TODO: improve failed messages
it('should warn for invalid values', () => {
  typeCheckFail(falsy, true);
  typeCheckFail(falsy, 100);
  typeCheckFail(falsy, 'non-empty');
});

it('should support the arrayOf propTypes', () => {
  typeCheckPass(PropTypes.arrayOf(falsy), [false, null, undefined, 0, NaN, '']);
});
