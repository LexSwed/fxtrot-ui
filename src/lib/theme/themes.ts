import * as palette from './palette';
import { css } from '../stitches.config';

import { swatches } from './colors';

export const themes = Object.fromEntries(swatches.map(([name, swatch]) => [name, css.theme(swatch)])) as Themes;

type Themes = { [Shade in keyof typeof palette]: string };
