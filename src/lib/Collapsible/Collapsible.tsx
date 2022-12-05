import { ComponentProps, FC, forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes, useRef } from 'react';
import * as Rdx from '@radix-ui/react-collapsible';
import clsx from 'clsx';

import { OpenStateProvider, useOpenState, OpenStateRef, useOpenStateControls } from '../utils/OpenStateProvider';

import { Trigger } from './Trigger';
import { Content } from './Content';
import type { CssStyles } from '../stitches.config';

interface Props extends ComponentProps<'div'> {
  css?: CssStyles;
  defaultOpen?: boolean;
  disabled?: boolean;
  children?: ReactNode;
}

const CollapsibleInner: FC<Props> = ({ children, className, ...props }) => {
  const open = useOpenState();
  const controls = useOpenStateControls();
  return (
    <Rdx.Root open={open} onOpenChange={controls.switch} asChild>
      <div {...props} className={clsx('contents rounded-sm', className)}>
        {children}
      </div>
    </Rdx.Root>
  );
};

export const Collapsible = forwardRef<OpenStateRef, Props>(({ defaultOpen, ...props }, ref) => {
  return (
    <OpenStateProvider defaultOpen={defaultOpen} ref={ref}>
      <CollapsibleInner {...props} />
    </OpenStateProvider>
  );
}) as ForwardRefExoticComponent<Props & RefAttributes<OpenStateRef>> & {
  Trigger: typeof Trigger;
  Content: typeof Content;
};

export function useCollapsibleRef() {
  return useRef<OpenStateRef>(null);
}

Collapsible.Trigger = Trigger;
Collapsible.Content = Content;
