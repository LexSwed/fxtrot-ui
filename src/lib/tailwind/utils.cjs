/**
 * @type {import('../theme-provider/types').toToken}
 */
function toToken(themeConfig, name) {
  return `--fx-${themeConfig}-${name.split('.').join('\\.')}`;
}

/** @type {import('../theme-provider/types').createTailwindColorVariables} */
function createTailwindColorVariables(colors) {
  const colorEntries = Object.keys(colors).map((token) => {
    return [token, `hsl(var(${toToken('colors', token)}-hsl)  / <alpha-value>)`];
  });

  return Object.fromEntries(colorEntries);
}

/** @type {import('../theme-provider/types').createTailwindFontVariables} */
function createFontSizeVariables(fontSizes) {
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

/** @type {import('../theme-provider/types').createTailwindVariables} */
function createTailwindVariables(theme) {
  /** @type {import('tailwindcss').Config['theme']} */
  const tailwindTheme = {};

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
  // @ts-expect-error can't really type this in cjs
  return tailwindTheme;
}

module.exports = {
  createTailwindVariables,
  toToken,
};
