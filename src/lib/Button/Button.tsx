import React, { useRef } from 'react';
import { useButton } from '@react-aria/button';
import { FocusableProps, PressEvents } from '@react-types/shared';

import { styled } from '../stitches.config';
import { useForkRef } from '../utils';
import Flex from '../Flex';
import Icon from '../Icon';

const ButtonRoot = styled(Flex, {
  'transition': '0.2s ease-in-out',
  '$outline': 0,
  'fontFamily': '$default',
  'border': '1px solid transparent',
  'br': '$md',
  'cursor': 'default',

  [`& > ${Icon}:first-child`]: {
    ml: '-$1',
  },
  [`& > ${Icon}:last-child`]: {
    mr: '-$1',
  },

  ':disabled': {
    color: '$textDisabled',
    borderColor: '$surfaceDisabled',
    bc: '$surfaceDisabled',
  },

  'variants': {
    variant: {
      primary: {
        'bc': '$primaryStill',
        'color': 'white',
        'borderColor': '$primaryStill',
        ':hover': {
          borderColor: '$primaryHover',
          bc: '$primaryHover',
        },
        ':active': {
          borderColor: '$primaryActive',
          bc: '$primaryActive',
        },
      },
      secondary: {
        'bc': '$surfaceStill',
        'color': '$text',
        'borderColor': '$borderStill',
        ':hover': {
          borderColor: '$borderHover',
          bc: '$surfaceHover',
        },
        ':disabled': {
          borderColor: '$surfaceDisabled',
          bc: '$surfaceDisabled',
        },
        ':active, :focus': {
          borderColor: '$borderActive',
          bc: '$surfaceActive',
        },
      },
      outline: {
        'color': '$primaryStill',
        'bc': 'transparent',
        'borderColor': '$primaryStill',
        ':hover': {
          bc: '$primaryLight',
          color: '$primaryHover',
          borderColor: '$primaryHover',
        },
        ':active': {
          bc: '$primaryLightActive',
          color: '$primaryActive',
          borderColor: '$primaryActive',
        },
      },
      flat: {
        'bc': 'transparent',
        'color': '$text',
        ':hover': {
          bc: '$surfaceHover',
        },
        ':active': {
          bc: '$surfaceActive',
        },
        ':disabled': {
          borderColor: 'transparent',
          bc: 'transparent',
        },
      },
      link: {
        'bc': 'transparent',
        'color': '$accent',
        'cursor': 'pointer',
        ':not([aria-disabled="true"]):hover': {
          color: '$hover',
          textDecoration: 'underline',
        },
        ':not([aria-disabled="true"]):active': {
          color: '$active',
          textDecoration: 'underline',
        },
        '&[aria-disabled="true"]': {
          borderColor: 'transparent',
          cursor: 'default',
          color: '$textDisabled',
        },
      },
    },
    size: {
      sm: {
        height: '$6',
        lineHeight: '$6',
        fontSize: '$xs',
        fontWeight: 400,
        px: '$2',
      },
      md: {
        height: '$base',
        lineHeight: '$base',
        fontSize: '$sm',
        fontWeight: 500,
        px: '$3',
      },
      lg: {
        height: '$10',
        lineHeight: '$10',
        fontSize: '$md',
        fontWeight: 500,
        px: '$3',
      },
    },
  },
});

type Props = React.ComponentPropsWithRef<typeof ButtonRoot> &
  FocusableProps &
  PressEvents & {
    space?: React.ComponentProps<typeof Flex>['space'];
  };

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ as = 'button', variant = 'primary', size = 'md', space = '$2', css, ...props }, propRef) => {
    const innerRef = useRef<HTMLButtonElement>(null);
    const { buttonProps } = useButton({ isDisabled: props.disabled, elementType: as, ...props } as any, innerRef);
    const ref = useForkRef(innerRef, propRef);

    return (
      <ButtonRoot
        {...buttonProps}
        flow="row"
        cross="center"
        display="inline"
        css={css}
        space={space}
        variant={variant}
        as={as}
        ref={ref}
        size={size}
      >
        {props.children}
      </ButtonRoot>
    );
  }
);

Button.displayName = 'Button';

export default Button;
