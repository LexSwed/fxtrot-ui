import * as palette from './palette';
import { css } from '../stitches.config';

export const themes = Object.fromEntries(
  Object.entries(palette).map(([name, colors]) => [
    name,
    css.theme({
      colors: {
        $primary: colors[`$${name}500` as keyof typeof colors],
        $hover: colors[`$${name}600` as keyof typeof colors],
        $active: colors[`$${name}700` as keyof typeof colors],
      } as any,
    }),
  ])
) as Themes;

type Themes = { [Shade in keyof typeof palette]: string };
