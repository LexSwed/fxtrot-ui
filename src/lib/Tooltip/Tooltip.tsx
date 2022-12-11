import * as RdxTooltip from '@radix-ui/react-tooltip';
import type { ComponentProps, ReactNode } from 'react';
import { Portal } from '../portal';
import { styled } from '../stitches.config';
import { PopoverBox } from '../shared/popover-box';

type Props = Pick<RdxTooltip.TooltipProps, 'children' | 'defaultOpen' | 'delayDuration' | 'disableHoverableContent'> &
  Pick<
    RdxTooltip.TooltipContentProps,
    'side' | 'sideOffset' | 'align' | 'alignOffset' | 'sticky' | 'hideWhenDetached'
  > &
  ComponentProps<typeof Content> & {
    content?: ReactNode;
  };

export const Tooltip = ({
  children,
  content,
  defaultOpen,
  delayDuration,
  disableHoverableContent,
  sideOffset = 8,
  ...props
}: Props) => {
  return (
    <RdxTooltip.Root
      defaultOpen={defaultOpen}
      delayDuration={delayDuration}
      disableHoverableContent={disableHoverableContent}
    >
      <RdxTooltip.Trigger asChild>{children}</RdxTooltip.Trigger>
      <Portal radixPortal={RdxTooltip.Portal}>
        <Content {...props} sideOffset={sideOffset}>
          {content}
          <Arrow />
        </Content>
      </Portal>
    </RdxTooltip.Root>
  );
};

const Content = styled(RdxTooltip.Content, PopoverBox, {
  overflow: 'unset',
  p: '$2',
  maxWidth: '220px',
});

const Arrow = styled(RdxTooltip.Arrow, {
  fill: '$surface',
  width: 11,
  height: 5,
  filter: 'drop-shadow(0 0 2px $colors$surface3)',
  clipPath: 'inset(0 -2px -2px -2px)',
});
