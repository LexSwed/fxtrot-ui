import React from 'react';
import * as Toggle from '@radix-ui/react-toggle';

import { Button } from '../Button';
import { styled } from '../stitches.config';

interface Props extends Toggle.ToggleProps, Omit<React.ComponentProps<typeof Button>, 'variant'> {
  variant?: 'flat' | 'secondary';
}

export const ToggleButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ pressed, onPressedChange, defaultPressed, variant = 'flat', ...props }, ref) => {
    return (
      <Toggle.Root asChild pressed={pressed} defaultPressed={defaultPressed} onPressedChange={onPressedChange}>
        <ToggleButtonRoot {...props} variant={variant} ref={ref} />
      </Toggle.Root>
    );
  }
);

ToggleButton.displayName = 'ToggleButton';

const ToggleButtonRoot = styled(Button, {
  variants: {
    'data-state': {
      on: {},
      off: {},
    },
  },
  compoundVariants: [
    {
      'variant': 'flat',
      'data-state': 'on',
      'css': {
        color: '$primaryStill',
      },
    },
    {
      'variant': 'secondary',
      'data-state': 'on',
      'css': {
        bc: '$surfaceActive',
      },
    },
  ],
});
