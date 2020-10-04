import type { TCssWithBreakpoints } from '@stitches/react';
import { css, styled } from '../stitches.config';

type CssType = typeof css;
export type CssWithBreakpoints = TCssWithBreakpoints<CssType>;
export type StylesObject = Parameters<CssType>[0];
export type StylesWithVariants = Parameters<typeof styled>[1]['variants'];
