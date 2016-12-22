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

var ruleTester = new RuleTester();
ruleTester.run("on-newline", rule, {

  valid: [{
    code:
      'API.get(\n'+
      '  function () {\n' +
      '   \n' +
      '  }\n' +
      ');'
  }],

  invalid: [{
    code: "API.get(function () {})",
    errors: [{
      message: "function on new line",
      type: "FunctionExpression"
    }]
  }]
});
