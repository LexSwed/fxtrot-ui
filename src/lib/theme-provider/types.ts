type ColorChannel = `${number} ${number}% ${number}%` | `${number}deg ${number}% ${number}%`;
export type ThemeColor = ColorChannel | `hsl(${ColorChannel})` | `rgb(${ColorChannel})`;

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

export type TailwindColorVariables = {
  [token in keyof ThemeColors]: `hsl(var(--fx-color-${token}-hsl) / <alpha-value>)`;
};

export type Theme = {
  colors?: Partial<ThemeColors>;
  // Tailwind default + xs and popper
  boxShadow?: {
    'sm'?: string;
    'md'?: string;
    'lg'?: string;
    'xl'?: string;
    '2xl'?: string;
    'inner'?: string;
    'none'?: string;
    'xs'?: string;
    'popper'?: string;
  };
  // Tailwind default + xs, sm, md, etc
  spacing?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
  fontFamily?: {
    sans?: string;
    serif?: string;
    mono?: string;
  };
  /** fontSize + lineHeight */
  fontSize?: {
    'xs'?: [fontSize: string, lineHeight: string];
    'sm'?: [fontSize: string, lineHeight: string];
    'md'?: [fontSize: string, lineHeight: string];
    'lg'?: [fontSize: string, lineHeight: string];
    'xl'?: [fontSize: string, lineHeight: string];
    '2xl'?: [fontSize: string, lineHeight: string];
    '3xl'?: [fontSize: string, lineHeight: string];
    '4xl'?: [fontSize: string, lineHeight: string];
    '5xl'?: [fontSize: string, lineHeight: string];
    '6xl'?: [fontSize: string, lineHeight: string];
    '7xl'?: [fontSize: string, lineHeight: string];
    '8xl'?: [fontSize: string, lineHeight: string];
    '9xl'?: [fontSize: string, lineHeight: string];
  };
  borderRadius?: {
    'none'?: string;
    'sm'?: string;
    'DEFAULT'?: string;
    'md'?: string;
    'lg'?: string;
    'xl'?: string;
    '2xl'?: string;
    '3xl'?: string;
    'full'?: string;
  };
};
