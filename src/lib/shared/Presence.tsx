import React from 'react';
import * as RdxPresence from '@radix-ui/react-presence';

interface Props<T> {
  present: boolean;
  children: ({ ref }: { ref: React.RefCallback<T> }) => React.ReactElement;
}

const InnerPresence = (React as any).forwardRef(function InnerPresence<T>(
  { children }: Omit<Props<T>, 'present'>,
  ref: React.RefCallback<T>
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
