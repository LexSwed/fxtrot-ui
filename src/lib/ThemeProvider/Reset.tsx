import { useEffect } from 'react';
import { stitchesConfig } from '../stitches.config';

let applied = false;

export const Reset = () => {
  useEffect(() => {
    if (applied) {
      return;
    }
    populate();
    applied = true;
  }, []);

  return null;
};

const populate = stitchesConfig.globalCss({
  '@import': '"https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"',
  'html, body, div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, abbr, code, em, img, small, strong, sub, sup, ol, ul, li, fieldset, form, label, legend, table, tbody, tfoot, thead, tr, th, td, article, aside, footer, header, nav, section, time, audio, video':
    {
      fontSize: '100%',
      fontWeight: 'inherit',
      margin: '0',
      padding: '0',
      verticalAlign: 'baseline',
      border: '0',
      backgroundColor: 'transparent',
    },
  'html': {
    fontSize: '14px',
    fontFamily: '$default',
    overflowY: 'scroll',
    boxSizing: 'border-box',
    scrollBehavior: 'smooth',
  },
  '*, *::before, *::after': {
    boxSizing: 'inherit',
    backgroundRepeat: 'no-repeat',
  },
  'body': {
    minHeight: '100vh',
    textRendering: 'optimizeSpeed',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  'img, embed, iframe, object, audio, video': {
    maxWidth: '100%',
    height: 'auto',
  },
  'iframe': { border: '0' },
  'audio:not([controls])': { display: 'none', height: '0' },
  'blockquote, q': { quotes: 'none' },
  'blockquote::before, blockquote::after, q::before, q::after': {
    content: `""`,
  },
  'ul, li': { listStyle: 'none' },
  'sup': { verticalAlign: 'text-top' },
  'sub': { verticalAlign: 'text-bottom' },
  'table': { borderSpacing: '0', borderCollapse: 'collapse' },
  'input': { lineHeight: 'normal', borderRadius: '0' },
  'input, select': { verticalAlign: 'middle' },
  'button, input, select, textarea': {
    fontFamily: 'inherit',
    margin: '0',
    textTransform: 'none',
    border: '0',
  },
  'input[type="radio"]': { verticalAlign: 'text-bottom' },
  'input[type="checkbox"]': { verticalAlign: 'bottom' },
  'strong, b': { fontWeight: 'bold' },
  'abbr, acronym': {
    cursor: 'help',
    textDecoration: 'none',
    borderBottom: '0.1em dotted',
  },
  '@media (prefers-reduced-motion: reduce) *': {
    animationDuration: '0.01ms !important',
    animationIterationCount: '1 !important',
    transitionDuration: '0.01ms !important',
    scrollBehavior: 'auto!important' as any,
  },
});
