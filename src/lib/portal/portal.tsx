import * as RdxPortal from '@radix-ui/react-portal';
import { type ReactNode, type ComponentType, forwardRef, useContext, createContext } from 'react';
import { useFxtrotRootRef } from '../theme-provider/theme-provider';

type PortalProps = RdxPortal.PortalProps & { forceMount?: true };
interface Props {
  children: ReactNode;
  radixPortal?: ComponentType<PortalProps>;
  forceMount?: true;
}

/**
 * Allows to have one root div all portals are attached to
 * while preserving the theme of the closest theme provider
 */
export const Portal = forwardRef<HTMLDivElement, Props>(
  ({ radixPortal: Root = RdxPortal.Root, forceMount, ...props }, ref) => {
    const appRootRef = useFxtrotRootRef();
    const counter = useContext(zIndexCounterContext);
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
        <Root {...portalProps}>
          <span {...props} style={{ zIndex: counter || 'auto', position: 'relative', display: 'block' }} ref={ref} />
        </Root>
      </zIndexCounterContext.Provider>
    );
  }
);

const zIndexCounterContext = createContext(200);
