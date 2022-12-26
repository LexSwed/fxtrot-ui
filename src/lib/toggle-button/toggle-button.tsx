import { type ComponentProps, memo, forwardRef } from 'react';
import { clsx } from 'clsx';
import * as Toggle from '@radix-ui/react-toggle';

import { Button } from '../button';

import styles from './toggle-button.module.css';

interface Props extends Toggle.ToggleProps, Omit<ComponentProps<typeof Button>, 'variant'> {
  variant?: 'flat';
}

export const ToggleButton = memo(
  forwardRef<HTMLButtonElement, Props>(
    ({ pressed, onPressedChange, defaultPressed, className, variant = 'flat', ...props }, ref) => {
      return (
        <Toggle.Root asChild pressed={pressed} defaultPressed={defaultPressed} onPressedChange={onPressedChange}>
          <Button {...props} className={clsx(styles['variant--flat'], className)} ref={ref} />
        </Toggle.Root>
      );
    }
  )
);

ToggleButton.displayName = 'ToggleButton';
