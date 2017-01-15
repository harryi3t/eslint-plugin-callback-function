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
      ReturnStatement: function (rNode) {
        if (rNode.argument && rNode.argument.type === 'CallExpression')
          rNode.argument.arguments.forEach(
            function (arg) {
              if (arg.type === 'FunctionExpression') {
                var node = getLastNodeOnSameLineForRS(arg, rNode);
                if (node)
                  reportError(context, node, arg, 'return');
              }
            }
          );
      },
      VariableDeclaration: function (vNode) {
        vNode.declarations.forEach(
          function (vd) {
            if (vd.init && vd.init.type === 'CallExpression') {
              vd.init.arguments.forEach(
                function (arg) {
                  if (arg.type === 'FunctionExpression') {
                    var node = getLastNodeOnSameLineForVD(arg, vNode, vd);
                    if (node)
                      reportError(context, node, arg, 'variable');
                  }
                }
              );
            }
          }
        );
      },
      CallExpression: function (cNode) {
        cNode.arguments.forEach(
          function (arg, index) {
            if (arg.type === 'FunctionExpression') {
              var node;
              var sourceCode = context.getSourceCode();
              var nodeSource = sourceCode.getText(cNode, 7, 0);
              if (nodeSource.slice(0, 6) === 'return' ||
                nodeSource.slice(5, 7).indexOf('=') !== -1)
                return;

              if (index > 0)
                node = getLastNodeOnSameLineForCE(arg, cNode, cNode.arguments[index-1]);
              else
                node = getLastNodeOnSameLineForCE(arg, cNode);
              if (node)
                reportError(context, node, arg, 'return');
            }
          }
        );
      }
    };
  }
};

function reportError(context, node, arg, err) {
  if (!IS_AUTOFIX_ENABLE)
    context.report(arg, 'function on new line');
  else
    context.report({
      node: arg,
      message: 'function on new line ' + err,
      fix: fixIndentation.bind(null, context, node, arg)
    });
}
function getLastNodeOnSameLineForCE(FE, node, prevArg) {
  if (prevArg && !areOnSameLine(FE, prevArg)) return null;
  if (node.callee.property && !areOnSameLine(FE, node.callee.property))
    return prevArg && node.callee.property;
  if (!areOnSameLine(FE, node.callee)) return node.callee.property;
  if (!areOnSameLine(FE, node)) return node.callee;
  return node;
}
function getLastNodeOnSameLineForRS(FE, node) {
  if (node.argument.callee.property &&
    !areOnSameLine(FE, node.argument.callee.property)) return null;
  if (!areOnSameLine(FE, node.argument.callee)) return node.argument.callee.property;
  if (!areOnSameLine(FE, node.argument)) return node.argument.callee;
  if (!areOnSameLine(FE, node)) return node.argument;
  return node;
}
function getLastNodeOnSameLineForVD(FE, node, vd) {
  if (!areOnSameLine(FE, vd.init.callee.property)) return null;
  if (!areOnSameLine(FE, vd.init.callee)) return vd.init.callee.property;
  if (!areOnSameLine(FE, vd.init)) return vd.init.callee;
  if (!areOnSameLine(FE, vd)) return vd.init;
  if (!areOnSameLine(FE, node)) return vd;
  return node;
}

function indent(num) {
  var output = '';
  for (var i=0; i<num; i++) {
    output += INDENT_CHAR;
  }
  return output;
}

function fixIndentation(context, node, arg, fixer) {
  var colToIndent = node.loc.start.column;
  if (colToIndent % 2 !== 0) colToIndent--;
  var startIndent = colToIndent + INDENT_LEVEL;
  var endIndent = colToIndent;

  var sourceCode = context.getSourceCode();
  var nodeSource = sourceCode.getText(arg, 0, 1);
  var endIndentReq = nodeSource.slice(-2) === '})';
  if (endIndentReq) {
    nodeSource = '\n' + indent(startIndent) + nodeSource.slice(0, -1) + '\n'
      + indent(endIndent);
    return fixer.replaceText(arg, nodeSource);
  }

  return fixer.insertTextBefore(arg, '\n' + indent(startIndent));
}

function areOnSameLine(node1, node2) {
  return node1.loc.start.line === node2.loc.start.line;
}
