import { ComponentProps, FC, forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes, useRef } from 'react';
import * as Rdx from '@radix-ui/react-collapsible';

import { OpenStateProvider, useOpenState, OpenStateRef, useOpenStateControls } from '../utils/OpenStateProvider';

import { Trigger } from './Trigger';
import { Content } from './Content';
import type { CssStyles } from '../stitches.config';
import type { VariantProps } from '@stitches/react';
import { styled } from '../stitches.config';

interface Props extends ComponentProps<'div'>, VariantProps<typeof CollapsibleRootStyled> {
  css?: CssStyles;
  defaultOpen?: boolean;
  disabled?: boolean;
  children?: ReactNode;
}

const CollapsibleInner: FC<Props> = ({ children, ...props }) => {
  const open = useOpenState();
  const controls = useOpenStateControls();
  return (
    <Rdx.Root open={open} onOpenChange={controls.switch} asChild>
      <CollapsibleRootStyled {...(props as any)}>{children}</CollapsibleRootStyled>
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

const CollapsibleRootStyled = styled('div', {
  br: '$md',
});
