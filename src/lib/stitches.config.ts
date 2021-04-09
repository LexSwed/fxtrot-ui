import { createCss } from '@stitches/react';

import { attribute } from './FocusRing/focus-visible';
import { scales } from './theme/scales';
import { shadows } from './theme/shadows';
import { allColors, themes } from './ThemeProvider/themes';

export const theme = {
  colors: {
    ...allColors,
    ...themes.blue.colors,
  },
  fonts: {
    default: '"Noto Sans", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, sans-serif',
    heading: '"Source Sans Pro", apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, sans-serif',
    mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
  },
  space: scales,
  sizes: { ...scales, base: '10' },
  fontSizes: {
    $xs: '0.75rem',
    $sm: '0.875rem',
    $md: '1rem',
    $lg: '1.125rem',
    $xl: '1.25rem',
    $2xl: '1.5rem',
    $3xl: '1.875rem',
    $4xl: '2.25rem',
    $5xl: '3rem',
    $6xl: '3.75rem',
    $7xl: '4.5rem',
    $8xl: '6rem',
    $9xl: '8rem',
    $base: '$md',
  },
  lineHeights: {
    $xs: '1rem',
    $sm: '1.25rem',
    $md: '1.5rem',
    $lg: '1.75rem',
    $xl: '1.75rem',
    $2xl: '2rem',
    $3xl: '2.25rem',
    $4xl: '2.5rem',
    $5xl: '1',
    $6xl: '1',
    $7xl: '1',
    $8xl: '1',
    $9xl: '1',
    $base: '$md',
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
  shadows,
} as const;

export type Theme = typeof theme;

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
      fontSize: theme.fontSizes[value],
      lineHeight: theme.lineHeights[value],
    }),

    size: (config) => (value: `$${keyof Theme['sizes']}` | (string & {})) => {
      return {
        width: value,
        height: value,
      };
    },

    $outline: (config) => (offset: number) => ({
      [`&:not(:disabled)[${attribute}]`]: {
        'outline': 'none',
        'position': 'relative',
        '$$offset': `${offset}px`,

        '&::before': {
          content: `''`,
          display: 'block',
          position: 'absolute',
          top: `calc(-1 * $$offset)`,
          right: `calc(-1 * $$offset)`,
          bottom: `calc(-1 * $$offset)`,
          left: `calc(-1 * $$offset)`,
          transitionProperty: 'box-shadow, border-color',
          transitionDuration: '0.2s',
          transitionTimingFunction: 'ease-in-out',
          pointerEvents: 'none',
          border: '1px solid transparent',
          br: 'inherit',
        },
      },
      '&:focus': {
        outline: 'none',
      },
      [`&:focus[${attribute}]:before`]: {
        borderColor: '$primaryActive',
        boxShadow: '0 0 0 2px $colors$focusRing',
      },
    }),
  },
});

export const { css, styled, keyframes } = stitchesConfig;
