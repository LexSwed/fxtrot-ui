const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');
const { lightColors } = require('./theme-provider/theme/colors.cjs');
const { createTailwindColors } = require('./theme-provider/theme/utils.cjs');

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
    opacity: {
      ...defaultTheme.opacity,
      15: '0.15',
    },
    boxShadow: {
      ...defaultTheme.boxShadow,
      xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
      popper: `0 0 2px rgb(0 0 0 / 0.3), ${defaultTheme.boxShadow.xl}`,
    },
    spacing: {
      ...defaultTheme.spacing,
      none: defaultTheme.spacing['0'],
      xs: defaultTheme.spacing['1'],
      sm: defaultTheme.spacing['2'],
      md: defaultTheme.spacing['6'],
      lg: defaultTheme.spacing['8'],
      xl: defaultTheme.spacing['10'],
      base: defaultTheme.spacing['10'],
    },
    fontFamily: {
      sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'sans-serif'],
      mono: ['Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
    },
    /** @type {import('./theme-provider/theme/colors').TailwindVariables} */
    colors: createTailwindColors(lightColors),
    data: {
      'state-open': 'state~="open"',
      'state-closed': 'state~="closed"',
    },
  },
  plugins: [logicalPropertiesPlugin],
};
