import { type ComponentProps, memo, forwardRef, Children, isValidElement } from 'react';
import * as Toggle from '@radix-ui/react-toggle';

import { Button } from '../Button/Button';
import { css } from '../stitches.config';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';

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
          'bc': '$surfacePrimary2',
          'color': '$primary',
          'borderColor': '$surfacePrimary6',
          '$focusRing': '$surfacePrimary6',
          '@hover': {
            '&:where(:hover)': {
              bc: '$surfacePrimary3',
              borderColor: '$surfacePrimary4',
            },
          },
          '&:where(:focus, :active)': {
            bc: '$surfacePrimary4',
            borderColor: '$surfacePrimary5',
          },
        },
      },
    },
  },
});
