import { type ComponentProps, memo, forwardRef, Children, isValidElement } from 'react';
import { classed as css } from '@tw-classed/core';
import * as Toggle from '@radix-ui/react-toggle';
import clsx from 'clsx';

import { IconButton } from '../IconButton';
import { Icon } from '../Icon';
import { Button } from '../button';

import styles from './ToggleButton.module.css';

interface Props extends Toggle.ToggleProps, Omit<ComponentProps<typeof Button>, 'variant'> {
  variant?: 'flat';
}

export const ToggleButton = memo(
  forwardRef<HTMLButtonElement, Props>(
    ({ pressed, onPressedChange, defaultPressed, variant = 'flat', ...props }, ref) => {
      const isIconButton =
        Children.count(props.children) === 1 &&
        Children.toArray(props.children).every((child) => isValidElement(child) && child.type === Icon);

      const ButtonComponent = isIconButton ? IconButton : Button;

      return (
        <Toggle.Root asChild pressed={pressed} defaultPressed={defaultPressed} onPressedChange={onPressedChange}>
          <ButtonComponent
            {...(props as any)}
            className={clsx(toggleButtonCss({ variant }), props.className)}
            variant={variant}
            ref={ref}
          />
        </Toggle.Root>
      );
    }
  )
);

ToggleButton.displayName = 'ToggleButton';

const toggleButtonCss = css({
  variants: {
    variant: {
      flat: styles['button--flat'],
    },
  },
});
