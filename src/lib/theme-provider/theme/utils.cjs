/**
 * @param {string} themeConfig - Type of the token: color, scale, fontSize
 * @param {string} name - Name of the token
 * @return {string}
 */
function toToken(themeConfig, name) {
  return `--fx-${themeConfig}-${name}`;
}

/** @type {import('./utils').createTailwindColors} */
function createTailwindColors(colors) {
  const colorEntries = Object.keys(colors).map((token) => {
    return [token, `hsl(var(${toToken('color', token)}-hsl)  / <alpha-value>)`];
  });

  return Object.fromEntries(colorEntries);
}

/** @type {import('./utils').createThemeColors} */
function createThemeColors(colors) {
  const colorEntries = Object.entries(colors).flatMap(([name, color]) => {
    const hsl = extractChannel(color);
    if (hsl) {
      const token = toToken('color', name);
      return [
        [token, color],
        [`${token}-hsl`, hsl],
      ];
    }
    return [];
  });

  return Object.fromEntries(colorEntries);
}

const channelExtractRegex = /(?:hsl|rgb\()?([\d.]+[deg,\s]*[\d.]+[%,\s]*[\d.]+[%,\s]*)/;

/** @type {import('./utils').extractChannel} */
function extractChannel(color) {
  const match = channelExtractRegex.exec(color);
  if (match) {
    return match[1];
  }
  return null;
}

module.exports = {
  createTailwindColors,
  createThemeColors,
};
