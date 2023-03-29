import {
  type ComponentProps,
  forwardRef,
  type ForwardRefExoticComponent,
  type ReactNode,
  type RefAttributes,
  useRef,
} from 'react';
import * as Rdx from '@radix-ui/react-collapsible';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

import { OpenStateProvider, useOpenState, type OpenStateRef, useOpenStateControls } from '../utils/OpenStateProvider';

import { Icon } from '../icon';
import { Button } from '../button';

import styles from './collapsible.module.css';

interface TriggerProps extends ComponentProps<typeof Button> {}

const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ children, flow = 'row', cross = 'center', main = 'space-between', className, ...props }, ref) => {
    return (
      <Rdx.Trigger asChild>
        <Button flow={flow} cross={cross} main={main} className={clsx(styles.trigger, className)} {...props} ref={ref}>
          {children}
          <Icon className={styles['trigger-icon']} size={props.size} as={ChevronDownIcon} />
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
  defaultOpen?: boolean;
  disabled?: boolean;
  children?: ReactNode;
}

const CollapsibleInner = ({ children, className, ...props }: Props) => {
  const open = useOpenState();
  const controls = useOpenStateControls();
  return (
    <Rdx.Root open={open} onOpenChange={controls.switch} asChild>
      <div {...props} className={clsx(styles.root, className)}>
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
