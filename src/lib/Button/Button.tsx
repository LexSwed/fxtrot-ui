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
  'transitionProperty': 'background-color, color, border-color',
  'fontFamily': '$default',
  'fontWeight': 600,
  'lineHeight': 1,
  'whiteSpace': 'nowrap',
  'cursor': 'pointer',
  'flexShrink': 0,
  'bc': 'transparent',
  'color': '$onSurface',
  '&[disabled],[aria-disabled="true"]': {
    pointerEvents: 'none',
  },
  'focusRing': '$outline',

  '&:disabled': {
    color: '$text--disabled',
    borderColor: '$border-accent--disabled',
    bc: '$shape--disabled',
    cursor: 'default',
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
        '&:hover': {
          bc: '$primarySurface1',
        },
        '&:active, &[data-state="open"]': {
          bc: '$primarySurface2',
        },
      },
      neutral: {
        'bc': '$surface',
        'color': '$onSurface',
        'border': '1px solid $outline',
        '&:hover, &:focus': {
          bc: '$surface1',
        },
        '&:active, &[data-state="open"]': {
          bc: '$surface2',
        },
      },
      outline: {
        'bc': '$surface',
        'color': '$primary',
        'border': '1px solid $primary',
        '&:hover, &:focus': {
          bc: '$surface2',
        },
        '&:active, &[data-state="open"]': {
          bc: '$surface3',
          borderColor: '$primarySurface1',
        },
      },
      flat: {
        'bc': '$surface',
        'color': '$onSurface',
        '&:hover, &:focus': {
          bc: '$surface1',
          color: '$primary',
        },
        '&:active, &[data-state="open"]': {
          bc: '$surface2',
          color: '$primary',
        },
      },
      link: {
        'bc': 'transparent',
        'color': '$primary',
        '&:not([aria-disabled="true"]):hover': {
          textDecoration: 'underline',
        },
        '&[disabled],&[aria-disabled="true"]': {
          bc: 'transparent',
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
