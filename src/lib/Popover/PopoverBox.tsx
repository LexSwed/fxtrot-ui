import { keyframes, styled } from '../stitches.config';
import { listStyles } from '../shared/FloatingList';

export const PopoverBox = styled('div', listStyles, {
  'br': '$base',
  'bc': '$surface--elevated',
  'boxShadow': '$popper',
  'animationTimingFunction': 'ease-in',
  'animationFillMode': 'forwards',
  '&[data-state="open"]': {
    animationDuration: '0.15s',
  },
  '&[data-state="closed"]': {
    animationDuration: '0.1s',
  },
  '&[data-side="top"]': {
    '&[data-state="open"]': {
      animationName: keyframes({
        '0%': {
          opacity: 0,
          transform: 'translateY(5px)',
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
    '&[data-state="closed"]': {
      animationName: keyframes({
        from: {
          opacity: 1,
          transform: 'none',
        },
        to: {
          opacity: 0,
          transform: 'translateY(5px)',
        },
      }),
    },
  },
  '&[data-side="bottom"]': {
    '&[data-state="open"]': {
      animationName: keyframes({
        '0%': {
          opacity: 0,
          transform: 'translateY(-5px)',
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
    '&[data-state="closed"]': {
      animationName: keyframes({
        from: {
          opacity: 1,
          transform: 'none',
        },
        to: {
          opacity: 0,
          transform: 'translateY(-5px)',
        },
      }),
    },
  },
  '&[data-side="right"]': {
    '&[data-state="open"]': {
      animationName: keyframes({
        '0%': {
          opacity: 0,
          transform: 'translateX(-5px)',
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
    '&[data-state="closed"]': {
      animationName: keyframes({
        '0%': {
          opacity: 0,
          transform: 'translateY(-5px)',
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
  '&[data-side="left"]': {
    '&[data-state="open"]': {
      animationName: keyframes({
        from: {
          opacity: 0,
          transform: 'translateX(5px)',
        },
        to: {
          opacity: 1,
          transform: 'none',
        },
      }),
    },
    '&[data-state="closed"]': {
      animationName: keyframes({
        from: {
          opacity: 1,
          transform: 'none',
        },
        to: {
          opacity: 0,
          transform: 'translateX(5px)',
        },
      }),
    },
  },
});
