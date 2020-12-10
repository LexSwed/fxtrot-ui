import type { TCss, TCssProperties } from '@stitches/core';
import type { BreakPointsKeys, TCssProp, TCssWithBreakpoints } from '@stitches/react';

import { css } from '../stitches.config';

export interface Config extends GetConfig<typeof css> {}
export type CssWithBreakpoints = TCssWithBreakpoints<Config>;
export type StylesObject = TCssProperties<Config>;
export type StylesWithVariants = TCssProperties<Config>;
export type CssProperties = TCssProperties<Config> &
  {
    [key in BreakPointsKeys<Config>]?: TCssProp<Config>;
  };

type GetConfig<S> = S extends TCss<infer T> ? T : never;
