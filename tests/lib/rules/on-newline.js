/**
 * @fileoverview This rule enforces consistent placement of callback functions.
 * @author Harendra Singh
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/on-newline');
var RuleTester = require('eslint').RuleTester;

var onNewLineErrors = [{
  message: 'function on new line',
  type: 'FunctionExpression'
}];

var ruleTester = new RuleTester();

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run('simple callback', rule, {
  valid: [{
    code:
      'API.get(                                                  \n\
        function () {                                            \n\
                                                                 \n\
        }                                                        \n\
      );'
  }],
  invalid: [{
    code: 'API.get(function () {})',
    errors: onNewLineErrors
  }]
});

ruleTester.run('callee on newline', rule, {
  valid: [{
    code:
      'API                                                      \n\
        .get(                                                   \n\
          function () {                                         \n\
                                                                \n\
          }                                                     \n\
        );'
  }],
  invalid: [{
    code:
      'API                                                      \n\
        .get(function () {                                      \n\
                                                                \n\
        });',
    errors: onNewLineErrors
  }]
});

ruleTester.run('callback with sibling arguments', rule, {
  valid: [{
    code:
      'API                                                      \n\
        .get(\'argument-1\', \'argument-2\',                    \n\
          \'argument-3\',                                       \n\
          function () {                                         \n\
                                                                \n\
          },                                                    \n\
          \'argument-4\'                                        \n\
        );'
  }],
  invalid: [{
    code:
      'API                                                      \n\
        .get(\'argument-1\', \'argument-2\',                    \n\
          \'argument-3\', function () {                         \n\
                                                                \n\
          }                                                     \n\
        );',
    errors: onNewLineErrors
  }]
});

ruleTester.run('callback where callee is MemberExpression', rule, {
  valid: [{
    code:
      '_.chain(names)                                           \n\
        .map(                                                   \n\
          function (name) {                                     \n\
            return name.toUpper();                              \n\
          }                                                     \n\
        )                                                       \n\
        .value();'
  }],
  invalid: [{
    code:
      'API                                                      \n\
        .get(\'argument-1\', \'argument-2\',                    \n\
          \'argument-3\', function () {                         \n\
                                                                \n\
          }                                                     \n\
        );',
    errors: onNewLineErrors
  }]
});

ruleTester.run('callback where callee is Identifier ' +
  'and CallExpression has multiple arguments', rule, {
  valid: [{
    code:
      'setTimeout(                                             \n\
        function () {                                          \n\
                                                               \n\
        },                                                     \n\
        1000                                                   \n\
      );'

  }],
  invalid: [{
    code:
      'setTimeout(function () {                                 \n\
                                                                \n\
      }, 1000);',
    errors: onNewLineErrors
  }]
});

ruleTester.run('callback along with variable declaration', rule, {
  valid: [{
    code:
      'var x;                                                   \n\
        x = _.map(values,                                       \n\
        function (value) {                                      \n\
                                                                \n\
        }                                                       \n\
      );'

  }],
  invalid: [{
    code:
    'x = _.map(values, function (value) {                       \n\
                                                                \n\
                                                                \n\
      }                                                         \n\
    );',
    errors: onNewLineErrors
  }]
});
