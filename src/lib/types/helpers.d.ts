import { TCssWithBreakpoints } from '@stitches/react';
import { css } from '../stitches.config';

type CssType = typeof css;
export type CssWithBreakpoints = TCssWithBreakpoints<CssType>;
