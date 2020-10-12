import type { TCssWithBreakpoints } from '@stitches/react';
import type { TCssProperties, TCss } from '@stitches/core';
import { css, styled } from '../stitches.config';

type Config = GetConfig<typeof css>;
export type CssWithBreakpoints = TCssWithBreakpoints<Config>;
export type StylesObject = TCssProperties<Config>;
export type StylesWithVariants = Parameters<typeof styled>[1]['variants'];

type GetConfig<S> = S extends TCss<infer T> ? T : never;
