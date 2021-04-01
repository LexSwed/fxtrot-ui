import type { StitchesCss } from '@stitches/react';
import type { stitchesConfig } from '../stitches.config';

export type CssStyles = StitchesCss<typeof stitchesConfig>;
export type Config = typeof stitchesConfig['config'];
