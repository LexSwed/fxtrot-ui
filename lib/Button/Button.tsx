import React, { useRef } from 'react';
import { useButton } from '@react-aria/button';

import { styled } from '../stitches.config';
import { useForkRef } from '../utils';

const ButtonRoot = styled('button', {
  py: '$2',
  px: '$3',
  color: 'white',
  fontSize: '14px',
  fontWeight: 'bold',
  transition: '0.2s ease-in-out',

  variants: {
    variant: {
      default: {
        'bc': '$blue500',
        'color': 'white',
        'br': '$md',
        '&:hover': {
          bc: '$blue600',
        },
        '&:active': {
          bc: '$blue700',
        },
        '&:focus': {
          outlineColor: '$blue100',
        },
        '&:disabled': {
          color: '$gray600',
          bc: '$gray100',
        },
      },
      outline: {
        'bc': 'transparent',
        'color': '$blue500',
        'border': '1px solid $blue500',
        'br': '$md',
        '&:hover': {
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

const Button = React.forwardRef<HTMLButtonElement, Props>(({ as, variant = 'default', css, ...props }, propRef) => {
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
