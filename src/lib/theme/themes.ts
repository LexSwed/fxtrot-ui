import * as palette from './palette';
import { css } from '../stitches.config';
import colors from './colors';

const filtered = ['grey'];

const swatches: Array<readonly [string, Swatch]> = Object.entries(palette)
  .filter(([name]) => !filtered.includes(name))
  .map(([name, colors]): readonly [string, Swatch] => [
    name,
    {
      colors: {
        $primaryStill: colors[`$${name}500` as keyof typeof colors],
        $primaryHover: colors[`$${name}600` as keyof typeof colors],
        $primaryActive: colors[`$${name}700` as keyof typeof colors],
        $primaryLight: colors[`$${name}050` as keyof typeof colors],
        $primaryLightActive: colors[`$${name}100` as keyof typeof colors],
      },
    },
  ])
  .concat([
    [
      'black',
      {
        colors: {
          $primaryStill: colors['$gray800'],
          $primaryHover: colors['$gray900'],
          $primaryActive: 'black',
          $primaryLight: colors['$gray100'],
          $primaryLightActive: colors['$gray200'],
        },
      },
    ],
  ]);

export const themesColors = Object.fromEntries(swatches);

export const themes = Object.fromEntries(swatches.map(([name, swatch]) => [name, css.theme(swatch)])) as Themes;

type Themes = { [Shade in keyof typeof palette]: string };

type Swatch = {
  colors: {
    $primaryStill: string;
    $primaryHover: string;
    $primaryActive: string;
    $primaryLight: string;
    $primaryLightActive: string;
  };
};
