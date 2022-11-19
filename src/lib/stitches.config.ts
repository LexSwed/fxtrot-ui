import { createStitches, PropertyValue, ScaleValue, CSS } from '@stitches/react';

import { colors, fonts, fontSizes, lineHeights, media, radii, scales, shadows, zIndices } from './theme';

export const stitchesConfig = createStitches({
  theme: {
    colors: { ...colors },
    fonts,
    space: scales,
    sizes: scales,
    fontSizes,
    lineHeights,
    radii,
    zIndices,
    shadows,
  },
  media,
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

/**
 * TODO:
 * - polymorphic package removal, replace with asChild
 * - theme -> sprinkles
 * - utils -> sprinkles
 */
