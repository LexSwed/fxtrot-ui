import React from 'react';
import * as Toggle from '@radix-ui/react-toggle';
import { Slot } from '@radix-ui/react-slot';

import { Button } from '../Button';
import { styled } from '../stitches.config';

interface Props extends Toggle.ToggleOwnProps, Omit<React.ComponentProps<typeof Button>, 'variant'> {
  variant?: 'flat' | 'secondary';
}

export const ToggleButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ pressed, onPressedChange, defaultPressed, variant = 'flat', ...props }, ref) => {
    return (
      <Toggle.Root as={Slot} pressed={pressed} defaultPressed={defaultPressed} onPressedChange={onPressedChange}>
        <ToggleButtonRoot {...props} variant={variant} _variant={variant} ref={ref} />
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
    '_variant': {
      flat: {},
      secondary: {},
    },
  },
  compoundVariants: [
    {
      '_variant': 'flat',
      'data-state': 'on',
      'css': {
        color: '$primaryStill',
      },
    },
    {
      '_variant': 'secondary',
      'data-state': 'on',
      'css': {
        bc: '$surfaceActive',
      },
    },
  ],
});
