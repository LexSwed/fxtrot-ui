import React, { createContext, useContext, useMemo, useRef } from 'react';

import { createTheme, styled } from '../stitches.config';
import { Reset } from './Reset';

type Props = {
  theme?: Parameters<typeof createTheme>[0];
};

export const ThemeProvider: React.FC<Props> = ({ theme, children }) => {
  const contextTheme = useContext(themeContext);
  const rootRef = useFxtrotRootRef();
  const ref = useRef<HTMLDivElement>(null);
  const stitchesTheme = useMemo(() => {
    if (typeof theme === 'string') {
      return theme;
    }
    if (typeof theme === 'object') {
      return createTheme(theme);
    }
    return undefined;
  }, [theme]);
  const themeValue = stitchesTheme || contextTheme;

  return (
    <rootRefContext.Provider value={rootRef.current ? rootRef : ref}>
      <themeContext.Provider value={themeValue}>
        <ThemeWrapper className={themeValue} ref={ref}>
          {children}
        </ThemeWrapper>
      </themeContext.Provider>
      <Reset />
    </rootRefContext.Provider>
  );
};

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
  color: '$text',
  fontFamily: '$default',
  fontSize: '$md',
  boxSizing: 'border-box',
});
