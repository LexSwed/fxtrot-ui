import React, { createContext, useContext, useMemo, useRef } from 'react';

import { stitchesConfig, styled } from '../stitches.config';
import { Reset } from './Reset';
import { themes, createNewTheme, DefinedThemes, ShortDefinition, ThemeColors } from '../theme/creator';

type Props = {
  theme?: DefinedThemes | ShortDefinition | ThemeColors;
};

export const ThemeProvider: React.FC<Props> = ({ theme, children }) => {
  const { themeClassName: contextTheme } = useContext(themeContext);
  const ref = useRef<HTMLDivElement>(null);

  const themeClass = useMemo(() => {
    if (!theme) return null;
    if (isShortDefinition(theme)) {
      return stitchesConfig.createTheme(createNewTheme(theme) as any);
    } else if (isFullTheme(theme)) {
      return stitchesConfig.createTheme(theme as any);
    }

    return stitchesConfig.createTheme(themes[theme] as any);
  }, [theme]);
  const className = themeClass || contextTheme;

  const value = useMemo(() => ({ themeClassName: className }), [className]);

  if (!className) {
    return <>{children}</>;
  }

  return (
    <>
      <rootRefContext.Provider value={ref}>
        <themeContext.Provider value={value}>
          <ThemeWrapper className={className} ref={ref}>
            {children}
          </ThemeWrapper>
        </themeContext.Provider>
      </rootRefContext.Provider>
      <Reset />
    </>
  );
};

interface ThemeContext {
  themeClassName?: string;
}

const themeContext = createContext<ThemeContext>({});

const ThemeWrapper = styled('span', {
  display: 'contents',
  color: '$text',
  fontFamily: '$default',
  fontSize: '$md',
  boxSizing: 'border-box',
});

export const useTheme = () => useContext(themeContext);

function isShortDefinition(theme: Props['theme']): theme is ShortDefinition {
  return typeof theme === 'object' && 'primary' in theme;
}

function isFullTheme(theme: Props['theme']): theme is ThemeColors {
  return typeof theme === 'object' && 'colors' in theme;
}

const rootRefContext = createContext<React.RefObject<HTMLDivElement>>({ current: null });

export const useRootElementRef = () => useContext(rootRefContext);
