import React, { useRef } from 'react';
import { useButton } from '@react-aria/button';

import { styled } from '../stitches.config';

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
          bc: '$blue700',
        },
      },
      pill: {
        'bc': '$blue500',
        'color': 'white',
        'br': '$pill',
        '&:hover': {
          bc: '$blue700',
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

type Props = React.ComponentProps<typeof ButtonRoot>;

const Button: React.FC<Props> = ({ as, variant = 'default', ...props }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props as any, ref);

  return (
    <ButtonRoot {...buttonProps} variant={variant} as={as} ref={ref}>
      {props.children}
    </ButtonRoot>
  );
};

export default Button;
