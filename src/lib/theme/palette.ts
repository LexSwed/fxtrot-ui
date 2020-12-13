import * as paletteColors from './colors';

export const { default: allColors, ...palette } = paletteColors;

export type ColorName = keyof typeof palette | 'black';

export const swatches: Array<readonly [ColorName, Swatch]> = Object.entries(palette)
  .map(([name, colors]): readonly [ColorName, Swatch] => [
    name as ColorName,
    {
      colors: {
        $text: allColors['$gray900'],
        $textDisabled: allColors['$gray500'],
        $textLight: allColors['$gray600'],
        $accent: colors[`$${name}600` as keyof typeof colors],
        $success: allColors['$green600'],
        $danger: allColors['$red600'],

        $primaryStill: colors[`$${name}500` as keyof typeof colors],
        $primaryHover: colors[`$${name}600` as keyof typeof colors],
        $primaryActive: colors[`$${name}700` as keyof typeof colors],
        $primaryLight: colors[`$${name}050` as keyof typeof colors],
        $primaryLightActive: colors[`$${name}100` as keyof typeof colors],

        $flatStill: 'transparent',
        $flatHover: 'rgba(17, 24, 39, 0.08)',
        $flatActive: 'rgba(17, 24, 39, 0.05)',
        $flatDisabled: allColors['$gray200'],

        $surfaceStill: '#fff',
        $surfaceHover: allColors['$gray100'],
        $surfaceActive: allColors['$gray50'],
        $surfaceDisabled: allColors['$gray200'],

        $borderLight: allColors['$gray200'],
        $borderStill: allColors['$gray400'],
        $borderHover: allColors['$gray500'],
        $borderActive: allColors['$gray600'],
      },
    },
  ])
  .concat([
    [
      'black',
      {
        colors: {
          $text: '#fff',
          $textDisabled: allColors['$coolGray400'],
          $textLight: allColors['$coolGray100'],
          $accent: '#fff',
          $success: allColors['$green600'],
          $danger: allColors['$red600'],

          $primaryStill: allColors['$coolGray600'],
          $primaryHover: allColors['$coolGray700'],
          $primaryActive: allColors['$coolGray800'],
          $primaryLight: allColors['$coolGray600'],
          $primaryLightActive: allColors['$coolGray500'],

          $flatStill: 'transparent',
          $flatHover: 'rgba(255,255,255,0.1)',
          $flatActive: 'rgba(255,255,255,0.12)',
          $flatDisabled: allColors['$gray200'],

          $surfaceStill: allColors['$coolGray800'],
          $surfaceHover: allColors['$coolGray700'],
          $surfaceActive: allColors['$coolGray600'],
          $surfaceDisabled: 'rgba(0,0,0,0.2)',

          $borderLight: allColors['$coolGray400'],
          $borderStill: allColors['$coolGray200'],
          $borderHover: allColors['$coolGray300'],
          $borderActive: allColors['$coolGray100'],
        },
      },
    ],
  ]);

const mainColors = Object.fromEntries(swatches).blue.colors;

const colors = {
  ...allColors,
  ...mainColors,
};

export default colors;

export interface Swatch {
  colors: {
    $text: string;
    $textDisabled: string;
    $textLight: string;
    $accent: string;
    $success: string;
    $danger: string;

    $primaryStill: string;
    $primaryHover: string;
    $primaryActive: string;
    $primaryLight: string;
    $primaryLightActive: string;

    $flatStill: string;
    $flatHover: string;
    $flatActive: string;
    $flatDisabled: string;

    $surfaceStill: string;
    $surfaceHover: string;
    $surfaceActive: string;
    $surfaceDisabled: string;

    $borderLight: string;
    $borderStill: string;
    $borderHover: string;
    $borderActive: string;
  };
}