import React from 'react';
import type * as Polymorphic from '@radix-ui/react-polymorphic';

import { flexVariants } from '../Flex/Flex';
import Icon from '../Icon/Icon';
import { styled } from '../stitches.config';
import type { StitchesVariants } from '@stitches/core';
import type { CssStyles } from '../utils/types';

export const ButtonRoot = styled('button', {
  'transition': '0.2s ease-in-out',
  'fontFamily': '$default',
  'lineHeight': 1,
  'border': '1px solid transparent',
  'br': '$md',
  'cursor': 'default',
  'whiteSpace': 'nowrap',
  'flexShrink': 0,

  'variants': {
    ...flexVariants,
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
    isIconButton: {
      true: {
        position: 'relative',
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  },
  '&[disabled],[aria-disabled="true"]': {
    pointerEvents: 'none',
  },
  'defaultVariants': {
    display: 'inline',
    wrap: 'nowrap',
    cross: 'center',
    main: 'center',
    flow: 'row',
    gap: '2',
    variant: 'secondary',
    size: 'md',
  },
  'compoundVariants': [
    {
      isIconButton: true,
      size: 'xs',
      css: {
        width: '$6',
      },
    },
    {
      isIconButton: true,
      size: 'md',
      css: {
        width: '$base',
      },
    },
    {
      isIconButton: true,
      size: 'sm',
      css: {
        width: '$8',
      },
    },
    {
      isIconButton: true,
      size: 'lg',
      css: {
        width: '$12',
      },
    },
  ],
});

interface Props extends Omit<StitchesVariants<typeof ButtonRoot>, 'isIconButton'> {
  css?: CssStyles;
}

const Button = React.forwardRef(
  ({ type = 'button', disabled, ...props }: React.ComponentProps<ButtonComponent>, ref) => {
    const isIconButton = React.Children.toArray(props.children).every(
      (child) => React.isValidElement(child) && child.type === Icon
    );

    return (
      <ButtonRoot
        {...props}
        aria-disabled={disabled}
        disabled={disabled}
        ref={ref as any}
        type={type}
        isIconButton={isIconButton}
      />
    );
  }
) as ButtonComponent;

export type ButtonComponent = Polymorphic.ForwardRefComponent<'button', Props>;

export default Button;
