import React from 'react';

import { ButtonRoot } from '../Button/Button';
import { styled } from '../stitches.config';

type AriaProps = { 'aria-label': string } | { 'aria-labelledby': string };

type Props = React.ComponentProps<typeof ButtonRoot> & AriaProps;

export const IconButton = React.forwardRef<HTMLButtonElement, Props>(({ type = 'button', ...props }, ref) => {
  return <IconButtonRoot {...props} aria-disabled={props.disabled} _size={props.size} type={type} ref={ref} />;
});

export const IconButtonRoot = styled(ButtonRoot, {
  position: 'relative',
  padding: 0,
  justifyContent: 'center',
  alignItems: 'center',

  variants: {
    _size: {
      xs: {
        width: '$6',
      },
      sm: {
        width: '$8',
      },
      md: {
        width: '$base',
      },
      lg: {
        width: '$12',
      },
    },
  },
});
