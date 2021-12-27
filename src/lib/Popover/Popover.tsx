import React, { useRef } from 'react';
import * as Radix from '@radix-ui/react-popover';

import { Box } from '../Box';
import { OpenStateProvider, OpenStateRef, useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';
import { PopoverLayer } from './PopoverLayer';
import { Portal } from '../Portal';
interface Props {
  children: [React.ReactElement, React.ReactElement<ContentProps>];
  defaultOpen?: boolean;
}

const PopoverInner = ({ defaultOpen, children }: Props) => {
  const open = useOpenState();
  const controls = useOpenStateControls();
  const [trigger, content] = children;

  return (
    <Radix.Root open={open} onOpenChange={controls.switch} defaultOpen={defaultOpen}>
      <Radix.Trigger asChild>{trigger}</Radix.Trigger>
      {content}
    </Radix.Root>
  );
};

const PopoverRoot = React.forwardRef<OpenStateRef, Props>((props, ref) => {
  return (
    <OpenStateProvider defaultOpen={props.defaultOpen} ref={ref}>
      <PopoverInner {...props} />
    </OpenStateProvider>
  );
}) as React.ForwardRefExoticComponent<Props & React.RefAttributes<OpenStateRef>> & {
  Content: typeof Content;
};

PopoverRoot.displayName = 'Popover';

interface ContentProps extends React.ComponentProps<typeof PopoverLayer> {}
const Content: React.FC<ContentProps> = ({ children, ...props }) => {
  return (
    <Portal>
      <PopoverLayer {...props} forceMount portalled={false} radixElement={Radix.Content}>
        <Box p="$4">{children}</Box>
      </PopoverLayer>
    </Portal>
  );
};

export const Popover = PopoverRoot;
PopoverRoot.displayName = 'Popover';
PopoverRoot.Content = Content;

export function usePopoverRef() {
  return useRef<OpenStateRef>();
}
