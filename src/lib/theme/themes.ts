import { css } from '../stitches.config';

import { swatches, ColorName } from './colors';

export const themes = Object.fromEntries(swatches.map(([name, swatch]) => [name, css.theme(swatch)])) as Themes;

type Themes = { [Name in ColorName]: string };
