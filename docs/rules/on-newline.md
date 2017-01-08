# This rule enforces consistent placement of callback functions. (on-newline)

:wrench: The --fix option on the command line automatically fixes problems reported by this rule.

:warning: This option is not very stable so it's turned off by default. To turn it on use `auto-fix` as an option
```js
 "callback-function/on-newline": ["error", "auto-fix"]
```

When a callback function is passed inline to an expression,
then it's difficult to see the body of the callback function from the expression itself.
Placing the callback function always on newline makes the code more readable.

## Rule Details

This rule aims to enforce the restriction that any callback function must begin on a newline.

:thumbsdown: Examples of **incorrect** code for this rule:

```js
/*eslint callback-function/on-newline: "error"*/

var API = {};

API.get(function() {});

API
  .get(function() {

  });

API
  .get("argument-1", "argument-2",
    "argument-3", "argument-4", function() {

    });


var names = ['foo', 'bar'];
names.map(function (name) {
  return name.toUpper();
});

var _ = require('underscore');
_.chain(names)
  .map(function (name) {
    return name.toUpper();
  })
  .value();


```

:thumbsup: Examples of **correct** code for this rule:

```js
/*eslint callback-function/on-newline: "error"*/

var API = {};
API.get(
  function() {

  }
);

API
  .get(
    function() {

    }
  );

API
  .get("argument-1", "argument-2",
    "argument-3", "argument-4",
    function() {

    }
  );


var names = ['foo', 'bar'];
names.map(
  function (name) {
    return name.toUpper();
  }
);

var _ = require('underscore');
_.chain(names)
  .map(
    function (name) {
      return name.toUpper();
    }
  )
  .value();

```

## When Not To Use It

When you want to leave the decision of placement of callback functions to the developers and don't care about the consistency.
