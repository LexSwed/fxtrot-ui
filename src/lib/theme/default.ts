export const lightColors: ThemeColors = {
  primary: 'hsl(232 53% 55%)',
  onPrimary: 'hsl(0 0% 100%)',
  primaryContainer: 'hsl(235 100% 93.3%)',
  onPrimaryContainer: 'hsl(232 100% 19%)',

  secondary: 'hsl(231 39.1% 47.6%)',
  onSecondary: 'hsl(0 0% 100%)',
  secondaryContainer: 'hsl(235 100% 93.3%)',
  onSecondaryContainer: 'hsl(232 100% 19%)',

  tertiary: 'hsl(328 95.8% 37.1%)',
  onTertiary: 'hsl(0 0% 100%)',
  tertiaryContainer: 'hsl(343 100% 92.5%)',
  onTertiaryContainer: 'hsl(333 100% 12.2%)',

  success: 'hsl(167 100% 21%)',
  onSuccess: 'hsl(0 0% 100%)',
  successContainer: 'hsl(162 90% 73%)',
  onSuccessContainer: 'hsl(165 94% 6%)',

  error: 'hsl(340 71% 41%)',
  onError: 'hsl(0 0% 100%)',
  errorContainer: 'hsl(351 100% 93%)',
  onErrorContainer: 'hsl(341 100% 13%)',

  outline: 'hsl(270 4.1% 47.5%)',
  background: 'hsl(260 100% 99.4%)',
  onBackground: 'hsl(0 0% 10.6%)',

  surface: 'hsl(260 100% 99.4%)',
  onSurface: 'hsl(0 0% 10.6%)',
  surfaceVariant: 'hsl(275 24% 90.2%)',
  onSurfaceVariant: 'hsl(264 6.8% 29%)',
  inverseSurface: 'hsl(225 4.1% 19.2%)',
  inverseOnSurface: 'hsl(255 15.4% 94.9%)',
  disabled: 'hsla(0 0% 12% / 0.08)',
  onDisabled: 'hsl(204 9.1% 30%)',
};

export type HSLThemeColor = `hsl(${number} ${number}% ${number}%)`;
export type HSLAThemeColor = `hsla(${number} ${number}% ${number}% / ${number})`;
export type ThemeColor = HSLThemeColor | HSLAThemeColor;
// use dashed syntax to align with CSS vars syntax, stitches doesn't do any sanitization
export interface ThemeColors {
  // Primary color
  primary: ThemeColor;
  // Onprimary is applied to content (icons, text, etc.) that sits on top of primary
  onPrimary: ThemeColor;
  // Primary container is applied to elements needing less emphasis than primary
  primaryContainer: ThemeColor;
  // Onprimary container is applied to content (icons, text, etc.) that sits on top of primary container
  onPrimaryContainer: ThemeColor;

  // Less prominent active elements
  secondary: ThemeColor;
  // For content (icons, text, etc.) that sits on top of secondary container
  onSecondary: ThemeColor;
  // Secondary container is applied to elements needing less emphasis than secondary
  secondaryContainer: ThemeColor;
  // For content (icons, text, etc.) that sits on top of secondary container
  onSecondaryContainer: ThemeColor;

  // Tertiary roles are used for contrasting accents that can be used to balance primary and secondary colors or bring heightened attention to an element, such as an input field.
  tertiary: ThemeColor;
  // For content (icons, text, etc.) that sits on top of tertiary container
  onTertiary: ThemeColor;
  // Secondary container is applied to elements needing less emphasis than tertiary
  tertiaryContainer: ThemeColor;
  // For content (icons, text, etc.) that sits on top of tertiary container
  onTertiaryContainer: ThemeColor;

  error: ThemeColor;
  onError: ThemeColor;
  errorContainer: ThemeColor;
  onErrorContainer: ThemeColor;

  success: ThemeColor;
  onSuccess: ThemeColor;
  successContainer: ThemeColor;
  onSuccessContainer: ThemeColor;

  background: ThemeColor;
  onBackground: ThemeColor;
  surface: ThemeColor;
  onSurface: ThemeColor;

  inverseSurface: ThemeColor;
  inverseOnSurface: ThemeColor;

  // Surface variant and onsurface variant can be used for differentiation against a surface
  surfaceVariant: ThemeColor;
  onSurfaceVariant: ThemeColor;
  // Outline is a utility color that creates boundaries and emphasis to improve usability. It's distinct from the divider component, which uses the surface variant role for lowemphasis content separation that is more decorative than essential.
  outline: ThemeColor;

  disabled: ThemeColor;
  onDisabled: ThemeColor;
}
