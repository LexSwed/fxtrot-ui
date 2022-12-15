const plugin = require('tailwindcss/plugin');
const fxtrotTheme = require('./theme-provider/default-theme.cjs');
const { createTailwindVariables } = require('./utils.cjs');

/**
 * Overrides default -top, -bottom, etc with CSS Logical Properties
 * @type {import('tailwindcss/plugin')} */
// @ts-ignore
const logicalPropertiesPlugin = plugin(({ matchUtilities, theme }) => {
  matchUtilities(
    {
      pt: (value) => ({
        paddingBlockStart: value,
      }),
      pb: (value) => ({
        paddingBlockEnd: value,
      }),
      pl: (value) => ({
        paddingInlineStart: value,
      }),
      pr: (value) => ({
        paddingInlineEnd: value,
      }),
      py: (value) => ({
        paddingBlock: value,
      }),
      px: (value) => ({
        paddingInline: value,
      }),
    },
    { values: theme('padding') }
  );
  matchUtilities(
    {
      mt: (value) => ({
        marginBlockStart: value,
      }),
      mb: (value) => ({
        marginBlockEnd: value,
      }),
      ml: (value) => ({
        marginInlineStart: value,
      }),
      mr: (value) => ({
        marginInlineEnd: value,
      }),
      my: (value) => ({
        marginBlock: value,
      }),
      mx: (value) => ({
        marginInline: value,
      }),
    },
    { values: theme('margin') }
  );
  matchUtilities(
    {
      size: (value) => ({
        blockSize: value,
        inlineSize: value,
      }),
    },
    { values: theme('height') }
  );
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // @ts-expect-error
      ...createTailwindVariables(fxtrotTheme),
      opacity: {
        15: '0.15',
      },
    },
  },
  plugins: [logicalPropertiesPlugin],
};
