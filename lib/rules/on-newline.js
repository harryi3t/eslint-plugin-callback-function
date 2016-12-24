/**
 * @fileoverview This rule enforces consistent placement of callback functions.
 * @author Harendra Singh
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "This rule enforces consistent placement of callback functions.",
      category: "plugin",
      recommended: false
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create: function(context) {

    return {
      ExpressionStatement(node) {
        if (node.expression && node.expression.arguments
          && node.expression.arguments.length > 0) {
          node.expression.arguments.forEach(function(arg) {
            if (arg.type === 'FunctionExpression') {
              var functionLine = arg.loc.start.line;
              var parentLine = node.expression.callee.loc.end.line;
              if (functionLine === parentLine)
                context.report(arg, 'function on new line');
            }
          });
        }
      }
    };

  }
};
