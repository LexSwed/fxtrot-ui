import type { ThemeColors, HSLAThemeColor } from './default';
import Color from 'color';

export type ExtendedTheme = ThemeColors & {
  surface1: HSLAThemeColor;
  surface2: HSLAThemeColor;
  surface3: HSLAThemeColor;
  surface4: HSLAThemeColor;
  surface5: HSLAThemeColor;
  surface6: HSLAThemeColor;
};

export const createColorVariations = (theme: ThemeColors): ExtendedTheme => {
  const { primary, surface } = theme;

  const colorSurface = Color(primary);

  return {
    ...theme,
    surface1: colorSurface.alpha(0.05).hsl().string() as HSLAThemeColor,
    surface2: colorSurface.alpha(0.08).hsl().string() as HSLAThemeColor,
    surface3: colorSurface.alpha(0.11).hsl().string() as HSLAThemeColor,
    surface4: colorSurface.alpha(0.12).hsl().string() as HSLAThemeColor,
    surface5: colorSurface.alpha(0.14).hsl().string() as HSLAThemeColor,
    surface6: colorSurface.alpha(0.2).hsl().string() as HSLAThemeColor,
  };
};
