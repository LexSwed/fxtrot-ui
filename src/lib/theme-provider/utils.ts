import type { ThemeColor, Theme } from './types';
import { toToken } from '../utils.cjs';

/**
 * Transforms passed theme colors into CSS variables map that are consumed by the components.
 */
export function createThemeColors(colors: NonNullable<Theme['colors']>) {
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
        }
        break;
      }
      default: {
        const config = theme[configKey as keyof typeof theme];
        if (config) {
          const entries = Object.entries(config).map(([token, value]) => [toToken(configKey, token), value]);
          return entries;
        }
        break;
      }
    }
    return [];
  });
  return variablesEntries as ThemeVariableEntry[];
}

type ThemeVariableEntry = [`--fxtrot-${string}-${string}`, string];
