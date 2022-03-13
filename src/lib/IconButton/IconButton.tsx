import React from 'react';

import { ButtonRoot } from '../Button/Button';
import { styled } from '../stitches.config';

type LabelProps =
  | {
      label: string;
    }
  | {
      'label'?: string;
      'aria-labelledby': string;
    }
  | {
      'label'?: string;
      'aria-label': string;
    };

type Props = React.ComponentProps<typeof ButtonRoot> & LabelProps;

export const IconButton = React.forwardRef<HTMLButtonElement, Props>(({ type = 'button', label, ...props }, ref) => {
  return (
    <IconButtonRoot
      aria-label={label}
      title={label}
      {...props}
      aria-disabled={props.disabled}
      _size={props.size}
      type={type}
      ref={ref}
    />
  );
});

export const IconButtonRoot = styled(ButtonRoot, {
  position: 'relative',
  padding: 0,
  justifyContent: 'center',
  alignItems: 'center',

  variants: {
    _size: {
      xs: {
        px: 0,
        width: '$6',
      },
      sm: {
        px: 0,
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
  defaultVariants: {
    _size: 'md',
  },
});
