import remarkFrontmatter from 'remark-frontmatter';
import { remarkMdxFrontmatter } from 'remark-mdx-frontmatter';
import rehypeSlug from 'rehype-slug';
import createWithMdx from '@next/mdx';
import remarkGfm from 'remark-gfm';
import { parse } from 'acorn';

const metaPropName = 'meta';
/**
 * AST transformer adds `getStaticProps` to the tree based on provided mapping.
 * See https://github.com/mdx-js/mdx/discussions/1896#discussioncomment-1951093
 */
export function remarkExportMeta() {
  return function transformer(tree) {
    tree.children.push({
      type: 'mdxjsEsm',
      data: {
        estree: parse(
          `
          export const getStaticProps = async () => {
            return {
              props: {
                ${metaPropName}
              },
            }
          }`.trim(),
          {
            sourceType: 'module',
            ecmaVersion: 'latest',
          }
        ),
      },
    });
  };
}

const withMDX = createWithMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter, [remarkMdxFrontmatter, { name: metaPropName }], remarkExportMeta, remarkGfm],
    rehypePlugins: [rehypeSlug],
    providerImportSource: '@mdx-js/react',
  },
});

export default withMDX({
  // Append the default value with md extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    plugins: true,
    concurrentFeatures: false,
    scrollRestoration: true,
    esmExternals: true,
  },
});
