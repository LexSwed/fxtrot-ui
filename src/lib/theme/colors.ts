import palette from './palette';

export const border = {
  $default: palette['$gray400'],
  $hover: palette['$gray500'],
  $active: palette['$gray600'],
};

export const primary = {
  $default: '$primaryStill',
  $hover: '$primaryHover',
  $active: '$primaryActive',
  $light: '$primaryLight',
};

export const mainColors = {
  $text: palette['$gray900'],
  $textDisabled: palette['$gray600'],

  $surfaceStill: '#fff',
  $surfaceHover: palette['$gray100'],
  $surfaceActive: palette['$gray200'],

  $primaryStill: palette['$blue500'],
  $primaryHover: palette['$blue600'],
  $primaryActive: palette['$blue700'],
  $primaryLight: palette['$blue050'],
  $primaryLightActive: palette['$blue100'],
};

export default {
  ...palette,
  ...mainColors,
};
