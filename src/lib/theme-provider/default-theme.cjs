/** @satisfies {import('./types').Theme} */
const defaultTheme = {
  colors: {
    'primary': 'hsl(202 100% 30.6%)',
    'on-primary': 'hsl(0 0% 100%)',
    'primary-container': 'hsl(212 100% 90%)',
    'on-primary-container': 'hsl(206 100% 10%)',
    'secondary': 'hsl(227 43% 46%)',
    'on-secondary': 'hsl(0 0% 100%)',
    'secondary-container': 'hsl(231 100% 93%)',
    'on-secondary-container': 'hsl(224 100% 16%)',
    'tertiary': 'hsl(328 95.8% 37.1%)',
    'on-tertiary': 'hsl(0 0% 100%)',
    'tertiary-container': 'hsl(343 100% 92.5%)',
    'on-tertiary-container': 'hsl(333 100% 12.2%)',
    'success': 'hsl(167 100% 21%)',
    'on-success': 'hsl(0 0% 100%)',
    'success-container': 'hsl(162 90% 73%)',
    'on-success-container': 'hsl(165 94% 6%)',
    'error': 'hsl(340 71% 41%)',
    'on-error': 'hsl(0 0% 100%)',
    'error-container': 'hsl(351 100% 93%)',
    'on-error-container': 'hsl(341 100% 13%)',
    'outline': 'hsl(217 5% 47%)',
    'background': 'hsl(260 100% 99.4%)',
    'on-background': 'hsl(0 0% 10.6%)',
    'surface': 'hsl(260 100% 99.4%)',
    'on-surface': 'hsl(0 0% 10.6%)',
    'surface-variant': 'hsl(217 5% 90%)',
    'on-surface-variant': 'hsl(215 6% 40%)',
    'inverse-surface': 'hsl(225 4.1% 19.2%)',
    'inverse-on-surface': 'hsl(255 15.4% 94.9%)',
    'disabled': 'hsl(0deg 0% 90%)',
    'on-disabled': 'hsl(204 9.1% 30%)',
  },
  // Tailwind default + xs and popper
  boxShadow: {
    'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    'none': 'none',
    'xs': '0 0 0 1px rgba(0, 0, 0, 0.05)',
    'popper': `0 0 2px rgb(0 0 0 / 0.3), 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)`,
  },
  // Tailwind default + xs, sm, md, etc
  spacing: {
    px: '1px',
    0: '0px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
    get xs() {
      return defaultTheme.spacing['1'];
    },
    get sm() {
      return defaultTheme.spacing['2'];
    },
    get md() {
      return defaultTheme.spacing['6'];
    },
    get lg() {
      return defaultTheme.spacing['8'];
    },
    get xl() {
      return defaultTheme.spacing['10'];
    },
  },
  fontFamily: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, sans-serif',
    serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    mono: 'Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
  },
  // fontSize: {
  //   'xs': ['0.75rem', '1rem'],
  //   'sm': ['0.875rem', '1.25rem'],
  //   'md': ['1rem', '1.5rem'],
  //   'lg': ['1.125rem', '1.75rem'],
  //   'xl': ['1.25rem', '1.75rem'],
  //   '2xl': ['1.5rem', '2rem'],
  //   '3xl': ['1.875rem', '2.25rem'],
  //   '4xl': ['2.25rem', '2.5rem'],
  //   '5xl': ['3rem', '1'],
  //   '6xl': ['3.75rem', '1'],
  //   '7xl': ['4.5rem', '1'],
  //   '8xl': ['6rem', '1'],
  //   '9xl': ['8rem', '1'],
  // },
};

module.exports = defaultTheme;
