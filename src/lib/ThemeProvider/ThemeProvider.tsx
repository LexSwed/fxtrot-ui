import React, { createContext, useContext, useMemo } from 'react';
import { IdProvider } from '@radix-ui/react-id';

import { stitchesConfig, styled } from '../stitches.config';
import { Reset } from './Reset';
import { themes, createNewTheme, DefinedThemes, ShortDefinition, ThemeColors } from '../theme/creator';

type Props = {
  theme?: DefinedThemes | ShortDefinition | ThemeColors;
};

export const ThemeProvider: React.FC<Props> = ({ theme, children }) => {
  const { themeClassName: contextTheme } = useContext(themeContext);

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
    <IdProvider>
      <>
        <themeContext.Provider value={value}>
          <ThemeWrapper className={className}>{children}</ThemeWrapper>
        </themeContext.Provider>
        <Reset />
      </>
    </IdProvider>
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
