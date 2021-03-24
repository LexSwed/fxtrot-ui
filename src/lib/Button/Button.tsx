import React from 'react';
import { flexVariant } from '../Flex/Flex';

import Icon from '../Icon/Icon';
import { styled } from '../stitches.config';

const ButtonRoot = styled('button', {
  transition: '0.2s ease-in-out',
  $outline: 0,
  fontFamily: '$default',
  lineHeight: 1,
  border: '1px solid transparent',
  br: '$md',
  cursor: 'default',
  whiteSpace: 'nowrap',
  flexShrink: 0,

  variants: {
    ...flexVariant.variants,
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
        fontSize: '$sm',
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
        '&:hover': {
          borderColor: '$primaryHover',
          bc: '$primaryHover',
        },
        '&:active': {
          borderColor: '$primaryActive',
          bc: '$primaryActive',
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
        '&:hover': {
          borderColor: '$borderHover',
          bc: '$surfaceHover',
        },
        '&:disabled': {
          color: '$textDisabled',
          borderColor: '$surfaceDisabled',
          bc: '$surfaceDisabled',
        },
        '&:active, &:focus': {
          borderColor: '$borderActive',
          bc: '$surfaceActive',
        },
      },
      outline: {
        'color': '$primaryStill',
        'bc': 'transparent',
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
        '&:disabled': {
          color: '$textDisabled',
          borderColor: '$surfaceDisabled',
          bc: '$surfaceDisabled',
        },
      },
      flat: {
        'bc': '$flatStill',
        'color': '$text',
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
        '&:not([aria-disabled="true"]):hover': {
          color: '$hover',
          textDecoration: 'underline',
        },
        '&:not([aria-disabled="true"]):active': {
          color: '$active',
          textDecoration: 'underline',
        },
        '&[aria-disabled="true"]': {
          borderColor: 'transparent',
          cursor: 'default',
          color: '$textDisabled',
        },
      },
      transparent: {
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
  defaultVariants: {
    ...flexVariant.defaultVariants,
    variant: 'secondary',
    size: 'md',
    gap: '$2',
  },
  compoundVariants: [
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

interface Props extends Omit<React.ComponentProps<typeof ButtonRoot>, 'isIconButton'> {}

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ type = 'button', cross = 'center', main = 'center', ...props }, ref) => {
    const isIconButton = React.Children.toArray(props.children).every(
      (child) => React.isValidElement(child) && child.type === Icon
    );

    return (
      <ButtonRoot {...props} cross={cross} main={main} flow="row" ref={ref} type={type} isIconButton={isIconButton} />
    );
  }
);

export default Button;
