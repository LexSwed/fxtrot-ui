import type { TCssWithBreakpoints } from '@stitches/react';
import type { TCssProperties, TCss } from '@stitches/core';
import { css } from '../stitches.config';

type Config = GetConfig<typeof css>;
export type CssWithBreakpoints = TCssWithBreakpoints<Config>;
export type StylesObject = TCssProperties<Config>;
export type StylesWithVariants = TCssProperties<Config>;

type GetConfig<S> = S extends TCss<infer T> ? T : never;
