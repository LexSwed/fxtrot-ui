import { createStitches, PropertyValue, ScaleValue, CSS } from '@stitches/react';

import { attribute } from './utils/focus-visible';
import { scales } from './theme/scales';
import { defaultColors } from './theme/default';

export const stitchesConfig = createStitches({
  theme: {
    colors: { ...defaultColors },
    fonts: {
      default: '"Noto Sans", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, sans-serif',
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
      'sm': '4px',
      'md': '6px',
      'lg': '12px',
      'xl': '16px',
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
      'popper': `0 0 1px $colors$border, $shadows$lg`,
      'base': '$xs',
      'base--hover': '$sm, $sm',
      'none': 'none',
    },
  },
  media: {
    mobile: `(max-width: 320px)`,
    tablet: `(max-width: 768px)`,
    desktop: `(min-width: 1024px)`,
    fullscreen: `(min-width: 1280px)`,
    dark: '(prefers-color-scheme: dark)',
    light: '(prefers-color-scheme: light)',
  },
  utils: {
    p: (value: ScaleValue<'space'> | number | string) => ({
      paddingTop: value,
      paddingRight: value,
      paddingBottom: value,
      paddingLeft: value,
    }),
    pt: (value: ScaleValue<'space'> | number | string) => ({
      paddingTop: value,
    }),
    pr: (value: ScaleValue<'space'> | number | string) => ({
      paddingRight: value,
    }),
    pb: (value: ScaleValue<'space'> | number | string) => ({
      paddingBottom: value,
    }),
    pl: (value: ScaleValue<'space'> | number | string) => ({
      paddingLeft: value,
    }),
    px: (value: ScaleValue<'space'> | number | string) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: ScaleValue<'space'> | number | string) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    m: (value: ScaleValue<'space'> | number | string) => ({
      margin: value,
    }),
    mt: (value: ScaleValue<'space'> | number | string) => ({
      marginTop: value,
    }),
    mr: (value: ScaleValue<'space'> | number | string) => ({
      marginRight: value,
    }),
    mb: (value: ScaleValue<'space'> | number | string) => ({
      marginBottom: value,
    }),
    ml: (value: ScaleValue<'space'> | number | string) => ({
      marginLeft: value,
    }),
    mx: (value: ScaleValue<'space'> | number | string) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: ScaleValue<'space'> | number | string) => ({
      marginTop: value,
      marginBottom: value,
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
        width: value,
        height: value,
      };
    },
    textStyle: (
      value: 'body1' | 'body2' | 'subtitle1' | 'subtitle2' | 'label' | 'hint' | 'overline' | 'caption' | 'mono'
    ) => {
      switch (value) {
        case 'body1':
          return {
            fontFamily: '$default',
            textSize: '$base',
          };
        case 'body2':
          return {
            fontFamily: '$default',
            textSize: '$sm',
          };
        case 'subtitle1':
          return {
            fontFamily: '$heading',
            textSize: '$lg',
          };
        case 'subtitle2':
          return {
            fontFamily: '$heading',
            textSize: '$md',
            fontWeight: 500,
          };
        case 'overline':
          return {
            fontFamily: '$default',
            textSize: '$xs',
            textTransform: 'uppercase',
          };
        case 'label':
          return {
            fontFamily: '$default',
            textSize: '$sm',
            fontWeight: 500,
          };
        case 'hint':
          return {
            fontFamily: '$default',
            textSize: '$xs',
          };
        case 'caption':
          return {
            fontFamily: '$default',
            textSize: '$sm',
          };
        case 'mono':
          return {
            fontFamily: '$mono',
            textSize: '$sm',
            fontWeight: 300,
          };
      }
    },

    focusRing: (color: PropertyValue<'backgroundColor'> | string = '$focusRing') => ({
      // [`&:not(:disabled)[${attribute}]`]: {
      // [`&:not(:disabled)]`]: {
      //   'outline': 'none',
      //   'position': 'relative',
      //   '$$offset': `${offset}px`,

      //   '&::before': {
      //     content: `''`,
      //     display: 'block',
      //     position: 'absolute',
      //     top: `calc(-1 * $$offset)`,
      //     right: `calc(-1 * $$offset)`,
      //     bottom: `calc(-1 * $$offset)`,
      //     left: `calc(-1 * $$offset)`,
      //     transitionProperty: 'box-shadow, border-color',
      //     transitionDuration: '0.2s',
      //     transitionTimingFunction: 'ease-in-out',
      //     pointerEvents: 'none',
      //     border: '1px solid transparent',
      //     br: 'inherit',
      //   },
      // },
      '$$focusRingColor': `$colors${color}`,
      '&:focus': {
        outline: 'none',
      },
      [`&:focus[${attribute}]`]: {
        boxShadow: `0 0 0 2px $$focusRingColor`,
      },
    }),
  },
  prefix: 'fxtrot',
});

export type Theme = typeof stitchesConfig['theme'];
export type CssStyles = CSS<typeof stitchesConfig['config']>;
export type StyleSheet = Record<string, CssStyles>;

export const { css, styled, keyframes } = stitchesConfig;
