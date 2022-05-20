module.exports = {
  rules: {
    'no-distinct-from-local-styled': {
      create: function (context) {
        return {
          ImportDeclaration(node) {
            const { specifiers, source } = node;
            const message = `import from local styled only under "Styled" namespace`;

            if (source.value !== './styled') {
              return;
            }

            specifiers.forEach(({ type, local }) => {
              if (type === 'ImportNamespaceSpecifier') {
                if (local.name !== 'Styled') {
                  context.report({ node, message });
                }

                return;
              }

              if (type === 'ImportSpecifier' || type === 'ImportDefaultSpecifier') {
                context.report({ node, message });
              }
            });
          }
        }
      }
    }
  }
}

