/**
 * @fileoverview This rule enforces consistent placement of callback functions.
 * @author Harendra Singh
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'This rule enforces consistent placement of callback functions.',
      category: 'plugin',
      recommended: false
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create: function(context) {

    return {
      CallExpression: function (node) {
        if (node.arguments && node.arguments.length > 0) {
          var args = node.arguments;

          args.forEach(
            function(arg, index) {
              if (arg.type === 'FunctionExpression') {
                var functionLine = arg.loc.start.line;
                var parentLine = node.callee.loc.end.line;

                if (args.length > 1)
                  parentLine = args[index - 1].loc.end.line;

                if (functionLine === parentLine)
                  context.report(arg, 'function on new line');
              }
            }
          );
        }
      }

    };

  }
};
