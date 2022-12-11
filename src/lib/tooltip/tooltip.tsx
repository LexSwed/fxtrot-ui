import * as RdxTooltip from '@radix-ui/react-tooltip';
import { clsx } from 'clsx';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { Portal } from '../portal';
import { PopoverBox } from '../shared/popover-box';

import styles from './tooltip.module.css';

type Props = Pick<RdxTooltip.TooltipProps, 'children' | 'defaultOpen' | 'delayDuration' | 'disableHoverableContent'> &
  Pick<
    RdxTooltip.TooltipContentProps,
    'side' | 'sideOffset' | 'align' | 'alignOffset' | 'sticky' | 'hideWhenDetached'
  > &
  ComponentPropsWithoutRef<'div'> & {
    content?: ReactNode;
  };

export const Tooltip = ({
  children,
  content,
  defaultOpen,
  delayDuration,
  disableHoverableContent,
  sideOffset = 8,
  side,
  align,
  alignOffset,
  sticky,
  hideWhenDetached,
  className,
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
        <RdxTooltip.Content
          asChild
          sideOffset={sideOffset}
          side={side}
          align={align}
          alignOffset={alignOffset}
          sticky={sticky}
          hideWhenDetached={hideWhenDetached}
        >
          <PopoverBox className={clsx(styles.content, className)} {...props}>
            {content}
            <RdxTooltip.Arrow className={styles.arrow} />
          </PopoverBox>
        </RdxTooltip.Content>
      </Portal>
    </RdxTooltip.Root>
  );
};
