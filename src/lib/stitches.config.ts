import { createStitches, PropertyValue, ScaleValue, CSS } from '@stitches/react';

import { scales } from './theme/scales';
import { lightColors } from './theme/default';
import { createColorVariations } from './theme/createColorVariations';

export const stitchesConfig = createStitches({
  theme: {
    colors: { ...createColorVariations(lightColors) },
    fonts: {
      default: '"Noto Sans Display", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, sans-serif',
      heading: '"Source Sans Pro", apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, sans-serif',
      mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
    },
    space: scales,
    sizes: scales,
    fontSizes: {
      'xs': '0.75rem',
      'sm': '0.875rem',
      'md': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem',
      'base': '$md',
    },
    lineHeights: {
      'xs': '1rem',
      'sm': '1.25em',
      'md': '1.5em',
      'lg': '1.75em',
      'xl': '1.75em',
      '2xl': '2em',
      '3xl': '2.25em',
      '4xl': '2.5em',
      '5xl': '1',
      '6xl': '1',
      '7xl': '1',
      '8xl': '1',
      '9xl': '1',
      'base': '$md',
    },
    radii: {
      '0': '0',
      'xs': '2px',
      'sm': '3px',
      'md': '5px',
      'lg': '12px',
      'xl': '16px',
      '2xl': '32px',
      '3xl': '64px',
      'round': '50%',
      'pill': '9999px',
      'base': '$md',
    },
    zIndices: {
      '1': '100',
      '2': '200',
      '3': '300',
      '4': '400',
      'max': '9999',
    },
    shadows: {
      'xs': '0 0 0 1px rgba(0, 0, 0, 0.05)',
      'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      'popper': `0 0 2px $colors$surface5, $shadows$xl`,
      'base': '$xs',
      'base--hover': '$sm, $sm',
      'none': 'none',
    },
  },
  media: {
    'mobile': `(max-width: 425px)`,
    'tablet': `(max-width: 768px)`,
    'untilDesktop': `(max-width: 1024px)`,
    'desktop': `(min-width: 1024px)`,
    'fullscreen': `(min-width: 1280px)`,
    'dark': '(prefers-color-scheme: dark)',
    'light': '(prefers-color-scheme: light)',
    'no-motion': '(prefers-reduced-motion: reduce)',
    'hover': '(any-hover: hover)',
  },
  /**
   * 1. colors layering: ...colors -> compose into one
   * 2. surface colors
   */
  utils: {
    p: (value: ScaleValue<'space'> | number | string) => ({
      padding: value,
    }),
    pt: (value: ScaleValue<'space'> | number | string) => ({
      paddingBlockStart: value,
    }),
    pr: (value: ScaleValue<'space'> | number | string) => ({
      paddingInlineEnd: value,
    }),
    pb: (value: ScaleValue<'space'> | number | string) => ({
      paddingBlockEnd: value,
    }),
    pl: (value: ScaleValue<'space'> | number | string) => ({
      paddingInlineStart: value,
    }),
    px: (value: ScaleValue<'space'> | number | string) => ({
      paddingInlineStart: value,
      paddingInlineEnd: value,
    }),
    py: (value: ScaleValue<'space'> | number | string) => ({
      paddingBlockStart: value,
      paddingBlockEnd: value,
    }),
    m: (value: ScaleValue<'space'> | number | string) => ({
      margin: value,
    }),
    mt: (value: ScaleValue<'space'> | number | string) => ({
      marginBlockStart: value,
    }),
    mr: (value: ScaleValue<'space'> | number | string) => ({
      marginInlineEnd: value,
    }),
    mb: (value: ScaleValue<'space'> | number | string) => ({
      marginBlockEnd: value,
    }),
    ml: (value: ScaleValue<'space'> | number | string) => ({
      marginInlineStart: value,
    }),
    mx: (value: ScaleValue<'space'> | number | string) => ({
      marginInlineStart: value,
      marginInlineEnd: value,
    }),
    my: (value: ScaleValue<'space'> | number | string) => ({
      marginBlockStart: value,
      marginBlockEnd: value,
    }),
    bc: (value: PropertyValue<'backgroundColor'>) => ({
      backgroundColor: value,
    }),
    br: (value: ScaleValue<'radii'>) => ({
      borderRadius: value,
    }),
    textSize: (value: ScaleValue<'fontSize'> | number | string) => ({
      fontSize: value,
      lineHeight: value,
    }),
    size: (value: ScaleValue<'space'> | number | string) => {
      return {
        blockSize: value,
        inlineSize: value,
      };
    },

    $outline: (offset: number = 0) => {
      return {
        'outline': '0px inset $colors$inverseSurface',
        'outlineOffset': offset,
        '&:focus-visible': {
          outlineWidth: '2px',
        },
      };
    },
    $focusRing: (color: PropertyValue<'backgroundColor'>) => {
      return {
        'outline': 'none',
        '&:focus-visible': {
          boxShadow: `0 0 0 4px $colors${color}`,
        },
      };
    },
    $focusRingInset: (color: PropertyValue<'backgroundColor'> | string = '$surface6') => ({
      'outline': 'none',
      '&:focus-visible': {
        boxShadow: `0 0 0 2px $colors${color} inset`,
      },
    }),
  },
  prefix: 'fxtrot',
});

export type CssStyles = CSS<typeof stitchesConfig['config']>;

export const { css, styled, keyframes, createTheme } = stitchesConfig;
