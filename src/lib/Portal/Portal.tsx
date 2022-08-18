import React from 'react';
import * as RdxPortal from '@radix-ui/react-portal';
import { ContextThemeProvider, useFxtrotRootRef } from '../ThemeProvider/ThemeProvider';

type PortalProps = RdxPortal.PortalProps & { forceMount?: true };
interface Props {
  children: React.ReactNode;
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
    const counter = React.useContext(zIndexCounterContext);
    // otherwise forceMount: undefined is still cloned as prop and React complains on unknown DOM attribute
    const portalProps: PortalProps = {
      container: appRootRef.current,
      asChild: true,
    };
    if (forceMount !== undefined) {
      portalProps.forceMount = forceMount;
    }

    return (
      <zIndexCounterContext.Provider value={counter + 1}>
        <ContextThemeProvider>
          <Root {...portalProps}>
            <ContextThemeProvider
              {...props}
              style={{ zIndex: counter || 'auto', position: 'relative', display: 'block' }}
              ref={ref}
            />
          </Root>
        </ContextThemeProvider>
      </zIndexCounterContext.Provider>
    );
  }
);

const zIndexCounterContext = React.createContext(500);
