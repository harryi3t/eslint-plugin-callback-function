# This rule enforces consistent placement of callback functions. (on-newline)

When a callback function is passed inline to an expression,
then it's difficult to see the body of the callback function from the expression itself.
Placing the callback function always on newline makes the code more readable.

## Rule Details

This rule aims to enforce the restriction that any callback function must begin on a newline.

Examples of **incorrect** code for this rule:

```js

var names = ['foo', 'bar'];
names.map(function (name) {return name.toUpper();});

names.map(function (name) {
  return name.toUpper();
});

_.chain(names)
  .map(function (name) {
    return name.toUpper();
  })
  .value();

API.get('query', 'param1', 'param2', function (result) {
  // do someting with result
}, 'param3');

```

Examples of **correct** code for this rule:

```js

var names = ['foo', 'bar'];
names.map(
  function (name) {
    return name.toUpper();
  }
);

_.chain(names)
  .map(
    function (name) {
      return name.toUpper();
    }
  )
  .value();

API.get('query', 'param1', 'param2',
  function (result) {
    // do someting with result
  },
  'param3'
);

```

## When Not To Use It

When you want to leave the decision of placement of callback functions to the developers and don't care about the consistency.
