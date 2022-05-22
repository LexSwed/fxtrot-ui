import React, { createContext, useContext, useMemo, useRef } from 'react';

import { createTheme, styled } from '../stitches.config';
import { createColorVariations } from '../theme/createColorVariations';
import type { ThemeColors } from '../theme/default';
import { useForkRef } from '../utils/hooks';
import { Reset } from './Reset';

type Props = {
  theme?: Parameters<typeof createTheme>[0];
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'className'>;

export const ThemeProvider = React.forwardRef<HTMLDivElement, Props>(({ theme, ...props }, propRef) => {
  const contextTheme = useContext(themeContext);
  const rootRef = useFxtrotRootRef();
  const ref = useRef<HTMLDivElement>(null);
  const refs = useForkRef(ref, propRef);
  const stitchesTheme = useMemo(() => {
    if (typeof theme === 'string') {
      return theme;
    }
    if (typeof theme === 'object') {
      return createTheme({
        ...(theme as any),
        colors: {
          ...createColorVariations(theme.colors as ThemeColors),
        },
      });
    }
    return undefined;
  }, [theme]);
  const themeValue = stitchesTheme || contextTheme;

  return (
    <rootRefContext.Provider value={rootRef.current ? rootRef : ref}>
      <themeContext.Provider value={themeValue}>
        <ThemeWrapper className={themeValue} ref={refs} {...props} />
      </themeContext.Provider>
      <Reset />
    </rootRefContext.Provider>
  );
});

/**
 * Allows to rertrieve closest theme from context for portalled items,
 * rendered outside of inititial themed DOM element
 */
const themeContext = createContext<ReturnType<typeof createTheme> | string | undefined>(undefined);
export const useTheme = () => useContext(themeContext);

const rootRefContext = createContext<React.RefObject<HTMLElement>>({ current: null });
export const useFxtrotRootRef = () => useContext(rootRefContext);

const ThemeWrapper = styled('span', {
  display: 'contents',
  color: '$onBackground',
  fontFamily: '$default',
  fontSize: '$md',
  boxSizing: 'border-box',
});
