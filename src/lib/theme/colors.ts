import * as paletteColors from './palette';

const { gray, default: allColors, ...palette } = paletteColors;

export const swatches: Array<readonly [string, Swatch]> = Object.entries(palette)
  .map(([name, colors]): readonly [string, Swatch] => [
    name,
    {
      colors: {
        $text: gray['$gray900'],
        $textDisabled: gray['$gray500'],
        $textLight: gray['$gray600'],
        $accent: colors[`$${name}600` as keyof typeof colors],

        $primaryStill: colors[`$${name}500` as keyof typeof colors],
        $primaryHover: colors[`$${name}600` as keyof typeof colors],
        $primaryActive: colors[`$${name}700` as keyof typeof colors],
        $primaryLight: colors[`$${name}050` as keyof typeof colors],
        $primaryLightActive: colors[`$${name}100` as keyof typeof colors],

        $surfaceStill: '#fff',
        $surfaceHover: gray['$gray100'],
        $surfaceActive: gray['$gray200'],
        $surfaceDisabled: gray['$gray200'],

        $borderStill: gray['$gray400'],
        $borderHover: gray['$gray500'],
        $borderActive: gray['$gray600'],
      },
    },
  ])
  .concat([
    [
      'black',
      {
        colors: {
          $text: '#fff',
          $textDisabled: gray['$gray400'],
          $textLight: gray['$gray100'],
          $accent: '#fff',

          $primaryStill: gray['$gray600'],
          $primaryHover: gray['$gray500'],
          $primaryActive: '$gray400',
          $primaryLight: gray['$gray500'],
          $primaryLightActive: gray['$gray400'],

          $surfaceStill: gray['$gray800'],
          $surfaceHover: gray['$gray700'],
          $surfaceActive: gray['$gray600'],
          $surfaceDisabled: 'rgba(0,0,0,0.2)',

          $borderStill: gray['$gray200'],
          $borderHover: gray['$gray300'],
          $borderActive: gray['$gray100'],
        },
      },
    ],
  ]);

const mainColors = Object.fromEntries(swatches).blue.colors;

export default {
  ...allColors,
  ...mainColors,
};

export type Swatch = {
  colors: {
    $text: string;
    $textDisabled: string;
    $textLight: string;
    $accent: string;

    $primaryStill: string;
    $primaryHover: string;
    $primaryActive: string;
    $primaryLight: string;
    $primaryLightActive: string;

    $surfaceStill: string;
    $surfaceHover: string;
    $surfaceActive: string;
    $surfaceDisabled: string;

    $borderStill: string;
    $borderHover: string;
    $borderActive: string;
  };
};
