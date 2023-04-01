import type { Config } from 'tailwindcss';
import type { ThemeColors, TailwindColorVariables, Theme } from '../theme-provider/types';

export function toToken(themeConfig: string, name: string) {
  return `--fx-${themeConfig}-${name.split('.').join('\\.')}`;
}

function createTailwindColorVariables(colors: ThemeColors): TailwindColorVariables {
  const colorEntries = Object.keys(colors).map((token) => {
    return [token, `hsl(var(${toToken('colors', token)}-hsl)  / <alpha-value>)`];
  });

  return Object.fromEntries(colorEntries);
}

function createFontSizeVariables(fontSizes: NonNullable<Theme['fontSize']>): {
  fontSize: Record<keyof Theme['fontSize'], string>;
  lineHeight: Record<keyof Theme['fontSize'], string>;
} {
  return Object.entries(fontSizes).reduce(
    (res, [token]) => {
      // @ts-expect-error
      res.fontSize[token] = `var(${toToken('fontSize', token)})`;
      // @ts-expect-error
      res.lineHeight[token] = `var(${toToken('lineHeight', token)})`;
      return res;
    },
    {
      fontSize: {},
      lineHeight: {},
    }
  );
}

export function createTailwindVariables(theme: Theme) {
  const tailwindTheme: Config['theme'] = {};

  Object.keys(theme).forEach((configKey) => {
    switch (configKey) {
      case 'colors': {
        if (theme.colors) {
          // @ts-expect-error
          tailwindTheme.colors = createTailwindColorVariables(theme.colors);
        }
        break;
      }
      case 'fontSize': {
        if (theme.fontSize) {
          const { fontSize, lineHeight } = createFontSizeVariables(theme.fontSize);
          tailwindTheme.fontSize = fontSize;
          tailwindTheme.lineHeight = lineHeight;
        }
        break;
      }
      default: {
        // @ts-expect-error
        const variables = Object.keys(theme[configKey]).map((token) => [token, `var(${toToken(configKey, token)})`]);
        tailwindTheme[configKey] = Object.fromEntries(variables);
      }
    }
  });

  return tailwindTheme;
}
