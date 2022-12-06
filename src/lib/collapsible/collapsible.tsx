import { ComponentProps, FC, forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes, useRef } from 'react';
import * as Rdx from '@radix-ui/react-collapsible';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import { OpenStateProvider, useOpenState, OpenStateRef, useOpenStateControls } from '../utils/OpenStateProvider';

import { Icon } from '../icon';
import { Button } from '../button';
import type { CssStyles } from '../stitches.config';
import styles from './Collapsible.module.css';

interface TriggerProps extends ComponentProps<typeof Button> {}

const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ children, flow = 'row', cross = 'center', main = 'space-between', className, ...props }, ref) => {
    return (
      <Rdx.Trigger asChild>
        <Button flow={flow} cross={cross} main={main} className={clsx('group/trigger', className)} {...props} ref={ref}>
          {children}
          <Icon
            className="transition-transform duration-150 group-data-state-open/trigger:rotate-180"
            as={ChevronDownIcon}
          />
        </Button>
      </Rdx.Trigger>
    );
  }
);

const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>((props, ref) => {
  return (
    <Rdx.Content asChild>
      <div {...props} className={clsx(styles.content, props.className)} ref={ref} />
    </Rdx.Content>
  );
});

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
