/**
 * @param {string} themeConfig - Type of the token: color, scale, fontSize
 * @param {string} name - Name of the token
 * @return {string}
 */
function toToken(themeConfig, name) {
  return `--fx-${themeConfig}-${name.replaceAll('.', '\\.')}`;
}

/** @type {import('./theme-provider/types').createTailwindColorVariables} */
function createTailwindColorVariables(colors) {
  const colorEntries = Object.keys(colors).map((token) => {
    return [token, `hsl(var(${toToken('colors', token)}-hsl)  / <alpha-value>)`];
  });

  return Object.fromEntries(colorEntries);
}

/** @type {import('./theme-provider/types').createTailwindVariables} */
function createTailwindVariables(theme) {
  const entries = Object.keys(theme).map((configKey) => {
    switch (configKey) {
      case 'colors': {
        if (theme.colors) {
          // @ts-expect-error
          return [configKey, createTailwindColorVariables(theme.colors)];
        }
        break;
      }
      case 'fontSize': {
        break;
      }
      default: {
        // @ts-expect-error
        const variables = Object.keys(theme[configKey]).map((token) => [token, `var(${toToken(configKey, token)})`]);
        return [configKey, Object.fromEntries(variables)];
      }
    }
  });
  // @ts-expect-error can't really type this in cjs
  return Object.fromEntries(entries);
}

module.exports = {
  createTailwindVariables,
  toToken,
};
