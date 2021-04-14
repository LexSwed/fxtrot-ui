const { withDokz } = require('dokz/dist/plugin');

module.exports = withDokz({
  future: {
    webpack5: true,
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
});
