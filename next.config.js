const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [import('rehype-slug')],
    providerImportSource: '@mdx-js/react',
  },
});

module.exports = withMDX({
  // Append the default value with md extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    plugins: true,
    concurrentFeatures: false,
    scrollRestoration: true,
  },
});
