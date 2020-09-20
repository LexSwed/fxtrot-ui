import { createStyled } from '@stitches/react';
import colors from './theme/colors';

const scales = {
  $0: '0px',
  $1: '4x',
  $2: '8px',
  $3: '12px',
  $4: '16px',
  $5: '20px',
  $6: '24px',
  $8: '32px',
  $10: '40px',
  $12: '48px',
  $16: '64px',
  $20: '80px',
  $24: '96px',
  $32: '128px',
  $40: '160px',
  $48: '192px',
  $56: '224px',
  $64: '256px',
};

export const theme = {
  colors,
  fonts: {
    $default:
      '14px/20px 500 Source Sans Pro, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, sans-serif',
    $mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
  },
  space: scales,
  sizes: scales,
  fontSizes: {
    $xs: '12px',
    $sm: '14px',
    $base: '16px',
    $lg: '18px',
    $xl: '20px',
    $2xl: '34px',
    $3xl: '30px',
    $4xl: '36px',
    $5xl: '48px',
    $6xl: '64px',
  },
  lineHeights: {
    $xs: '19.5px',
    $sm: '22.75px',
    $base: '26px',
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
    $xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
    $sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    $base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
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
    p: () => (value: keyof Theme['space'] | (string & {})) => ({
      paddingTop: value,
      paddingBottom: value,
      paddingLeft: value,
      paddingRight: value,
    }),
    pt: () => (value: keyof Theme['space'] | (string & {})) => ({
      paddingTop: value,
    }),
    pr: () => (value: keyof Theme['space'] | (string & {})) => ({
      paddingRight: value,
    }),
    pb: () => (value: keyof Theme['space'] | (string & {})) => ({
      paddingBottom: value,
    }),
    pl: () => (value: keyof Theme['space'] | (string & {})) => ({
      paddingLeft: value,
    }),
    px: () => (value: keyof Theme['space'] | (string & {})) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: () => (value: keyof Theme['space'] | (string & {})) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    m: () => (value: keyof Theme['space'] | (string & {})) => ({
      marginTop: value,
      marginBottom: value,
      marginLeft: value,
      marginRight: value,
    }),
    mt: () => (value: keyof Theme['space'] | (string & {})) => ({
      marginTop: value,
    }),
    mr: () => (value: keyof Theme['space'] | (string & {})) => ({
      marginRight: value,
    }),
    mb: () => (value: keyof Theme['space'] | (string & {})) => ({
      marginBottom: value,
    }),
    ml: () => (value: keyof Theme['space'] | (string & {})) => ({
      marginLeft: value,
    }),
    mx: () => (value: keyof Theme['space'] | (string & {})) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: () => (value: keyof Theme['space'] | (string & {})) => ({
      marginTop: value,
      marginBottom: value,
    }),

    bg: () => (value: keyof Theme['colors'] | (string & {})) => ({
      background: value,
    }),
    bc: () => (value: keyof Theme['colors'] | (string & {})) => ({
      backgroundColor: value,
    }),
    br: () => (value: keyof Theme['radii'] | (string & {})) => ({
      borderRadius: value,
    }),

    textSize: () => (value: keyof Theme['fontSizes']) => ({
      fontSize: value,
      lineHeight: theme.lineHeights[value],
    }),

    size: () => (value: keyof Theme['sizes'] | (string & {})) => ({
      width: value,
      height: value,
    }),

    shadow: () => (value: keyof Theme['shadows'] | (string & {})) => ({
      boxShadow: value,
    }),

    $outline: () => (value: string) => ({
      ':not(:disabled)': {
        'position': 'relative',
        'outline': 'none',

        '::before': {
          content: `''`,
          display: 'block',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
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
  },
});

css.global({
  'body': { margin: '0' },
  '*': {
    boxSizing: 'border-box',
  },
});

export type Scale = 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | 'none';
export type Size = keyof typeof scales;
