import {
  type ComponentProps,
  forwardRef,
  type ForwardRefExoticComponent,
  type ReactElement,
  type RefAttributes,
  useRef,
} from 'react';
import { clsx } from 'clsx';
import * as RdxPopover from '@radix-ui/react-popover';

import { OpenStateProvider, type OpenStateRef, useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';
import { Portal } from '../portal';
import { Presence } from '../shared/presence';
import { PopoverBox } from '../shared/popover-box';

interface Props {
  children: [ReactElement, ReactElement<ContentProps>];
  defaultOpen?: boolean;
  /**
   * The modality of the popover. When set to true, interaction with outside elements will be disabled and only popover content will be visible to screen readers.
   */
  modal?: boolean;
}

const PopoverInner = ({ defaultOpen, modal, children }: Props) => {
  const open = useOpenState();
  const controls = useOpenStateControls();
  const [trigger, content] = children;

  return (
    <RdxPopover.Root open={open} onOpenChange={controls.switch} defaultOpen={defaultOpen} modal={modal}>
      <RdxPopover.Trigger asChild>{trigger}</RdxPopover.Trigger>
      {content}
    </RdxPopover.Root>
  );
};

const PopoverRoot = forwardRef<OpenStateRef, Props>((props, ref) => {
  return (
    <OpenStateProvider defaultOpen={props.defaultOpen} ref={ref}>
      <PopoverInner {...props} />
    </OpenStateProvider>
  );
}) as ForwardRefExoticComponent<Props & RefAttributes<OpenStateRef>> & {
  Content: typeof Content;
};

PopoverRoot.displayName = 'Popover';

interface ContentProps
  extends Pick<RdxPopover.PopoverContentProps, 'side' | 'sideOffset' | 'align'>,
    ComponentProps<typeof PopoverBox> {}

const Content = ({ children, align = 'start', side = 'bottom', sideOffset = 8, ...props }: ContentProps) => {
  const open = useOpenState();
  return (
    <Presence present={open}>
      {({ ref: presenceRef }) => (
        <Portal radixPortal={RdxPopover.Portal} forceMount>
          <RdxPopover.Content collisionPadding={8} align={align} side={side} sideOffset={sideOffset} asChild>
            <PopoverBox {...props} className={clsx('p-4', props.className)} ref={presenceRef}>
              {children}
            </PopoverBox>
          </RdxPopover.Content>
        </Portal>
      )}
    </Presence>
  );
};

export const Popover = PopoverRoot;
PopoverRoot.displayName = 'Popover';
PopoverRoot.Content = Content;

export function usePopoverRef() {
  return useRef<OpenStateRef>(null);
}
