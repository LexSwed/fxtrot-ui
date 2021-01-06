import { createStyled } from '@stitches/react';

import { attribute } from './FocusRing/focus-visible';
import { scales } from './theme/scales';
import { shadows } from './theme/shadows';
import { allColors, themes } from './ThemeProvider/themes';
import { isServer } from './utils';

const defaultPalette = {
  ...allColors,
  ...themes.blue.colors,
};

export const theme = {
  colors: defaultPalette,
  fonts: {
    $default: '"Noto Sans", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, sans-serif',
    $heading: '"Source Sans Pro", apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, sans-serif',
    $mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
  },
  space: scales,
  sizes: { ...scales, $base: scales['$10'] },
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
  shadows: { ...shadows, $popper: `0 0 1px ${defaultPalette.$borderLight}, ${shadows.$xl}`, $none: 'none' },
} as const;

type Theme = typeof theme;

export const { styled, css } = createStyled({
  tokens: theme,
  breakpoints: {
    mobile: (rule) => `@media (max-width: 320px) { ${rule} }`,
    tablet: (rule) => `@media (max-width: 768px) { ${rule} }`,
    desktop: (rule) => `@media (max-width: 1024px) { ${rule} }`,
    fullscreen: (rule) => `@media (max-width: 1280px) { ${rule} }`,
  },
  utils: {
    p: (value: keyof Theme['space'] | (number | (string & {}))) => ({
      paddingTop: value,
      paddingBottom: value,
      paddingLeft: value,
      paddingRight: value,
    }),
    pt: (value: keyof Theme['space'] | (number | (string & {}))) => ({
      paddingTop: value,
    }),
    pr: (value: keyof Theme['space'] | (number | (string & {}))) => ({
      paddingRight: value,
    }),
    pb: (value: keyof Theme['space'] | (number | (string & {}))) => ({
      paddingBottom: value,
    }),
    pl: (value: keyof Theme['space'] | (number | (string & {}))) => ({
      paddingLeft: value,
    }),
    px: (value: keyof Theme['space'] | (number | (string & {}))) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: keyof Theme['space'] | (number | (string & {}))) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    m: (value: keyof Theme['space'] | (number | (string & {}))) => ({
      marginTop: value,
      marginBottom: value,
      marginLeft: value,
      marginRight: value,
    }),
    mt: (value: keyof Theme['space'] | (number | (string & {}))) => ({
      marginTop: value,
    }),
    mr: (value: keyof Theme['space'] | (number | (string & {}))) => ({
      marginRight: value,
    }),
    mb: (value: keyof Theme['space'] | (number | (string & {}))) => ({
      marginBottom: value,
    }),
    ml: (value: keyof Theme['space'] | (number | (string & {}))) => ({
      marginLeft: value,
    }),
    mx: (value: keyof Theme['space'] | (number | (string & {}))) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: keyof Theme['space'] | (number | (string & {}))) => ({
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
      [`:not(:disabled)[${attribute}]`]: {
        'outline': 'none',
        'position': 'relative',

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
          willChange: 'box-shadow',
        },
      },
      ':focus': {
        outline: 'none',
      },
      [`:focus[${attribute}]:before`]: {
        boxShadow: '0 0 0 2px $text',
      },
    }),
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
})();

(function addFont() {
  if (isServer) {
    return;
  }
  const link = document.createElement('link');

  link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap';
  link.rel = 'stylesheet';

  document.head.appendChild(link);
})();
