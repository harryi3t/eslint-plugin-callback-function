/**
 * @fileoverview This rule enforces consistent placement of callback functions.
 * @author Harendra Singh
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/on-newline");
var RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var validCodeSnippets = [
  'API.get(                                                 \n\
    function () {                                           \n\
                                                            \n\
    }                                                       \n\
  );',
  'longApiName                                              \n\
    .get(                                                   \n\
      function () {                                         \n\
                                                            \n\
      }                                                     \n\
    );',
  'longApiName                                              \n\
    .get(\'argument-1\', \'argument-2\', \'argument-3\',    \n\
      function () {                                         \n\
                                                            \n\
      },                                                    \n\
      \'argument-4\'                                        \n\
    );'
];

var inValidCodeSnippets = [
  'API.get(function () {})',
  'longApiName                                              \n\
    .get(function () {                                      \n\
                                                            \n\
      }                                                     \n\
    );',
  'longApiName                                              \n\
    .get(\'argument-1\', \'argument-2\', function () {      \n\
                                                            \n\
      }, \'argument-4\'                                     \n\
    );'
];

var validSnippets = validCodeSnippets.map(
  function (code) {
    return {code: code};
  }
);

var inValidSnippets = inValidCodeSnippets.map(
  function (code) {
    return {
      code: code,
      errors: [{
        message: "function on new line",
        type: "FunctionExpression"
      }]
    };
  }
);

var ruleTester = new RuleTester();
ruleTester.run("on-newline", rule, {
  valid: validSnippets,
  invalid: inValidSnippets
});
