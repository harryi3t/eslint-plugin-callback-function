/**
 * @fileoverview This rule enforces consistent placement of callback functions.
 * @author Harendra Singh
 */
'use strict';

require('../polyfill/includes.js');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var INDENT_LEVEL = 2;
var INDENT_CHAR = ' ';
var IS_AUTOFIX_ENABLE = false;

module.exports = {
  meta: {
    fixable: 'whitespace', // or "code" or "whitespace"
    schema: [{
      enum: ['auto-fix']
    }]
  },
  create: function(context) {
    if (context.options.includes('auto-fix'))
      IS_AUTOFIX_ENABLE = true;

    return {
      CallExpression: callExpressionRule.bind(null, context),
      ReturnStatement: function (node) {
        if (node.argument && node.argument.type === 'CallExpression' &&
          areOnSameLine(node, node.argument)) {
            callExpressionRule(context, node.argument, node);
          }
      }
    };
  }
};

function indent(num) {
  var output = '';
  for (var i=0; i<num; i++) {
    output += INDENT_CHAR;
  }
  return output;
}

function fixIndentation(node, arg, fixer) {
  var colToIndent = 0;
  if (!node.callee) {
    console.log(node);
    return;
  }
  if (node.type === 'ReturnStatement' ||
    areOnSameLine(node.callee.property || node.callee, node)) {
    colToIndent = node.loc.start.column + INDENT_LEVEL;
  }
  else
    colToIndent = node.callee.property.loc.start.column - 1 + INDENT_LEVEL;

  return fixer.insertTextBefore(arg, '\n' + indent(colToIndent));
}

function areOnSameLine(node1, node2) {
  return node1.loc.start.line === node2.loc.start.line;
}

function callExpressionRule(context, callNode, returnNode) {
  if (callNode.arguments && callNode.arguments.length > 0) {
    var args = callNode.arguments;

    args.forEach(
      function(arg, index) {
        if (arg.type === 'FunctionExpression') {
          var functionLine = arg.loc.start.line;
          var parentLine = callNode.callee.loc.end.line;

          if (index > 0)
            parentLine = args[index - 1].loc.end.line;

          if (functionLine === parentLine) {
            if (!IS_AUTOFIX_ENABLE)
              context.report(arg, 'function on new line');
            else
              context.report({
                node: arg,
                message: 'function on new line',
                fix: fixIndentation.bind(null, returnNode || callNode, arg)
              });
          }
        }
      }
    );
  }
}
