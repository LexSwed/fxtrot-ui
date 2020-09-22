import * as palette from './palette';
import { css } from '../stitches.config';
import colors from './colors';

const filtered = ['grey'];

export const themes = Object.fromEntries(
  Object.entries(palette)
    .filter(([name]) => !filtered.includes(name))
    .map(([name, colors]) => [
      name,
      css.theme({
        colors: {
          $primary: colors[`$${name}500` as keyof typeof colors],
          $hover: colors[`$${name}600` as keyof typeof colors],
          $active: colors[`$${name}700` as keyof typeof colors],
        },
      }),
    ])
    .concat([
      [
        'black',
        css.theme({
          colors: {
            $primary: colors['$gray800'],
            $hover: colors['$gray900'],
            $active: 'black',
          },
        }),
      ],
    ])
) as Themes;

type Themes = { [Shade in keyof typeof palette]: string };
