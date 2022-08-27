import { keyframes, styled } from '../stitches.config';
import { listStyles } from '../shared/FloatingList';

export const PopoverBox = styled('div', listStyles, {
  'br': '$base',
  'bc': '$surface',
  'boxShadow': '$popper',
  'animationTimingFunction': 'ease-in',
  'animationFillMode': 'forwards',
  '&:where([data-state="open"], [data-state="delayed-open"], [data-state="instant-open"])': {
    animationDuration: '0.15s',
  },
  '&:where([data-state="closed"])': {
    animationDuration: '0.1s',
  },
  '&:where([data-side="top"], [data-side="bottom"])': {
    '$$direction': 'var($$direction, 1)',
    '&:where([data-state="open"], [data-state="delayed-open"], [data-state="instant-open"])': {
      animationName: keyframes({
        '0%': {
          opacity: 0,
          transform: 'translateY(calc($$direction * 5px))',
        },
        '60%': {
          opacity: 1,
        },
        'to': {
          opacity: 1,
          transform: 'none',
        },
      }),
    },
    '&:where([data-state="closed"])': {
      animationName: keyframes({
        from: {
          opacity: 1,
          transform: 'none',
        },
        to: {
          opacity: 0,
          transform: 'translateY(calc($$direction * 5px))',
        },
      }),
    },
  },
  '&:where([data-side="top"])': {
    $$direction: '1',
  },
  '&:where([data-side="bottom"])': {
    $$direction: '-1',
  },
  '&:where([data-side="right"], [data-side="left"])': {
    '$$direction': 'var($$direction, 1)',
    '&:where([data-state="open"], [data-state="delayed-open"], [data-state="instant-open"])': {
      animationName: keyframes({
        '0%': {
          opacity: 0,
          transform: 'translateX(calc($$direction * 5px))',
        },
        '60%': {
          opacity: 1,
        },
        'to': {
          opacity: 1,
          transform: 'none',
        },
      }),
    },
    '&:where([data-state="closed"])': {
      animationName: keyframes({
        '0%': {
          opacity: 0,
          transform: 'translateX(calc($$direction * 5px))',
        },
        '60%': {
          opacity: 1,
        },
        'to': {
          opacity: 1,
          transform: 'none',
        },
      }),
    },
  },
  '&:where([data-side="right"])': {
    $$direction: '-1',
  },
  '&:where([data-side="left"])': {
    $$direction: '1',
  },
  '@no-motion': {
    animationDuration: '0s',
  },
});
