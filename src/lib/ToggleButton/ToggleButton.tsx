import React from 'react';
import type * as Polymorphic from '@radix-ui/react-polymorphic';

import Button from '../Button';
import { useAllHandlers, useDerivedState } from '../utils/hooks';
import { styled } from '../stitches.config';

const ToggleButtonRoot = styled(Button, {
  variants: {
    pressed: {
      true: {},
    },
    _variant: {
      flat: {},
      secondary: {},
    },
  },
  compoundVariants: [
    {
      _variant: 'flat',
      pressed: true,
      css: {
        color: '$primaryStill',
      },
    },
    {
      _variant: 'secondary',
      pressed: true,
      css: {
        bc: '$surfaceActive',
      },
    },
  ],
});

interface Props extends Omit<React.ComponentProps<typeof Button>, 'variant'> {
  /** The pressed state of the toggle when it is initially rendered. Use when you do not need to control its pressed state. */
  defaultPressed?: boolean;
  /** The controlled pressed state of the toggle. Must be used in conjunction with in conjunction with onPressedChange. */
  pressed?: boolean;
  /** Event handler called when the pressed state of the toggle changes. */
  onPressedChange?: (pressed: boolean) => void;
  variant?: 'flat' | 'secondary';
}

const ToggleButton = React.forwardRef(
  ({ pressed = false, onPressedChange, variant = 'flat', ...props }: React.ComponentProps<ButtonComponent>, ref) => {
    const [state, setState] = useDerivedState(pressed, onPressedChange);
    const handleClick = useAllHandlers(props.onClick, () => setState(!state));

    return (
      <ToggleButtonRoot
        {...props}
        variant={variant}
        _variant={variant}
        pressed={state}
        aria-pressed={state}
        onClick={handleClick}
        ref={ref}
      />
    );
  }
) as ButtonComponent;

export type ButtonComponent = Polymorphic.ForwardRefComponent<'button', Props>;

export default ToggleButton;
