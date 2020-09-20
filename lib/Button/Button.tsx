import React, { useRef } from 'react';
import { useButton } from '@react-aria/button';

import { styled } from '../stitches.config';
import { useForkRef } from '../utils';

const ButtonRoot = styled('button', {
  'px': '$3',
  'fontSize': '$sm',
  'lineHeight': 1,
  'display': 'flex',
  'alignItems': 'center',
  'height': '$8',
  'color': 'white',
  'fontWeight': 500,
  'transition': '0.2s ease-in-out',
  '$outline': 2,
  'font': '$default',
  'border': '2px solid transparent',
  'br': '$md',

  ':disabled': {
    cursor: 'default',
  },

  'variants': {
    variant: {
      primary: {
        'bc': '$blue500',
        'color': 'white',
        'borderColor': '$blue500',
        ':hover': {
          borderColor: '$blue600',
          bc: '$blue600',
        },
        ':focus': {
          borderColor: '$blue700',
          bc: '$blue700',
        },
        ':active': {
          borderColor: '$blue700',
          bc: '$blue700',
        },
        ':disabled': {
          borderColor: '$gray200',
          color: '$gray600',
          bc: '$gray200',
        },
      },
      secondary: {
        bc: '$surface',
        color: '$text',
        $inputBorder: 'apply',
        $outline: 1,
      },
      text: {
        'bc': 'transparent',
        'color': '$text',
        ':hover': {
          bc: '$gray100',
        },
        ':focus': {
          bc: '$gray200',
        },
        ':active': {
          bc: '$gray200',
        },
        ':disabled': {
          borderColor: 'transparent',
          color: '$gray600',
          bc: 'transparent',
        },
      },
      link: {
        'bc': 'transparent',
        'color': '$blue500',
        'cursor': 'pointer',
        ':not([aria-disabled="true"]):hover': {
          color: '$blue600',
          textDecoration: 'underline',
        },
        ':not([aria-disabled="true"]):focus': {
          color: '$blue700',
          textDecoration: 'underline',
        },
        ':not([aria-disabled="true"]):active': {
          color: '$blue700',
          textDecoration: 'underline',
        },
        '&[aria-disabled="true"]': {
          borderColor: 'transparent',
          color: '$gray600',
          cursor: 'default',
        },
      },
    },
  },
});

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
type Props = React.ComponentPropsWithRef<typeof ButtonRoot> & ButtonProps;

const Button = React.forwardRef<HTMLButtonElement, Props>(({ as, variant = 'primary', css, ...props }, propRef) => {
  const innerRef = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton({ isDisabled: props.disabled, elementType: as, ...props } as any, innerRef);
  const ref = useForkRef(innerRef, propRef);

  return (
    <ButtonRoot {...buttonProps} css={css} variant={variant} as={as} ref={ref}>
      {props.children}
    </ButtonRoot>
  );
});

export default Button;
