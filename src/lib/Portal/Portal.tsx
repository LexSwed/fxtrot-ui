import React from 'react';
import { Root } from '@radix-ui/react-portal';
import { ThemeProvider, useFxtrotRootRef } from '../ThemeProvider/ThemeProvider';

/**
 * Allows to have one root div all portals are attached to
 * while preserving the theme of the closest theme provider
 */
export const Portal = React.forwardRef(
  (props: React.ComponentProps<typeof ThemeProvider>, propRef: React.Ref<HTMLDivElement>) => {
    const appRootRef = useFxtrotRootRef();
    return (
      <Root containerRef={appRootRef} asChild>
        <ThemeProvider {...props} ref={propRef} />
      </Root>
    );
  }
);
