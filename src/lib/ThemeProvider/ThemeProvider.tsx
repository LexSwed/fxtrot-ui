import React, { createContext, useContext, useMemo, useRef } from 'react';

import { stitchesConfig, styled } from '../stitches.config';
import { Reset } from './Reset';

type Props = {
  theme?: typeof stitchesConfig.theme;
};

export const ThemeProvider: React.FC<Props> = ({ theme, children }) => {
  const { themeClassName: contextTheme } = useContext(themeContext);
  const rootRef = useFxtrotRootRef();
  const ref = useRef<HTMLDivElement>(null);
  const themeClass = useMemo(() => (theme ? stitchesConfig.createTheme(theme) : undefined), [theme]);
  const className = themeClass || contextTheme;

  const value = useMemo(() => ({ themeClassName: className }), [className]);

  if (!className) {
    return <>{children}</>;
  }

  return (
    <rootRefContext.Provider value={rootRef.current ? rootRef : ref}>
      <themeContext.Provider value={value}>
        <ThemeWrapper className={className} ref={ref}>
          {children}
        </ThemeWrapper>
      </themeContext.Provider>
      <Reset />
    </rootRefContext.Provider>
  );
};

const Provider = () => {
  return (
    <ThemeProvider
      theme={{
        colors: {
          surface: '#fff',
        },
      }}
    >
      child
    </ThemeProvider>
  );
};

interface ThemeContext {
  themeClassName?: string;
}

const themeContext = createContext<ThemeContext>({});
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
