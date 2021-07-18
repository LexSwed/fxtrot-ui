import React, { useRef } from 'react';
import * as Radix from '@radix-ui/react-popover';
import { Slot } from '@radix-ui/react-slot';

import Box from '../Box';
import { useToggleState, OpenStateRef, ToggleStateScope } from '../utils/OpenStateProvider';
import { PopoverLayer } from './PopoverLayer';
interface Props {
  children: [React.ReactElement, React.ReactElement<ContentProps>];
  defaultOpen?: boolean;
}

export const Popover = React.forwardRef<OpenStateRef, Props>(({ children, defaultOpen }, ref) => {
  const [open, controls, atom] = useToggleState(defaultOpen, ref);
  const [trigger, content] = children;

  return (
    <ToggleStateScope atom={atom}>
      <Radix.Root open={open} onOpenChange={controls.switch} defaultOpen={defaultOpen}>
        <Radix.Trigger as={Slot}>{trigger}</Radix.Trigger>
        {content}
      </Radix.Root>
    </ToggleStateScope>
  );
}) as React.ForwardRefExoticComponent<Props & React.RefAttributes<OpenStateRef>> & {
  Content: typeof Content;
};

Popover.displayName = 'Popover';

interface ContentProps extends React.ComponentProps<typeof PopoverLayer> {}
const Content: React.FC<ContentProps> = ({ children, ...props }) => {
  return (
    <PopoverLayer {...props} radixElement={Radix.Content}>
      <Box p="$4">{children}</Box>
    </PopoverLayer>
  );
};

Popover.displayName = 'Popover';
Popover.Content = Content;

export function usePopoverRef() {
  return useRef<OpenStateRef>();
}
