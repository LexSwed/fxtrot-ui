import React from 'react';
import * as RdxPortal from '@radix-ui/react-portal';
import { ThemeProvider, useFxtrotRootRef } from '../ThemeProvider/ThemeProvider';

type PortalProps = RdxPortal.PortalProps & { forceMount?: true };
interface Props extends React.ComponentProps<typeof ThemeProvider> {
  radixPortal?: React.ComponentType<PortalProps>;
  forceMount?: true;
}

/**
 * Allows to have one root div all portals are attached to
 * while preserving the theme of the closest theme provider
 */
export const Portal = React.forwardRef<HTMLDivElement, Props>(
  ({ radixPortal: Root = RdxPortal.Root, forceMount, ...props }, ref) => {
    const appRootRef = useFxtrotRootRef();
    // otherwise forceMount: undefined is still cloned as prop and React complains on unknown DOM attribute
    const portalProps: PortalProps = {
      container: appRootRef.current,
      asChild: true,
    };
    if (forceMount !== undefined) {
      portalProps.forceMount = forceMount;
    }

    return (
      <Root {...portalProps}>
        <FixForNestedPortals {...props} ref={ref} />
      </Root>
    );
  }
);

const zIndexCounterContext = React.createContext(1);

const FixForNestedPortals = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof ThemeProvider>>(
  (props, ref) => {
    const counter = React.useContext(zIndexCounterContext);
    return (
      <zIndexCounterContext.Provider value={counter + 1}>
        <ThemeProvider {...props} ref={ref} style={{ zIndex: counter, position: 'relative', display: 'block' }} />
      </zIndexCounterContext.Provider>
    );
  }
);
