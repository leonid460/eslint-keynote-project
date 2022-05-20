module.exports = {
  rules: {
    'no-distinct-from-local-styled': {
      meta: {
        fixable: 'code'
      },
      create: function (context) {
        const { options } = context;
        const { styledFileName , namespaceName } = options[0];
        const message = `import from local ${styledFileName} only under "${namespaceName}" namespace`;

        return {
          ImportDeclaration(node) {
            const { specifiers, source } = node;

            const fix = (fixer) => fixer.replaceText(node, `import * as Styled from './styled'`);
            const errorReport = () => context.report({ node, message, fix });

            if (source.value !== `./${styledFileName}`) {
              return;
            }

            specifiers.forEach(({ type, local }) => {
              if (type === 'ImportNamespaceSpecifier') {
                if (local.name !== namespaceName) {
                  errorReport();
                }

                return;
              }

              if (type === 'ImportSpecifier' || type === 'ImportDefaultSpecifier') {
                errorReport();
              }
            });
          }
        }
      }
    }
  }
}

