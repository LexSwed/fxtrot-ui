import colors from '../../lib/theme/colors';

export function groupPalette() {
  return Object.entries(colors).reduce((res, [colorKey, colorValue]) => {
    let groupName;
    if (isColorShade(colorKey)) {
      const name = colorKey.slice(1, -3).replace(/([A-Z])/g, ' $1');
      groupName = name.charAt(0).toUpperCase() + name.slice(1);
    } else {
      groupName = 'App Specific';
    }

    if (res[groupName]) {
      res[groupName][colorKey] = colorValue;
    } else {
      res[groupName] = { [colorKey]: colorValue };
    }

    return res;
  }, {} as Record<string, Record<string, string>>);
}

function isColorShade(color: string): boolean {
  return !isNaN(Number(color.slice(-3)));
}
