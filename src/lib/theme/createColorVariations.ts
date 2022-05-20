import type { ThemeColors, ThemeColor, HSLAThemeColor } from './default';

export type ExtendedTheme = ThemeColors & {
  surface1: HSLAThemeColor;
  surface2: HSLAThemeColor;
  surface3: HSLAThemeColor;
  surface4: HSLAThemeColor;
  surface5: HSLAThemeColor;
  surface6: HSLAThemeColor;
  surfacePrimary1: HSLAThemeColor;
  surfacePrimary2: HSLAThemeColor;
  surfacePrimary3: HSLAThemeColor;
  surfacePrimary4: HSLAThemeColor;
  surfacePrimary5: HSLAThemeColor;
  surfacePrimary6: HSLAThemeColor;
};

export const createColorVariations = (theme: ThemeColors): ExtendedTheme => {
  const { primary, inverseSurface } = theme;

  const primaryHsl = extractHsl(primary);
  const surfaceHsl = extractHsl(inverseSurface);

  return {
    ...theme,
    surface1: `hsla(${surfaceHsl} / 0.05)`,
    surface2: `hsla(${surfaceHsl} / 0.08)`,
    surface3: `hsla(${surfaceHsl} / 0.11)`,
    surface4: `hsla(${surfaceHsl} / 0.12)`,
    surface5: `hsla(${surfaceHsl} / 0.14)`,
    surface6: `hsla(${surfaceHsl} / 0.25)`,
    surfacePrimary1: `hsla(${primaryHsl} / 0.05)`,
    surfacePrimary2: `hsla(${primaryHsl} / 0.08)`,
    surfacePrimary3: `hsla(${primaryHsl} / 0.11)`,
    surfacePrimary4: `hsla(${primaryHsl} / 0.12)`,
    surfacePrimary5: `hsla(${primaryHsl} / 0.14)`,
    surfacePrimary6: `hsla(${primaryHsl} / 0.25)`,
  };
};

const hslExtractRegex = /hsla?\(([\d.]+ [\d.]+% [\d.]+%( \/? [\d.]+)?)\)/;
function extractHsl(color: ThemeColor): `${number} ${number}% ${number}%` {
  const match = hslExtractRegex.exec(color);
  return match ? (match[1] as `${number} ${number}% ${number}%`) : ('0 0% 0%' as `${number} ${number}% ${number}%`);
}
