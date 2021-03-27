import * as colors from '../theme/colors';

export const allColors = {
  ...colors.blueGray,
  ...colors.coolGray,
  ...colors.gray,
  ...colors.trueGray,
  ...colors.warmGray,
  ...colors.red,
  ...colors.orange,
  ...colors.amber,
  ...colors.yellow,
  ...colors.lime,
  ...colors.green,
  ...colors.emerald,
  ...colors.teal,
  ...colors.cyan,
  ...colors.lightBlue,
  ...colors.blue,
  ...colors.indigo,
  ...colors.violet,
  ...colors.purple,
  ...colors.fuchsia,
  ...colors.pink,
  ...colors.rose,
};

const themeDefinitions: Record<DefinedThemes, ShortDefinition> = {
  emerald: {
    primary: 'emerald',
    accent: 'emerald',
    shade: 'true',
  },
  green: {
    primary: 'green',
    accent: 'green',
    shade: 'true',
  },
  lime: {
    primary: 'lime',
    accent: 'lime',
    shade: 'true',
  },
  teal: {
    primary: 'teal',
    accent: 'teal',
    shade: 'true',
  },
  blue: {
    primary: 'blue',
    accent: 'blue',
    shade: 'cool',
  },
  lightBlue: {
    primary: 'lightBlue',
    accent: 'lightBlue',
    shade: 'cool',
  },
  indigo: {
    primary: 'indigo',
    accent: 'indigo',
    shade: 'cool',
  },
  cyan: {
    primary: 'cyan',
    accent: 'cyan',
    shade: 'cool',
  },
  violet: {
    primary: 'violet',
    accent: 'violet',
    shade: 'cool',
  },
  purple: {
    primary: 'purple',
    accent: 'purple',
    shade: 'cool',
  },
  fuchsia: {
    primary: 'fuchsia',
    accent: 'fuchsia',
    shade: 'warm',
  },
  pink: {
    primary: 'pink',
    accent: 'pink',
    shade: 'warm',
  },
  amber: {
    primary: 'amber',
    accent: 'amber',
    shade: 'warm',
  },
  orange: {
    primary: 'orange',
    accent: 'orange',
    shade: 'warm',
  },
  rose: {
    primary: 'rose',
    accent: 'rose',
    shade: 'warm',
  },
  red: {
    primary: 'red',
    accent: 'red',
    shade: 'warm',
  },
  yellow: {
    primary: 'yellow',
    accent: 'yellow',
    shade: 'warm',
  },
};

export const themes = Object.fromEntries(
  Object.entries(themeDefinitions).map(([name, definition]) => [name, createNewTheme(definition)] as const)
) as Record<DefinedThemes, Swatch>;

export function createNewTheme({ shade, primary, accent }: ShortDefinition): Swatch {
  return {
    colors: {
      text: allColors[`${shade}Gray900` as keyof typeof allColors],
      textDisabled: allColors[`${shade}Gray500` as keyof typeof allColors],
      textLight: allColors[`${shade}Gray600` as keyof typeof allColors],
      textSubtle: allColors[`${shade}Gray500` as keyof typeof allColors],
      accent: allColors[`${accent}600` as keyof typeof allColors],
      accentLight: allColors[`${accent}500` as keyof typeof allColors],
      success: allColors['green700'],
      danger: allColors['red600'],

      primaryStill: allColors[`${primary}500` as keyof typeof allColors],
      primaryHover: allColors[`${primary}600` as keyof typeof allColors],
      primaryActive: allColors[`${primary}700` as keyof typeof allColors],
      primaryLight: allColors[`${primary}50` as keyof typeof allColors],
      primaryLightActive: allColors[`${primary}100` as keyof typeof allColors],

      flatStill: 'transparent',
      flatHover: convertHex(allColors[`${shade}Gray600` as keyof typeof allColors], 0.08),
      flatActive: convertHex(allColors[`${shade}Gray500` as keyof typeof allColors], 0.05),
      flatDisabled: allColors[`${shade}Gray200` as keyof typeof allColors],

      surfaceStill: '#fff',
      surfaceHover: allColors[`${shade}Gray100` as keyof typeof allColors],
      surfaceActive: convertHex(allColors[`${shade}Gray500` as keyof typeof allColors], 0.08),
      surfaceDisabled: allColors[`${shade}Gray200` as keyof typeof allColors],

      borderLight: allColors[`${shade}Gray200` as keyof typeof allColors],
      borderStill: allColors[`${shade}Gray300` as keyof typeof allColors],
      borderHover: allColors[`${shade}Gray400` as keyof typeof allColors],
      borderActive: allColors[`${shade}Gray500` as keyof typeof allColors],
    },
  };
}

export type DefinedThemes =
  | 'emerald'
  | 'green'
  | 'lime'
  | 'teal'
  | 'blue'
  | 'lightBlue'
  | 'indigo'
  | 'cyan'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'amber'
  | 'orange'
  | 'rose'
  | 'red'
  | 'yellow';

export interface ShortDefinition {
  accent: keyof typeof colors;
  primary: keyof typeof colors;
  shade: 'true' | 'cool' | 'blue' | 'warm';
}

export interface Swatch {
  colors: {
    text: string;
    textDisabled: string;
    textLight: string;
    textSubtle: string;
    accent: string;
    accentLight: string;
    success: string;
    danger: string;

    primaryStill: string;
    primaryHover: string;
    primaryActive: string;
    primaryLight: string;
    primaryLightActive: string;

    flatStill: string;
    flatHover: string;
    flatActive: string;
    flatDisabled: string;

    surfaceStill: string;
    surfaceHover: string;
    surfaceActive: string;
    surfaceDisabled: string;

    borderLight: string;
    borderStill: string;
    borderHover: string;
    borderActive: string;
  };
}

function convertHex(hex: string, opacity: number) {
  const [, color] = hex.split('#');
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
}
