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
  'fontFamily': '$default',
  'lineHeight': 1,
  'border': '1px solid transparent',
  'br': '$md',
  'cursor': 'default',
  'whiteSpace': 'nowrap',
  'flexShrink': 0,
  '&[disabled],[aria-disabled="true"]': {
    pointerEvents: 'none',
  },

  'variants': {
    size: {
      xs: {
        height: '$6',
        fontSize: '$xs',
        fontWeight: 400,
        px: '$2',
      },
      sm: {
        height: '$8',
        fontSize: '$sm',
        fontWeight: 400,
        px: '$2',
      },
      md: {
        height: '$base',
        fontSize: '$md',
        fontWeight: 500,
        px: '$3',
      },
      lg: {
        height: '$12',
        fontSize: '$md',
        fontWeight: 500,
        px: '$4',
      },
    },
    variant: {
      primary: {
        'bc': '$primaryStill',
        'color': 'white',
        'borderColor': '$primaryStill',
        'focusRing': '$focusRing',
        '&:hover': {
          borderColor: '$primaryHover',
          bc: '$primaryHover',
        },
        '&:active': {
          borderColor: '$primaryActive',
          bc: '$primaryActive',
        },
        '&:focus': {
          borderColor: '$primaryActive',
        },
        '&:disabled': {
          color: '$textDisabled',
          borderColor: '$surfaceDisabled',
          bc: '$surfaceDisabled',
        },
      },
      secondary: {
        'bc': '$surfaceStill',
        'color': '$text',
        'borderColor': '$borderStill',
        'focusRing': '$borderLight',
        '&:hover': {
          borderColor: '$borderHover',
        },
        '&:disabled': {
          color: '$textDisabled',
          borderColor: '$surfaceDisabled',
          bc: '$surfaceDisabled',
        },
        '&:active': {
          borderColor: '$borderActive',
          bc: '$surfaceActive',
        },
        '&:focus': {
          borderColor: '$borderActive',
        },
      },
      outline: {
        'color': '$primaryStill',
        'bc': 'transparent',
        'focusRing': '$focusRing',
        'borderColor': '$primaryStill',
        '&:hover': {
          bc: '$primaryLight',
          color: '$primaryHover',
          borderColor: '$primaryHover',
        },
        '&:active': {
          bc: '$primaryLightActive',
          color: '$primaryActive',
          borderColor: '$primaryActive',
        },
        '&:focus': {
          borderColor: '$primaryActive',
        },
        '&:disabled': {
          color: '$textDisabled',
          borderColor: '$surfaceDisabled',
          bc: '$surfaceDisabled',
        },
      },
      flat: {
        'bc': '$flatStill',
        'color': '$text',
        'focusRing': '$borderLight',
        '&:hover': {
          bc: '$flatHover',
        },
        '&:active': {
          bc: '$flatActive',
        },
        '&:disabled': {
          color: '$textDisabled',
          borderColor: 'transparent',
          bc: 'transparent',
        },
      },
      link: {
        'bc': 'transparent',
        'color': '$accent',
        'cursor': 'pointer',
        'focusRing': '$focusRing',
        '&:not([aria-disabled="true"]):hover': {
          color: '$primaryHover',
          textDecoration: 'underline',
        },
        '&:not([aria-disabled="true"]):not([disabled]):active': {
          color: '$primaryActive',
          textDecoration: 'underline',
        },
        '&[disabled],&[aria-disabled="true"]': {
          borderColor: 'transparent',
          cursor: 'default',
          color: '$textDisabled',
        },
      },
      transparent: {
        focusRing: '$focusRing',
        bc: 'transparent',
        borderColor: 'transparent',
        color: '$text',
      },
    },
  },
  'defaultVariants': {
    ...flexDefaults,
    variant: 'secondary',
    size: 'md',
  },
});

export const ButtonRoot = styled('button', buttonCss);
