import * as colors from './colors';

export const defaultColors: ThemeColors = {
  primary: '',
  onPrimary '',
  primaryContainer: '',
  onPrimaryContainer: ''

  'focusRing': colors.slateA.slateA11,
} as const;

// use dashed syntax to align with CSS vars syntax, stitches doesn't do any sanitization
export interface ThemeColors {
  // Primary color
  primary: string;
  // On-primary is applied to content (icons, text, etc.) that sits on top of primary
  onPrimary: string;
  // Primary container is applied to elements needing less emphasis than primary
  primaryContainer: string;
  // On-primary container is applied to content (icons, text, etc.) that sits on top of primary container
  onPrimaryContainer: string;
  
  // Less prominent active elements
  secondary: string;
  // For content (icons, text, etc.) that sits on top of secondary container
  onSecondary: string;
  // Secondary container is applied to elements needing less emphasis than secondary
  secondaryContainer: string;
  // For content (icons, text, etc.) that sits on top of secondary container
  onSecondaryContiner: string;

  // Tertiary roles are used for contrasting accents that can be used to balance primary and secondary colors or bring heightened attention to an element, such as an input field. 
  tertiary: string;
  // For content (icons, text, etc.) that sits on top of tertiary container
  onTertiary: string;
  // Secondary container is applied to elements needing less emphasis than tertiary
  tertiaryContainer: string;
  // For content (icons, text, etc.) that sits on top of tertiary container
  onTertiaryContiner: string;

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
  inversePrimary: string;

  // Surface variant and on-surface variant can be used for differentiation against a surface
  surfaceVariant: string;
  onSurfaceVariant: string;
  // Outline is a utility color that creates boundaries and emphasis to improve usability. It's distinct from the divider component, which uses the surface variant role for low-emphasis content separation that is more decorative than essential.
  outline: string;

  disabled: string;
  onDisabled: string;

  'focusRing': string;
}
