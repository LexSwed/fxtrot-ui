import { createCss } from '@stitches/react';

import { attribute } from './FocusRing/focus-visible';
import { scales } from './theme/scales';
import { shadows } from './theme/shadows';
import { allColors, themes } from './ThemeProvider/themes';

export const theme = {
  colors: {
    ...allColors,
    ...themes.blue.colors,
  },
  fonts: {
    default: '"Noto Sans", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, sans-serif',
    heading: '"Source Sans Pro", apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, sans-serif',
    mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
  },
  space: scales,
  sizes: { ...scales, base: scales['10'] },
  fontSizes: {
    'xs': '11.16px',
    'sm': '12.50px',
    'md': '14.00px',
    'lg': '15.68px',
    'xl': '17.56px',
    '2xl': '22.03px',
    '3xl': '27.63px',
    '4xl': '30.95px',
    '5xl': '38.82px',
    '6xl': '48.70px',
    '7xl': '61.09px',
    '8xl': '85.83px',
    '9xl': '107.66px',
    'base': '$md',
  },
  lineHeights: {
    'xs': '1em',
    'sm': '1.25em',
    'md': '1.5em',
    'lg': '1.75em',
    'xl': '1.75em',
    '2xl': '2em',
    '3xl': '2.25em',
    '4xl': '2.5em',
    '5xl': '1',
    '6xl': '1',
    '7xl': '1',
    '8xl': '1',
    '9xl': '1',
    'base': '$md',
  },
  radii: {
    '0': '0',
    'sm': '2px',
    'md': '4px',
    'lg': '8px',
    'xl': '16px',
    'round': '50%',
    'pill': '9999px',
  },
  zIndices: {
    '1': '100',
    '2': '200',
    '3': '300',
    '4': '400',
    'max': '9999',
  },
  shadows,
} as const;

export type Theme = typeof theme;

type ThemeSpace = `$${keyof Theme['space']}`;
type ThemeColor = `$${keyof Theme['colors']}`;
type ThemeFontSize = `$${keyof Theme['fontSizes']}`;
type ThemeSize = `$${keyof Theme['sizes']}`;

export const stitchesConfig = createCss({
  theme,
  media: {
    mobile: `(max-width: 320px)`,
    tablet: `(max-width: 768px)`,
    desktop: `(min-width: 1024px)`,
    fullscreen: `(min-width: 1280px)`,
    dark: '(prefers-color-scheme: dark)',
    light: '(prefers-color-scheme: light)',
  },
  utils: {
    p: (config) => (value: ThemeSpace | (number | (string & {}))) => ({
      paddingTop: value,
      paddingBottom: value,
      paddingLeft: value,
      paddingRight: value,
    }),
    pt: (config) => (value: ThemeSpace | (number | (string & {}))) => ({
      paddingTop: value,
    }),
    pr: (config) => (value: ThemeSpace | (number | (string & {}))) => ({
      paddingRight: value,
    }),
    pb: (config) => (value: ThemeSpace | (number | (string & {}))) => ({
      paddingBottom: value,
    }),
    pl: (config) => (value: ThemeSpace | (number | (string & {}))) => ({
      paddingLeft: value,
    }),
    px: (config) => (value: ThemeSpace | (number | (string & {}))) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (config) => (value: ThemeSpace | (number | (string & {}))) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    m: (config) => (value: ThemeSpace | (number | (string & {}))) => ({
      marginTop: value,
      marginBottom: value,
      marginLeft: value,
      marginRight: value,
    }),
    mt: (config) => (value: ThemeSpace | (number | (string & {}))) => ({
      marginTop: value,
    }),
    mr: (config) => (value: ThemeSpace | (number | (string & {}))) => ({
      marginRight: value,
    }),
    mb: (config) => (value: ThemeSpace | (number | (string & {}))) => ({
      marginBottom: value,
    }),
    ml: (config) => (value: ThemeSpace | (number | (string & {}))) => ({
      marginLeft: value,
    }),
    mx: (config) => (value: ThemeSpace | (number | (string & {}))) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (config) => (value: ThemeSpace | (number | (string & {}))) => ({
      marginTop: value,
      marginBottom: value,
    }),

    bg: (config) => (value: ThemeColor | (string & {})) => ({
      background: value,
    }),
    bc: (config) => (value: ThemeColor | (string & {})) => ({
      backgroundColor: value,
    }),

    br: (config) => (value: `$${keyof Theme['radii']}` | (string & {})) => ({
      borderRadius: value,
    }),

    textSize: (config) => (value: ThemeFontSize) => ({
      fontSize: value,
      lineHeight: value,
    }),

    size: (config) => (value: ThemeSize | (number | (string & {}))) => {
      return {
        width: value,
        height: value,
      };
    },

    focusRing: (config) => (color: ThemeColor = '$focusRing') => ({
      // [`&:not(:disabled)[${attribute}]`]: {
      // [`&:not(:disabled)]`]: {
      //   'outline': 'none',
      //   'position': 'relative',
      //   '$$offset': `${offset}px`,

      //   '&::before': {
      //     content: `''`,
      //     display: 'block',
      //     position: 'absolute',
      //     top: `calc(-1 * $$offset)`,
      //     right: `calc(-1 * $$offset)`,
      //     bottom: `calc(-1 * $$offset)`,
      //     left: `calc(-1 * $$offset)`,
      //     transitionProperty: 'box-shadow, border-color',
      //     transitionDuration: '0.2s',
      //     transitionTimingFunction: 'ease-in-out',
      //     pointerEvents: 'none',
      //     border: '1px solid transparent',
      //     br: 'inherit',
      //   },
      // },
      '$$focusRingColor': `$colors${color}`,
      '&:focus': {
        outline: 'none',
      },
      [`&:focus[${attribute}]`]: {
        boxShadow: `0 0 0 3px $$focusRingColor`,
      },
    }),
  },
  prefix: 'fxtrot',
  insertionMethod() {
    let styleElement: HTMLElement | undefined;
    const styleId = 'fxtrot-ui';
    // @ts-ignore
    const extensionRootId = typeof process === 'object' ? process.env.EXTENSION_NODE : null;

    function createShadowRootStyleElement(id: string) {
      const el = document.getElementById(id);
      if (el?.shadowRoot) {
        const style =
          el?.shadowRoot.getElementById(styleId) || Object.assign(document.createElement('style'), { id: styleId });

        if (!style.parentNode) {
          el.shadowRoot.appendChild(style);
        }
        return style;
      }
    }

    function createDocumentStyleElement() {
      const style = document.getElementById(styleId) || Object.assign(document.createElement('style'), { id: styleId });

      let currentCssHead = document.head || document.documentElement;

      if (!style.parentNode) currentCssHead.append(style);

      return style;
    }

    return (cssText) => {
      if (typeof document === 'object') {
        if (!styleElement) {
          styleElement = extensionRootId ? createShadowRootStyleElement(extensionRootId) : createDocumentStyleElement();
        }
        if (extensionRootId) {
          cssText = cssText.split(':root').join(':host');
        }
        if (styleElement) {
          styleElement.textContent = cssText;
        }
      }
    };
  },
});

export const { css, styled, keyframes } = stitchesConfig;
