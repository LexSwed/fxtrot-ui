import type { TCssWithBreakpoints, TCssProp, BreakPointsKeys } from '@stitches/react';
import type { TCssProperties, TCss } from '@stitches/core';
import { css } from '../stitches.config';

type Config = GetConfig<typeof css>;
export type CssWithBreakpoints = TCssWithBreakpoints<Config>;
export type StylesObject = TCssProperties<Config>;
export type StylesWithVariants = TCssProperties<Config>;
export type CssProperties = TCssProperties<Config> &
  {
    [key in BreakPointsKeys<Config>]?: TCssProp<Config>;
  };

type GetConfig<S> = S extends TCss<infer T> ? T : never;
