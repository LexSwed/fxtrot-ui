import React, { createContext, useContext, useMemo } from 'react';
import { IdProvider } from '@radix-ui/react-id';

import { stitchesConfig, styled } from '../stitches.config';
import { Reset } from './Reset';
import { themes, createNewTheme, DefinedThemes, ShortDefinition, Swatch } from './themes';

type Props = {
  theme?: DefinedThemes | ShortDefinition | Swatch;
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

const ThemeProvider: React.FC<Props> = ({ theme, children }) => {
  const { themeClassName: contextTheme } = useContext(themeContext);

  const themeClass = useMemo(() => {
    if (!theme) return null;
    if (isShortDefinition(theme)) {
      return stitchesConfig.theme(createNewTheme(theme));
    } else if (isFullSwatch(theme)) {
      return stitchesConfig.theme(theme);
    }

    return stitchesConfig.theme(themes[theme]);
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

export default ThemeProvider;

export const useTheme = () => useContext(themeContext);

function isShortDefinition(theme: Props['theme']): theme is ShortDefinition {
  return typeof theme === 'object' && !!(theme as ShortDefinition)?.primary;
}

function isFullSwatch(theme: Props['theme']): theme is Swatch {
  return typeof theme === 'object' && !!(theme as Swatch)?.colors?.text;
}
