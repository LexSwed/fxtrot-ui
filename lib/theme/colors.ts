import palette from './palette';

export const mainColors = {
  $text: palette['$gray900'],
  $textDisabled: palette['$gray600'],
  $surface: '#fff',
  $borderDefault: palette['$gray400'],
  $borderHover: palette['$gray500'],
  $borderFocus: palette['$gray600'],

  $primary: palette['$blue500'],
  $hover: palette['$blue600'],
  $active: palette['$blue700'],
};

export default {
  ...palette,
  ...mainColors,
};
