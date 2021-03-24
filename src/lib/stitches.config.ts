import { createCss } from '@stitches/react';

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
  shadows: { ...shadows, $popper: `0 0 1px $borderStill, $$shadows.xl`, $none: 'none' },
} as const;

type Theme = typeof theme;

export const stitchesConfig = createCss({
  theme,
  media: {
    mobile: `(max-width: 320px)`,
    tablet: `(max-width: 768px)`,
    desktop: `(max-width: 1024px)`,
    fullscreen: `(max-width: 1280px)`,
    dark: '(prefers-color-scheme: dark)',
    light: '(prefers-color-scheme: light)',
  },
  utils: {
    p: (config) => (value: keyof Theme['space'] | (number | (string & {}))) => ({
      paddingTop: value,
      paddingBottom: value,
      paddingLeft: value,
      paddingRight: value,
    }),
    pt: (config) => (value: keyof Theme['space'] | (number | (string & {}))) => ({
      paddingTop: value,
    }),
    pr: (config) => (value: keyof Theme['space'] | (number | (string & {}))) => ({
      paddingRight: value,
    }),
    pb: (config) => (value: keyof Theme['space'] | (number | (string & {}))) => ({
      paddingBottom: value,
    }),
    pl: (config) => (value: keyof Theme['space'] | (number | (string & {}))) => ({
      paddingLeft: value,
    }),
    px: (config) => (value: keyof Theme['space'] | (number | (string & {}))) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (config) => (value: keyof Theme['space'] | (number | (string & {}))) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    m: (config) => (value: keyof Theme['space'] | (number | (string & {}))) => ({
      marginTop: value,
      marginBottom: value,
      marginLeft: value,
      marginRight: value,
    }),
    mt: (config) => (value: keyof Theme['space'] | (number | (string & {}))) => ({
      marginTop: value,
    }),
    mr: (config) => (value: keyof Theme['space'] | (number | (string & {}))) => ({
      marginRight: value,
    }),
    mb: (config) => (value: keyof Theme['space'] | (number | (string & {}))) => ({
      marginBottom: value,
    }),
    ml: (config) => (value: keyof Theme['space'] | (number | (string & {}))) => ({
      marginLeft: value,
    }),
    mx: (config) => (value: keyof Theme['space'] | (number | (string & {}))) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (config) => (value: keyof Theme['space'] | (number | (string & {}))) => ({
      marginTop: value,
      marginBottom: value,
    }),

    bg: (config) => (value: keyof Theme['colors'] | (string & {})) => ({
      background: value,
    }),
    bc: (config) => (value: keyof Theme['colors'] | (string & {})) => ({
      backgroundColor: value,
    }),

    br: (config) => (value: keyof Theme['radii'] | (string & {})) => ({
      borderRadius: value,
    }),

    textSize: (config) => (value: keyof Theme['fontSizes']) => ({
      fontSize: value,
      lineHeight: theme.lineHeights[value],
    }),

    size: (config) => (value: keyof Theme['sizes'] | (string & {})) => ({
      width: value,
      height: value,
    }),

    shadow: (config) => (value: keyof Theme['shadows'] | (string & {})) => ({
      boxShadow: value,
    }),

    $outline: (config) => (offset: number) => ({
      [`:not(:disabled)[${attribute}]`]: {
        'outline': 'none',
        'position': 'relative',

        '&::before': {
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
      '&:focus': {
        outline: 'none',
      },
      [`:focus[${attribute}]:before`]: {
        boxShadow: '0 0 0 2px $text',
      },
    }),
  },
});

export const { css, styled, global, keyframes } = stitchesConfig;

global({
  'body': { margin: '0' },
  '*': {
    'boxSizing': 'border-box',
    'fontFamily': '$default',
    '&::before,::after': {
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
