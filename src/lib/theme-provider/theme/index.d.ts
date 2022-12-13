import { ThemeColors } from './colors';

export type Theme = {
  colors?: ThemeColors;
};

export const defaultTheme: Theme;

export { createThemeColors } from './colors';
