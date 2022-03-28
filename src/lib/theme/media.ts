export const mediaQueries = {
  mobile: `(max-width: 320px)`,
  tablet: `(max-width: 768px)`,
  untilDesktop: `(max-width: 1024px)`,
  desktop: `(min-width: 1024px)`,
  fullscreen: `(min-width: 1280px)`,
  dark: '(prefers-color-scheme: dark)',
  light: '(prefers-color-scheme: light)',
} as const;
