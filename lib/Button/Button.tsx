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
  '$outline': 1,
  'font': '$default',
  'border': '1px solid transparent',
  'br': '$md',

  ':disabled': {
    cursor: 'default',
  },

  'variants': {
    variant: {
      primary: {
        'bc': '$primary',
        'color': 'white',
        'borderColor': '$primary',
        ':hover': {
          borderColor: '$hover',
          bc: '$hover',
        },
        ':active': {
          borderColor: '$active',
          bc: '$active',
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
        $inputStyles: 'apply',
      },
      text: {
        'bc': 'transparent',
        'color': '$text',
        ':hover': {
          bc: '$gray100',
        },
        ':active': {
          bc: '$gray200',
        },
        ':disabled': {
          borderColor: 'transparent',
          color: '$gray500',
          bc: 'transparent',
        },
      },
      link: {
        'bc': 'transparent',
        'color': '$primary',
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
          color: '$gray500',
          cursor: 'default',
        },
      },
    },
  },
});

// type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
type Props = React.ComponentPropsWithRef<typeof ButtonRoot>;

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
