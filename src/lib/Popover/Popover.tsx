import React, { useRef } from 'react';
import * as RdxPopover from '@radix-ui/react-popover';

import { Box } from '../Box';
import { OpenStateProvider, OpenStateRef, useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';
import { PopoverBox } from './PopoverBox';
import { Portal } from '../Portal';
import { styled } from '../stitches.config';
import { Presence } from '../shared/Presence';
interface Props {
  children: [React.ReactElement, React.ReactElement<ContentProps>];
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

interface ContentProps
  extends Pick<RdxPopover.PopoverContentProps, 'side' | 'sideOffset' | 'align'>,
    React.ComponentProps<typeof PopoverBox> {}

const Content: React.FC<ContentProps> = ({
  children,
  css,
  align = 'start',
  side = 'bottom',
  sideOffset = 8,
  ...props
}) => {
  const open = useOpenState();
  return (
    <Presence present={open}>
      {({ ref: presenceRef }) => (
        <PopoverPortal radixPortal={RdxPopover.Portal} forceMount>
          <RdxPopover.Content collisionPadding={8} align={align} side={side} sideOffset={sideOffset} asChild>
            <PopoverBox {...props} ref={presenceRef}>
              <Box p="$4" css={css}>
                {children}
              </Box>
            </PopoverBox>
          </RdxPopover.Content>
        </PopoverPortal>
      )}
    </Presence>
  );
};

const PopoverPortal = styled(Portal, {
  '& > [data-radix-popper-content-wrapper]': {
    '@mobile': {
      position: 'initial !important',
      transform: 'none !important',
    },
  },
});

export const Popover = PopoverRoot;
PopoverRoot.displayName = 'Popover';
PopoverRoot.Content = Content;

export function usePopoverRef() {
  return useRef<OpenStateRef>(null);
}
