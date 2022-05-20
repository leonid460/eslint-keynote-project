module.exports = {
  rules: {
    'no-distinct-from-local-styled': {
      meta: {
        fixable: 'code'
      },
      create: function (context) {
        return {
          ImportDeclaration(node) {
            const { specifiers, source } = node;
            const message = `import from local styled only under "Styled" namespace`;
            const fix = (fixer) => fixer.replaceText(node, `import * as Styled from './styled'`);

            if (source.value !== './styled') {
              return;
            }

            specifiers.forEach(({ type, local }) => {
              if (type === 'ImportNamespaceSpecifier') {
                if (local.name !== 'Styled') {
                  context.report({ node, message, fix });
                }

                return;
              }

              if (type === 'ImportSpecifier' || type === 'ImportDefaultSpecifier') {
                context.report({ node, message, fix });
              }
            });
          }
        }
      }
    }
  }
}

