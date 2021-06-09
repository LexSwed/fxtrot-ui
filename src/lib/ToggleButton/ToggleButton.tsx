import React from 'react';
import type * as Polymorphic from '@radix-ui/react-polymorphic';
import * as Toggle from '@radix-ui/react-toggle';
import { Slot } from '@radix-ui/react-slot';

import Button from '../Button';
import { styled } from '../stitches.config';

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

type Props = Toggle.ToggleOwnProps &
  Omit<React.ComponentProps<typeof Button>, 'variant'> & {
    variant?: 'flat' | 'secondary';
  };

const ToggleButton = React.forwardRef(
  (
    {
      pressed,
      onPressedChange,
      defaultPressed,
      variant = 'flat',
      ...props
    }: React.ComponentProps<ToggleButtonComponent>,
    ref
  ) => {
    return (
      <Toggle.Root as={Slot} pressed={pressed} defaultPressed={defaultPressed} onPressedChange={onPressedChange}>
        <ToggleButtonRoot {...props} variant={variant} _variant={variant} ref={ref} />
      </Toggle.Root>
    );
  }
) as ToggleButtonComponent;

export type ToggleButtonComponent = Polymorphic.ForwardRefComponent<'button', Props>;

export default ToggleButton;
