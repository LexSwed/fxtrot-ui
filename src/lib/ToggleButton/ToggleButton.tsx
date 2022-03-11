import React from 'react';
import * as Toggle from '@radix-ui/react-toggle';

import { Button } from '../Button/Button';
import { css } from '../stitches.config';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';

interface Props extends Toggle.ToggleProps, Omit<React.ComponentProps<typeof Button>, 'variant'> {
  variant?: 'flat' | 'secondary';
}

export const ToggleButton = React.memo(
  React.forwardRef<HTMLButtonElement, Props>(
    ({ pressed, onPressedChange, defaultPressed, variant = 'flat', ...props }, ref) => {
      const isIconButton =
        React.Children.count(props.children) === 1 &&
        React.Children.toArray(props.children).every((child) => React.isValidElement(child) && child.type === Icon);

      const ButtonComponent = isIconButton ? IconButton : Button;

      return (
        <Toggle.Root asChild pressed={pressed} defaultPressed={defaultPressed} onPressedChange={onPressedChange}>
          <ButtonComponent {...(props as any)} className={toggleButtonCss({ variant })} variant={variant} ref={ref} />
        </Toggle.Root>
      );
    }
  )
);

ToggleButton.displayName = 'ToggleButton';

const toggleButtonCss = css({
  variants: {
    variant: {
      flat: {
        '&[data-state="on"]': {
          color: '$text-accent',
        },
      },
      secondary: {
        '&[data-state="off"]': {
          bc: '$shape--active',
        },
      },
    },
  },
});
