import React, { useRef } from 'react';
import { useButton } from '@react-aria/button';

import { styled } from '../stitches.config';
import { useForkRef } from '../utils';

const ButtonRoot = styled('button', {
  'py': '$2',
  'px': '$3',
  'color': 'white',
  'textSize': '$base',
  'fontWeight': 500,
  'transition': '0.2s ease-in-out',
  '$outline': 'default',
  'font': '$default',

  ':disabled': {
    cursor: 'default',
  },

  'variants': {
    variant: {
      primary: {
        'bc': '$blue500',
        'color': 'white',
        'br': '$md',
        ':hover': {
          bc: '$blue600',
        },
        ':active': {
          bc: '$blue700',
        },
        ':disabled': {
          color: '$gray600',
          bc: '$gray200',
        },
      },
      secondary: {
        'bc': 'transparent',
        'color': '$blue500',
        'border': '1px solid $blue500',
        'br': '$md',
        ':hover': {
          bc: '$blue700',
          borderColor: 'transparent',
          color: 'white',
        },
      },
    },
  },
});

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
type Props = React.ComponentPropsWithRef<typeof ButtonRoot> & ButtonProps;

const Button = React.forwardRef<HTMLButtonElement, Props>(({ as, variant = 'primary', css, ...props }, propRef) => {
  const innerRef = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton({ isDisabled: props.disabled, ...props } as any, innerRef);
  const ref = useForkRef(innerRef, propRef);

  return (
    <ButtonRoot {...buttonProps} css={css} variant={variant} as={as} ref={ref}>
      {props.children}
    </ButtonRoot>
  );
});

export default Button;
