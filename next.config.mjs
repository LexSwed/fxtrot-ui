import remarkFrontmatter from 'remark-frontmatter';
import { remarkMdxFrontmatter } from 'remark-mdx-frontmatter';
import rehypeSlug from 'rehype-slug';
import createWithMdx from '@next/mdx';

const withMDX = createWithMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter, [remarkMdxFrontmatter, { name: 'meta' }]],
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
