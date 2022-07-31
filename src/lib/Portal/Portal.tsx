import React from 'react';
import * as RdxPortal from '@radix-ui/react-portal';
import { ThemeProvider, useFxtrotRootRef } from '../ThemeProvider/ThemeProvider';

interface Props extends React.ComponentProps<typeof ThemeProvider> {
  radixPortal?: React.ComponentType<RdxPortal.PortalProps & { forceMount?: true }>;
  forceMount?: true;
}

/**
 * Allows to have one root div all portals are attached to
 * while preserving the theme of the closest theme provider
 */
export const Portal = React.forwardRef(
  ({ radixPortal: Root = RdxPortal.Root, forceMount, ...props }: Props, propRef: React.Ref<HTMLDivElement>) => {
    const appRootRef = useFxtrotRootRef();
    console.log({ forceMount, Root });
    return (
      <Root container={appRootRef.current} forceMount={forceMount} asChild>
        <ThemeProvider {...props} ref={propRef} />
      </Root>
    );
  }
);
