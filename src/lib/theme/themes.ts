import * as palette from './palette';
import { css } from '../stitches.config';
import colors from './colors';

const filtered = ['grey', 'default'];

const swatches: Array<readonly [string, Swatch]> = Object.entries(palette)
  .filter(([name]) => !filtered.includes(name))
  .map(([name, colors]): readonly [string, Swatch] => [
    name,
    {
      colors: {
        $text: palette.gray['$gray900'],
        $primaryStill: colors[`$${name}500` as keyof typeof colors],
        $primaryHover: colors[`$${name}600` as keyof typeof colors],
        $primaryActive: colors[`$${name}700` as keyof typeof colors],
        $primaryLight: colors[`$${name}050` as keyof typeof colors],
        $primaryLightActive: colors[`$${name}100` as keyof typeof colors],

        $surfaceStill: '#fff',
        $surfaceHover: palette.gray['$gray100'],
        $surfaceActive: palette.gray['$gray200'],
      },
    },
  ])
  .concat([
    [
      'black',
      {
        colors: {
          $text: '#fff',
          $primaryStill: colors['$gray800'],
          $primaryHover: colors['$gray900'],
          $primaryActive: 'black',
          $primaryLight: colors['$gray100'],
          $primaryLightActive: colors['$gray200'],

          $surfaceStill: colors['$gray900'],
          $surfaceHover: colors['$gray700'],
          $surfaceActive: colors['$gray600'],
        },
      },
    ],
  ]);

export const themesColors = Object.fromEntries(swatches);

export const themes = Object.fromEntries(swatches.map(([name, swatch]) => [name, css.theme(swatch)])) as Themes;

type Themes = { [Shade in keyof typeof palette]: string };

export type Swatch = {
  colors: {
    $text: string;
    $primaryStill: string;
    $primaryHover: string;
    $primaryActive: string;
    $primaryLight: string;
    $primaryLightActive: string;

    $surfaceStill: string;
    $surfaceHover: string;
    $surfaceActive: string;
  };
};
