import React from 'react';
import * as RdxPortal from '@radix-ui/react-portal';
import { ThemeProvider, useFxtrotRootRef } from '../ThemeProvider/ThemeProvider';

interface Props extends React.ComponentProps<typeof ThemeProvider> {
  radixPortal?: React.ComponentType<RdxPortal.PortalProps>;
}

/**
 * Allows to have one root div all portals are attached to
 * while preserving the theme of the closest theme provider
 */
export const Portal = React.forwardRef(
  ({ radixPortal: Root = RdxPortal.Root, ...props }: Props, propRef: React.Ref<HTMLDivElement>) => {
    const appRootRef = useFxtrotRootRef();
    return (
      <Root container={appRootRef.current} asChild>
        <ThemeProvider {...props} ref={propRef} />
      </Root>
    );
  }
);
