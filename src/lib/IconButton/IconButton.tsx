import type { VariantProps } from '@stitches/react';
import { forwardRef, ComponentProps } from 'react';

import { buttonCss } from '../Button/Button';
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

type Props = VariantProps<typeof buttonCss> & ComponentProps<'button'> & LabelProps;

const IconButtonRoot = forwardRef<HTMLButtonElement, Props>(({ type = 'button', label, size, ...props }, ref) => {
  return <button aria-label={label} title={label} {...props} aria-disabled={props.disabled} type={type} ref={ref} />;
});

export const IconButton = styled(IconButtonRoot, buttonCss, {
  position: 'relative',
  padding: 0,
  justifyContent: 'center',
  alignItems: 'center',

  variants: {
    size: {
      xs: {
        px: 0,
        inlineSize: '$6',
      },
      sm: {
        px: 0,
        inlineSize: '$8',
      },
      md: {
        inlineSize: '$base',
      },
      lg: {
        inlineSize: '$12',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
