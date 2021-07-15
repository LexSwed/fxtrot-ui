import { FocusScope } from '@react-aria/focus';
import React, { useContext, useMemo, useRef } from 'react';
import { useUID } from 'react-uid';
import * as Radix from '@radix-ui/react-popover';
import { Slot } from '@radix-ui/react-slot';

import Box from '../Box';
import { useAllHandlers, useForkRef, useKeyboardHandles } from '../utils/hooks';
import {
  useToggleState,
  OpenStateRef,
  useOpenState,
  useOpenStateControls,
  ToggleStateScope,
} from '../utils/OpenStateProvider';
import PopoverLayer from './PopoverLayer';
interface Props {
  children: [React.ReactElement, React.ReactElement<ContentProps>];
  defaultOpen?: boolean;
}

const Popover = React.forwardRef<OpenStateRef, Props>(({ children, defaultOpen }, ref) => {
  const [open, controls, atom] = useToggleState({ defaultOpen }, ref);
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
    <PopoverLayer {...props}>
      <Box p="$4">{children}</Box>
    </PopoverLayer>
  );
};

Popover.displayName = 'Popover';
Popover.Content = Content;

export default Popover;
