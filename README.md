# prop-types-falsy

[![npm](https://img.shields.io/npm/v/prop-types-falsy.svg)](https://www.npmjs.com/package/prop-types-falsy)

## Installation

```sh
npm install prop-types-falsy
```

## Usage

```js
const falsy = require('prop-types-falsy');

MyComponent.propTypes = {
  items: PropTypes.arrayOf([
    PropTypes.oneOfType([
      PropTypes.shape({
        x: PropTypes.string.isRequired,
        y: PropTypes.number.isRequired,
      }),
      falsy,
    ]),
  ]).isRequired,
};

<MyComponent
  items={[
    {
      x: 'hello',
      y: 10,
    },
    isXxxx && {
      x: 'cool',
      y: 100,
    },
    myItems.length && {
      x: 'wow',
      y: 1000,
    },
  ]}
/>;
```

## License

MIT © [C.T.Lin](https://github.com/chentsulin/prop-types-falsy)
