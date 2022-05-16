export const lightColors: ThemeColors = {
  primary: '#2d54ce',
  onPrimary: '#ffffff',
  primaryContainer: '#dbe1ff',
  onPrimaryContainer: '#001454',

  secondary: '#00658e',
  onSecondary: '#ffffff',
  secondaryContainer: '#c3e7ff',
  onSecondaryContainer: '#001e2e',

  tertiary: '#00677e',
  onTertiary: '#ffffff',
  tertiaryContainer: '#b1ebff',
  onTertiaryContainer: '#001f28',

  success: '#006b54',
  onSuccess: '#ffffff',
  successContainer: '#7cf8d3',
  onSuccessContainer: '#012018',

  error: '#b41f50',
  onError: '#ffffff',
  errorContainer: '#ffd9df',
  onErrorContainer: '#400014',

  outline: '#79747e',
  background: '#fbfcfe',
  onBackground: '#191c1e',
  surface: '#fbfcfe',
  onSurface: '#191c1e',

  surface1: '#2d54ce0d',
  surface2: '#2d54ce14',
  surface3: '#2d54ce1c',
  surface4: '#2d54ce1f',
  surface5: '#2d54ce24',

  surfaceVariant: '#e7e0ec',
  onSurfaceVariant: '#49454f',

  inverseSurface: '#2e3133',
  inverseOnSurface: '#f0f1f3',

  disabled: '#05294d07',
  onDisabled: '#191c1e',

  focusRing: '#79747e',
};
export const darkColors: ThemeColors = {
  primary: '#b5c4ff',
  onPrimary: '#002585',
  primaryContainer: '#0039b5',
  onPrimaryContainer: '#dbe1ff',

  secondary: '#7fcfff',
  onSecondary: '#00382a',
  secondaryContainer: '#00513f',
  onSecondaryContainer: '#7cf8d3',

  tertiary: '#2cd7ff',
  onTertiary: '#003542',
  tertiaryContainer: '#004e60',
  onTertiaryContainer: '#b1ebff',

  success: '#5edbb8',
  onSuccess: '#00382a',
  successContainer: '#00513f',
  onSuccessContainer: '#7cf8d3',

  error: '#ffb2c1',
  onError: '#660025',
  errorContainer: '#900038',
  onErrorContainer: '#ffd9df',

  outline: '#938F99',
  background: '#191c1e',
  onBackground: '#e1e3e5',
  surface: '#191c1e',
  onSurface: '#e1e3e5',
  surface1: '#b5c4ff0d',
  surface2: '#b5c4ff14',
  surface3: '#b5c4ff1c',
  surface4: '#b5c4ff1f',
  surface5: '#b5c4ff24',
  surfaceVariant: '#49454F',
  onSurfaceVariant: '#CAC4D0',

  inverseSurface: '#e1e3e5',
  inverseOnSurface: '#191c1e',

  disabled: '#e3e3e31f',
  onDisabled: '#e1e3e5',

  focusRing: '#938F99',
};

// use dashed syntax to align with CSS vars syntax, stitches doesn't do any sanitization
export interface ThemeColors {
  // Primary color
  primary: string;
  // Onprimary is applied to content (icons, text, etc.) that sits on top of primary
  onPrimary: string;
  // Primary container is applied to elements needing less emphasis than primary
  primaryContainer: string;
  // Onprimary container is applied to content (icons, text, etc.) that sits on top of primary container
  onPrimaryContainer: string;

  // Less prominent active elements
  secondary: string;
  // For content (icons, text, etc.) that sits on top of secondary container
  onSecondary: string;
  // Secondary container is applied to elements needing less emphasis than secondary
  secondaryContainer: string;
  // For content (icons, text, etc.) that sits on top of secondary container
  onSecondaryContainer: string;

  // Tertiary roles are used for contrasting accents that can be used to balance primary and secondary colors or bring heightened attention to an element, such as an input field.
  tertiary: string;
  // For content (icons, text, etc.) that sits on top of tertiary container
  onTertiary: string;
  // Secondary container is applied to elements needing less emphasis than tertiary
  tertiaryContainer: string;
  // For content (icons, text, etc.) that sits on top of tertiary container
  onTertiaryContainer: string;

  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;

  success: string;
  onSuccess: string;
  successContainer: string;
  onSuccessContainer: string;

  background: string;
  onBackground: string;
  surface: string;
  surface1: string;
  surface2: string;
  surface3: string;
  surface4: string;
  surface5: string;
  onSurface: string;

  inverseSurface: string;
  inverseOnSurface: string;

  // Surface variant and onsurface variant can be used for differentiation against a surface
  surfaceVariant: string;
  onSurfaceVariant: string;
  // Outline is a utility color that creates boundaries and emphasis to improve usability. It's distinct from the divider component, which uses the surface variant role for lowemphasis content separation that is more decorative than essential.
  outline: string;

  disabled: string;
  onDisabled: string;

  focusRing: string;
}
