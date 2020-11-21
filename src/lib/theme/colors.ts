import * as paletteColors from './palette';

export const { default: allColors, ...palette } = paletteColors;

export type ColorName = keyof typeof palette | 'black';

export const swatches: Array<readonly [ColorName, Swatch]> = Object.entries(palette)
  .map(([name, colors]): readonly [ColorName, Swatch] => [
    name as ColorName,
    {
      colors: {
        $text: allColors['$coolGray900'],
        $textDisabled: allColors['$coolGray500'],
        $textLight: allColors['$coolGray600'],
        $accent: colors[`$${name}600` as keyof typeof colors],

        $primaryStill: colors[`$${name}500` as keyof typeof colors],
        $primaryHover: colors[`$${name}600` as keyof typeof colors],
        $primaryActive: colors[`$${name}700` as keyof typeof colors],
        $primaryLight: colors[`$${name}050` as keyof typeof colors],
        $primaryLightActive: colors[`$${name}100` as keyof typeof colors],

        $surfaceStill: '#fff',
        $surfaceHover: allColors['$coolGray100'],
        $surfaceActive: allColors['$coolGray50'],
        $surfaceDisabled: allColors['$coolGray200'],

        $borderLight: allColors['$coolGray200'],
        $borderStill: allColors['$coolGray400'],
        $borderHover: allColors['$coolGray500'],
        $borderActive: allColors['$coolGray600'],
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

          $primaryStill: allColors['$coolGray500'],
          $primaryHover: allColors['$coolGray600'],
          $primaryActive: allColors['$coolGray700'],
          $primaryLight: allColors['$coolGray500'],
          $primaryLightActive: allColors['$coolGray400'],

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

    $borderLight: string;
    $borderStill: string;
    $borderHover: string;
    $borderActive: string;
  };
};
