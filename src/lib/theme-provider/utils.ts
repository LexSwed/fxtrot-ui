import type { ThemeColor, Theme } from './types';
import defaultTheme from '../tailwind/default-theme.cjs';
import { toToken } from '../tailwind/utils.cjs';

/**
 * Transforms passed theme colors into CSS variables map that are consumed by the components.
 */
function createThemeColors(colors: NonNullable<Theme['colors']>) {
  const colorEntries = Object.entries(colors).flatMap(([name, color]) => {
    const hsl = extractChannel(color);
    if (hsl) {
      const token = toToken('colors', name);
      return [
        [token, color],
        [`${token}-hsl`, hsl],
      ];
    }
    return [];
  });

  return colorEntries as ThemeVariableEntry[];
}

const channelExtractRegex = /(?:hsl|rgb\()?([\d.]+[deg,\s]*[\d.]+[%,\s]*[\d.]+[%,\s]*)/;

function extractChannel(color: ThemeColor): string | null {
  const match = channelExtractRegex.exec(color);
  if (match) {
    return match[1];
  }
  return null;
}

function createThemeFontSizes(fontSize: NonNullable<Theme['fontSize']>) {
  return Object.entries(fontSize).flatMap(([token, [fontSize, lineHeight]]) => [
    [toToken('fontSize', token), fontSize],
    [toToken('lineHeight', token), lineHeight],
  ]);
}

export function createThemeVariables(theme: Theme): ThemeVariableEntry[] {
  const variablesEntries = Object.keys(theme).flatMap((configKey) => {
    switch (configKey) {
      case 'colors': {
        const config = theme[configKey];
        if (config) {
          return createThemeColors(config);
        }
        break;
      }
      case 'fontSize': {
        if (theme.fontSize) {
          return createThemeFontSizes(theme.fontSize);
        }
        break;
      }
      default: {
        const config = theme[configKey as keyof typeof theme];
        if (config) {
          return Object.entries(config).map(([token, value]) => [toToken(configKey, token), value]);
        }
        break;
      }
    }
    return [];
  });

  return variablesEntries as ThemeVariableEntry[];
}

type ThemeVariableEntry = [`--fxtrot-${string}-${string}`, string];

/**
 * Takes partial theme and merges it with the default one.
 */
export function mergeTheme(theme: Theme): DeepRequired<Theme> {
  const resultingTheme = { ...defaultTheme };
  Object.keys(theme).forEach((themeKey) => {
    const themeConfig = theme[themeKey as ThemeKey];
    if (!themeConfig) return;
    // @ts-expect-error 2022 can't type Object.keys properly in TypeScript :/
    resultingTheme[themeKey] = { ...defaultTheme[themeKey] };
    Object.keys(themeConfig).forEach((configKey) => {
      // @ts-expect-error
      resultingTheme[themeKey][configKey] = themeConfig[configKey];
    });
  });
  // @ts-expect-error defaultTheme has colors as strings and not HSL, as JSDoc doesn't support @satisfies yet
  return resultingTheme;
}

type ThemeKey = NonNullable<keyof Theme>;
type DeepRequired<T> = {
  [K in keyof T]: Required<DeepRequired<T[K]>>;
};
