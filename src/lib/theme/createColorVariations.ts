import type { ThemeColors, HSLThemeColor, HSLAThemeColor } from './default';
import Color from 'color';

export type ExtendedTheme = ThemeColors & {
  primarySurface: HSLThemeColor;
  primarySurface1: HSLThemeColor;
  primarySurface2: HSLThemeColor;
  surface1: HSLAThemeColor;
  surface2: HSLAThemeColor;
  surface3: HSLAThemeColor;
  surface4: HSLAThemeColor;
  surface5: HSLAThemeColor;
  surface6: HSLAThemeColor;
};

export const createColorVariations = (theme: ThemeColors): ExtendedTheme => {
  const { primary, surface } = theme;

  const colorPrimary = Color(primary);
  const colorSurface = Color(surface);

  return {
    ...theme,
    primarySurface: colorPrimary.mix(colorSurface, 0.05).hsl().string() as HSLThemeColor,
    primarySurface1: colorPrimary.mix(colorSurface, 0.08).hsl().string() as HSLThemeColor,
    primarySurface2: colorPrimary.mix(colorSurface, 0.14).hsl().string() as HSLThemeColor,
    surface1: colorPrimary.alpha(0.05).hsl().string() as HSLAThemeColor,
    surface2: colorPrimary.alpha(0.08).hsl().string() as HSLAThemeColor,
    surface3: colorPrimary.alpha(0.11).hsl().string() as HSLAThemeColor,
    surface4: colorPrimary.alpha(0.12).hsl().string() as HSLAThemeColor,
    surface5: colorPrimary.alpha(0.14).hsl().string() as HSLAThemeColor,
    surface6: colorPrimary.alpha(0.2).hsl().string() as HSLAThemeColor,
  };
};
