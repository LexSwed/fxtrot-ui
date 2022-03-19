import * as path from 'path';
import * as fs from 'fs';
import { parse } from 'acorn';

/**
 * AST transformer adds `getStaticProps` to the tree based on provided mapping.
 * See https://github.com/mdx-js/mdx/discussions/1896#discussioncomment-1951093
 * @type {import('unified').Plugin<[{ name: string }]|void[], import('mdast').Root>}
 */
export function remarkNextStaticProps({ name }) {
  return function transformer(tree) {
    tree.children.push({
      type: 'mdxjsEsm',
      data: {
        estree: parse(
          `
          ${fs.readFileSync(path.join(process.cwd(), 'plugins/get-docs-meta.mjs'), 'utf8')};

          export const getStaticProps = async () => {
            const docs = await getDocsMeta();
            return {
              props: {
                meta: ${name},
                docs
              },
            }
          };`.trim(),
          {
            sourceType: 'module',
            ecmaVersion: 'latest',
          }
        ),
      },
    });
  };
}
