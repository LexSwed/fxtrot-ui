import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';
import { colors, fonts, fontSizes, lineHeights, radii, scales, shadows, zIndices } from './theme';
import type { ExtendedTheme } from './theme/createColorVariations';

import { createGlobalTheme } from '@vanilla-extract/css';

export const media = {
  'mobile': `(max-width: 425px)`,
  'tablet': `(max-width: 768px)`,
  'untilDesktop': `(max-width: 1024px)`,
  'desktop': `(min-width: 1024px)`,
  'fullscreen': `(min-width: 1280px)`,
  'dark': '(prefers-color-scheme: dark)',
  'light': '(prefers-color-scheme: light)',
  'no-motion': '(prefers-reduced-motion: reduce)',
  'hover': '(any-hover: hover)',
} as const;

export const vars = createGlobalTheme(':root', {
  color: colors as Record<keyof ExtendedTheme, string>,
  font: fonts,
  fonts,
  fontSizes,
  lineHeights,
  radii,
  scales,
  shadows,
  zIndices,
});

const config = defineProperties({
  properties: {
    color: vars.color,
    background: vars.color,
    gap: vars.scales,
    rowGap: vars.scales,
    columnGap: vars.scales,
    padding: vars.scales,
    paddingInline: vars.scales,
    paddingInlineStart: vars.scales,
    paddingInlineEnd: vars.scales,
    paddingBlock: vars.scales,
    paddingBlockStart: vars.scales,
    paddingBlockEnd: vars.scales,
    margin: vars.scales,
    marginInline: vars.scales,
    marginInlineStart: vars.scales,
    marginInlineEnd: vars.scales,
    marginBlock: vars.scales,
    marginBlockStart: vars.scales,
    marginBlockEnd: vars.scales,
    borderRadius: vars.radii,
    fontFamily: vars.fonts,
    fontSize: vars.fontSizes,
    lineHeight: vars.lineHeights,
    boxShadow: vars.shadows,
    zIndex: vars.zIndices,
  },
  shorthands: {
    p: ['paddingInlineStart', 'paddingInlineEnd', 'paddingBlockStart', 'paddingBlockEnd'],
    px: ['paddingInlineStart', 'paddingInlineEnd'],
    py: ['paddingBlockStart', 'paddingBlockEnd'],
    m: ['marginInlineStart', 'marginInlineEnd', 'marginBlockStart', 'marginBlockEnd'],
    mx: ['marginInlineStart', 'marginInlineEnd'],
    my: ['marginBlockStart', 'marginBlockEnd'],
    br: ['borderRadius'],
  },
});

export const sprinkles = createSprinkles(config);

export type Sprinkles = Parameters<typeof sprinkles>[0];
