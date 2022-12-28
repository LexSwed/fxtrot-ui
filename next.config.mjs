import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeSlug from 'rehype-slug';
import createWithMdx from '@next/mdx';
import remarkGfm from 'remark-gfm';
import remarkMdxCodeMeta from 'remark-mdx-code-meta';
import { remarkNextStaticProps } from './plugins/remark-next-static-props.mjs';

const metaPropName = 'meta';

const withMDX = createWithMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      [remarkFrontmatter],
      [remarkMdxFrontmatter, { name: metaPropName }],
      [remarkNextStaticProps, { name: metaPropName }],
      [remarkMdxCodeMeta],
      [remarkGfm],
    ],
    rehypePlugins: [rehypeSlug],
    providerImportSource: '@mdx-js/react',
  },
});

export default withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
  experimental: {
    scrollRestoration: true,
    esmExternals: true,
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
});
