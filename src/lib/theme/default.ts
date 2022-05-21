export const lightColors: ThemeColors = {
  primary: 'hsl(225 64% 49%)',
  onPrimary: 'hsl(0 0% 100%)',
  primaryContainer: 'hsl(230 100% 93%)',
  onPrimaryContainer: 'hsl(226 100% 16%)',

  secondary: 'hsl(197 100% 28%)',
  onSecondary: 'hsl(0 0% 100%)',
  secondaryContainer: 'hsl(204 100% 88%)',
  onSecondaryContainer: 'hsl(201 100% 9%)',

  tertiary: 'hsl(191 100% 25%)',
  onTertiary: 'hsl(0 0% 100%)',
  tertiaryContainer: 'hsl(195 100% 85%)',
  onTertiaryContainer: 'hsl(194 100% 8%)',

  success: 'hsl(167 100% 21%)',
  onSuccess: 'hsl(0 0% 100%)',
  successContainer: 'hsl(162 90% 73%)',
  onSuccessContainer: 'hsl(165 94% 6%)',

  error: 'hsl(340 71% 41%)',
  onError: 'hsl(0 0% 100%)',
  errorContainer: 'hsl(351 100% 93%)',
  onErrorContainer: 'hsl(341 100% 13%)',
  outline: 'hsl(270 4.1% 47.5%)',
  background: 'hsl(0 0% 100%)',
  onBackground: 'hsl(204 9.1% 10.8%)',
  surface: 'hsl(0 0% 100%)',
  onSurface: 'hsl(204 9.1% 10.8%)',
  surfaceVariant: 'hsl(275 24% 90.2%)',
  onSurfaceVariant: 'hsl(264 6.8% 29%)',
  inverseSurface: 'hsl(204 5.2% 19%)',
  inverseOnSurface: 'hsl(220 11.1% 94.7%)',
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
