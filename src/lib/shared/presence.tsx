import * as RdxPresence from '@radix-ui/react-presence';
import { forwardRef, type RefCallback, type ReactElement } from 'react';

interface Props<T> {
  present: boolean;
  children: ({ ref }: { ref: RefCallback<T> }) => ReactElement;
}

const InnerPresence = (forwardRef as any)(function InnerPresence<T>(
  { children }: Omit<Props<T>, 'present'>,
  ref: RefCallback<T>
) {
  return children({ ref });
});

export function Presence<T extends HTMLElement>({ present, children }: Props<T>) {
  return (
    <RdxPresence.Presence present={present}>
      <InnerPresence>{children}</InnerPresence>
    </RdxPresence.Presence>
  );
}
