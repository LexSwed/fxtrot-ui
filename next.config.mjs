import remarkFrontmatter from 'remark-frontmatter';
import { remarkMdxFrontmatter } from 'remark-mdx-frontmatter';
import rehypeSlug from 'rehype-slug';
import createWithMdx from '@next/mdx';
import remarkGfm from 'remark-gfm';
import { remarkNextStaticProps } from './plugins/remark-next-static-props.mjs';

const metaPropName = 'meta';

const withMDX = createWithMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: metaPropName }],
      [remarkNextStaticProps, { name: metaPropName }],
      remarkGfm,
    ],
    rehypePlugins: [rehypeSlug],
    providerImportSource: '@mdx-js/react',
  },
});

export default withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    plugins: true,
    concurrentFeatures: false,
    scrollRestoration: true,
    esmExternals: true,
  },
});
