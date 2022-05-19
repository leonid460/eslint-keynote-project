module.exports = {
  rules: {
    'no-distinct-from-local-styled': {
      create: function (context) {
        return {
          ImportDeclaration(node) {
            context.report({
              node,
              message: 'Some error message',
            });
          }
        }
      }
    }
  }
}

