import { type ComponentProps, memo, forwardRef } from 'react';
import * as Toggle from '@radix-ui/react-toggle';

import { Button } from '../button-1';

interface Props extends Toggle.ToggleProps, Omit<ComponentProps<typeof Button>, 'variant'> {
  variant?: 'flat';
}

export const ToggleButton = memo(
  forwardRef<HTMLButtonElement, Props>(({ pressed, onPressedChange, defaultPressed, ...props }, ref) => {
    return (
      <Toggle.Root asChild pressed={pressed} defaultPressed={defaultPressed} onPressedChange={onPressedChange}>
        <Button {...props} ref={ref} />
      </Toggle.Root>
    );
  })
);

ToggleButton.displayName = 'ToggleButton';
