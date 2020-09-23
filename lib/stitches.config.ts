import { createStyled } from '@stitches/react';
import colors, { border, primary } from './theme/colors';
import { scales } from './theme/space';
import { isServer } from './utils';

export const theme = {
  colors,
  fonts: {
    $default: '"Quicksand", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, sans-serif',
    $mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
  },
  space: scales,
  sizes: scales,
  fontSizes: {
    $base: '16px',
    $xs: '12px',
    $sm: '14px',
    $md: '16px',
    $lg: '18px',
    $xl: '20px',
    $2xl: '34px',
    $3xl: '30px',
    $4xl: '36px',
    $5xl: '48px',
    $6xl: '64px',
  },
  lineHeights: {
    $base: '26px',
    $xs: '19.5px',
    $sm: '22.75px',
    $md: '26px',
    $lg: '29.25px',
    $xl: '32.5px',
    $2xl: '39px',
    $3xl: '48.75px',
    $4xl: '58.5px',
    $5xl: '78px',
    $6xl: '104px',
  },
  radii: {
    $0: '0',
    $sm: '2px',
    $md: '4px',
    $lg: '8px',
    $xl: '16px',
    $round: '50%',
    $pill: '9999px',
  },
  zIndices: {
    $1: '100',
    $2: '200',
    $3: '300',
    $4: '400',
    $max: '9999',
  },
  shadows: {
    $base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    $xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
    $sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    $md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    $lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    $xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    $2xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    // 'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    // 'outline': '0 0 0 3px rgba(66, 153, 225, 0.5)',
    $none: 'none',
  },
};

type Theme = typeof theme;

export const { styled, css } = createStyled({
  tokens: theme,
  breakpoints: {
    tablet: (rule) => `@media (min-width: 640px) { ${rule} }`,
    laptop: (rule) => `@media (min-width: 768px) { ${rule} }`,
    desktop: (rule) => `@media (min-width: 1024px) { ${rule} }`,
    screen: (rule) => `@media (min-width: 1280px) { ${rule} }`,
  },
  utils: {
    p: (value: keyof Theme['space'] | (string & {})) => ({
      paddingTop: value,
      paddingBottom: value,
      paddingLeft: value,
      paddingRight: value,
    }),
    pt: (value: keyof Theme['space'] | (string & {})) => ({
      paddingTop: value,
    }),
    pr: (value: keyof Theme['space'] | (string & {})) => ({
      paddingRight: value,
    }),
    pb: (value: keyof Theme['space'] | (string & {})) => ({
      paddingBottom: value,
    }),
    pl: (value: keyof Theme['space'] | (string & {})) => ({
      paddingLeft: value,
    }),
    px: (value: keyof Theme['space'] | (string & {})) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: keyof Theme['space'] | (string & {})) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    m: (value: keyof Theme['space'] | (string & {})) => ({
      marginTop: value,
      marginBottom: value,
      marginLeft: value,
      marginRight: value,
    }),
    mt: (value: keyof Theme['space'] | (string & {})) => ({
      marginTop: value,
    }),
    mr: (value: keyof Theme['space'] | (string & {})) => ({
      marginRight: value,
    }),
    mb: (value: keyof Theme['space'] | (string & {})) => ({
      marginBottom: value,
    }),
    ml: (value: keyof Theme['space'] | (string & {})) => ({
      marginLeft: value,
    }),
    mx: (value: keyof Theme['space'] | (string & {})) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: keyof Theme['space'] | (string & {})) => ({
      marginTop: value,
      marginBottom: value,
    }),

    bg: (value: keyof Theme['colors'] | (string & {})) => ({
      background: value,
    }),
    bc: (value: keyof Theme['colors'] | (string & {})) => ({
      backgroundColor: value,
    }),
    br: (value: keyof Theme['radii'] | (string & {})) => ({
      borderRadius: value,
    }),

    textSize: (value: keyof Theme['fontSizes']) => ({
      fontSize: value,
      lineHeight: theme.lineHeights[value],
    }),

    size: (value: keyof Theme['sizes'] | (string & {})) => ({
      width: value,
      height: value,
    }),

    shadow: (value: keyof Theme['shadows'] | (string & {})) => ({
      boxShadow: value,
    }),

    $outline: (offset: number) => ({
      ':not(:disabled)': {
        'position': 'relative',
        'outline': 'none',

        '::before': {
          content: `''`,
          display: 'block',
          position: 'absolute',
          top: `calc(-1 * ${offset}px)`,
          right: `calc(-1 * ${offset}px)`,
          bottom: `calc(-1 * ${offset}px)`,
          left: `calc(-1 * ${offset}px)`,
          transitionProperty: 'box-shadow',
          transitionDuration: '0.2s',
          transitionTimingFunction: 'ease-in-out',
          pointerEvents: 'none',
          br: 'inherit',
        },

        ':focus-visible::before': {
          boxShadow: '0 0 0 2px $text',
        },
      },
    }),

    $inputStyles: (style: 'default' | 'primary') => {
      const colors = style === 'default' ? border : primary;
      return {
        'border': '1px solid $borderDefault',
        'borderColor': colors.$default,
        '&:hover': {
          borderColor: colors.$hover,
          bc: '$gray100',
        },
        ':disabled': {
          bc: '$gray200',
          color: '$textDisabled',
          borderColor: 'transparent',
        },
        ':active': {
          borderColor: colors.$active,
          bc: '$gray200',
        },
      };
    },
  },
});

css.global({
  'body': { margin: '0' },
  '*': {
    'boxSizing': 'border-box',
    'fontFamily': '$default',
    '::before,::after': {
      boxSizing: 'border-box',
    },
  },
});

(function addFont() {
  if (isServer) {
    return;
  }
  const link = document.createElement('link');

  link.href = 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap';
  link.rel = 'stylesheet';

  document.head.appendChild(link);
})();
