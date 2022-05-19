import type { ThemeColors, ThemeColor, HSLAThemeColor } from './default';

export type ExtendedTheme = ThemeColors & {
  surface1: HSLAThemeColor;
  surface2: HSLAThemeColor;
  surface3: HSLAThemeColor;
  primary1: HSLAThemeColor;
  primary2: HSLAThemeColor;
  primary3: HSLAThemeColor;
  primary4: HSLAThemeColor;
  primary5: HSLAThemeColor;
  primary6: HSLAThemeColor;
};

export const createColorVariations = (theme: ThemeColors): ExtendedTheme => {
  const { primary, onSurface } = theme;

  const primaryHsl = extractHsl(primary);
  const onSurfaceHsl = extractHsl(onSurface);

  return {
    ...theme,
    surface1: `hsla(${onSurfaceHsl} / 0.03)`,
    surface2: `hsla(${onSurfaceHsl} / 0.05)`,
    surface3: `hsla(${onSurfaceHsl} / 0.08)`,
    primary1: `hsla(${primaryHsl} / 0.05)`,
    primary2: `hsla(${primaryHsl} / 0.08)`,
    primary3: `hsla(${primaryHsl} / 0.11)`,
    primary4: `hsla(${primaryHsl} / 0.12)`,
    primary5: `hsla(${primaryHsl} / 0.14)`,
    primary6: `hsla(${primaryHsl} / 0.2)`,
  };
};

const hslExtractRegex = /hsla?\(([\d.]+ [\d.]+% [\d.]+%( \/? [\d.]+)?)\)/;
function extractHsl(color: ThemeColor): `${number} ${number}% ${number}%` {
  const match = hslExtractRegex.exec(color);
  return match ? (match[1] as `${number} ${number}% ${number}%`) : ('0 0% 0%' as `${number} ${number}% ${number}%`);
}
