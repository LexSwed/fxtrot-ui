import type { ThemeColor } from './utils';

// use dashed syntax to align with CSS vars syntax, stitches doesn't do any sanitization
export interface ThemeColors {
  // Primary color
  'primary': ThemeColor;
  // Onprimary is applied to content (icons, text, etc.) that sits on top of primary
  'on-primary': ThemeColor;
  // Primary container is applied to elements needing less emphasis than primary
  'primary-container': ThemeColor;
  // Onprimary container is applied to content (icons, text, etc.) that sits on top of primary container
  'on-primary-container': ThemeColor;

  // Less prominent active elements
  'secondary': ThemeColor;
  // For content (icons, text, etc.) that sits on top of secondary container
  'on-secondary': ThemeColor;
  // Secondary container is applied to elements needing less emphasis than secondary
  'secondary-container': ThemeColor;
  // For content (icons, text, etc.) that sits on top of secondary container
  'on-secondary-container': ThemeColor;

  // Tertiary roles are used for contrasting accents that can be used to balance primary and secondary colors or bring heightened attention to an element, such as an input field.
  'tertiary': ThemeColor;
  // For content (icons, text, etc.) that sits on top of tertiary container
  'on-tertiary': ThemeColor;
  // Secondary container is applied to elements needing less emphasis than tertiary
  'tertiary-container': ThemeColor;
  // For content (icons, text, etc.) that sits on top of tertiary container
  'on-tertiary-container': ThemeColor;

  'error': ThemeColor;
  'on-error': ThemeColor;
  'error-container': ThemeColor;
  'on-error-container': ThemeColor;

  'success': ThemeColor;
  'on-success': ThemeColor;
  'success-container': ThemeColor;
  'on-success-container': ThemeColor;

  'background': ThemeColor;
  'on-background': ThemeColor;
  'surface': ThemeColor;
  'on-surface': ThemeColor;

  'inverse-surface': ThemeColor;
  'inverse-on-surface': ThemeColor;

  // Surface variant and onsurface variant can be used for differentiation against a surface
  'surface-variant': ThemeColor;
  'on-surface-variant': ThemeColor;
  // Outline is a utility color that creates boundaries and emphasis to improve usability. It's distinct from the divider component, which uses the surface variant role for lowemphasis content separation that is more decorative than essential.
  'outline': ThemeColor;

  'disabled': ThemeColor;
  'on-disabled': ThemeColor;
}

export type TailwindVariables = {
  [token in keyof ThemeColors]: `hsl(var(--fx-color-${token}-hsl) / <alpha-value>)`;
};
