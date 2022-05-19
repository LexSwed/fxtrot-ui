import React from 'react';

import { flexCss, FlexVariants } from '../Flex/Flex';
import { css, styled } from '../stitches.config';

interface Props extends React.ComponentProps<typeof ButtonRoot> {}

export const Button = React.forwardRef<HTMLButtonElement, Props>(({ type = 'button', ...props }, ref) => {
  return <ButtonRoot {...props} aria-disabled={props.disabled} type={type} ref={ref} />;
});

Button.displayName = 'Button';

const flexDefaults: FlexVariants = {
  display: 'inline',
  wrap: 'nowrap',
  cross: 'center',
  main: 'center',
  flow: 'row',
  gap: 'sm',
};

export const buttonCss = css(flexCss, {
  'transition': '0.2s ease-in-out',
  'transitionProperty': 'background-color, color, filter, border-color',
  'fontFamily': '$default',
  'fontWeight': 600,
  'lineHeight': 1,
  'whiteSpace': 'nowrap',
  'cursor': 'pointer',
  'flexShrink': 0,
  'bc': 'transparent',
  'color': '$onSurface',
  'focusRing': '$outline',

  '&:is(:disabled,[aria-disabled=true]), &:where(:disabled,[aria-disabled=true]):is(:hover,:focus)': {
    color: '$onDisabled',
    border: '1px solid $disabled',
    bc: '$disabled',
    cursor: 'not-allowed',
  },

  'variants': {
    size: {
      xs: {
        height: '$6',
        fontSize: '$xs',
        fontWeight: 400,
        px: '$2',
        br: '$sm',
      },
      sm: {
        height: '$8',
        fontSize: '$sm',
        fontWeight: 400,
        px: '$4',
        br: '$sm',
      },
      md: {
        height: '$base',
        fontSize: '$sm',
        fontWeight: 500,
        px: '$4',
        br: '$base',
      },
      lg: {
        height: '$12',
        fontSize: '$md',
        fontWeight: 500,
        px: '$6',
        br: '$base',
      },
    },
    variant: {
      primary: {
        'bc': '$primary',
        'color': '$onPrimary',
        'position': 'relative',
        '&:where(:hover, :focus)': {
          filter: 'saturate(1.1)',
        },
        '&:where(:active, [data-state="open"])': {
          filter: 'saturate(1.2)',
        },
      },
      neutral: {
        'bc': '$surface',
        'color': '$onSurface',
        'border': '1px solid $outline',
        '&:where(:hover, :focus)': {
          bc: '$surface1',
        },
        '&:where(:active, [data-state="open"])': {
          bc: '$surface2',
        },
      },
      outline: {
        'bc': '$surface',
        'color': '$primary',
        'border': '1px solid $primary',
        '&:where(:hover, :focus)': {
          bc: '$primary2',
        },
        '&:where(:active, [data-state="open"])': {
          bc: '$primary3',
          borderColor: '$primary',
        },
      },
      flat: {
        'bc': '$surface',
        'color': '$onSurface',
        'border': '1px solid transparent',
        '&:where(:hover, :focus)': {
          bc: '$surface1',
          borderColor: '$surface2',
        },
        '&:where(:active, [data-state="open"])': {
          bc: '$surface2',
          borderColor: '$surface3',
        },
      },
      link: {
        'bc': 'transparent',
        'color': '$primary',
        '&:where(:hover)': {
          textDecoration: 'underline',
        },
        '&:is(:disabled,[aria-disabled=true])': {
          bc: 'transparent',
          border: 'none',
          textDecoration: 'none',
        },
      },
      transparent: {},
    },
  },
  'defaultVariants': {
    ...flexDefaults,
    variant: 'neutral',
    size: 'md',
  },
});

export const ButtonRoot = styled('button', buttonCss);
