/**
 * @param {string} themeConfig - Type of the token: color, scale, fontSize
 * @param {string} name - Name of the token
 * @return {string}
 */
function toToken(themeConfig, name) {
  return `--fx-${themeConfig}-${name}`;
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
  /** @type {import('tailwindcss').Config } */
  const tailwindConfig = {};
  for (let configKey in theme) {
    if (configKey === 'colors') {
      tailwindConfig.colors = createTailwindColorVariables(theme.colors);
    } else {
      tailwindConfig[configKey] = Object.fromEntries(
        Object.keys(theme[configKey]).map((token) => [token, `var(${toToken(configKey, token)})`])
      );
    }
  }
  return tailwindConfig;
}

module.exports = {
  createTailwindVariables,
  toToken,
};
