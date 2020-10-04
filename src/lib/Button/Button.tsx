import React, { useRef } from 'react';
import { useButton } from '@react-aria/button';

import { styled } from '../stitches.config';
import { useForkRef } from '../utils';
import Inline from '../Inline';
import Icon from '../Icon';

const ButtonRoot = styled(Inline, {
  'px': '$3',
  'fontSize': '$sm',
  'lineHeight': 1,
  'display': 'inline-flex',
  'height': '$8',
  'fontWeight': 500,
  'transition': '0.2s ease-in-out',
  '$outline': 1,
  'font': '$default',
  'border': '1px solid transparent',
  'br': '$md',
  'cursor': 'default',

  [`${Icon}:first-child`]: {
    ml: '-$1',
  },
  [`${Icon}:last-child`]: {
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
        bc: '$surfaceStill',
        color: '$text',
        $inputStyles: 'default',
      },
      outline: {
        'color': '$primaryStill',
        '$inputStyles': 'primary',
        ':hover': {
          bc: '$primaryLight',
          color: '$primaryHover',
        },
        ':active': {
          bc: '$primaryLightActive',
          color: '$primaryActive',
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
  },
});

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
type Props = React.ComponentPropsWithRef<typeof ButtonRoot> & ButtonProps;

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ as = 'button', variant = 'primary', css, ...props }, propRef) => {
    const innerRef = useRef<HTMLButtonElement>(null);
    const { buttonProps } = useButton({ isDisabled: props.disabled, elementType: as, ...props } as any, innerRef);
    const ref = useForkRef(innerRef, propRef);

    return (
      <ButtonRoot {...buttonProps} css={css} space="$2" variant={variant} as={as} ref={ref}>
        {props.children}
      </ButtonRoot>
    );
  }
);

export default Button;
