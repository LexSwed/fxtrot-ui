import React, { createContext, useContext, useMemo } from 'react';

import { stitchesConfig, styled } from '../stitches.config';
import { Reset } from './Reset';
import { themes, createNewTheme, DefinedThemes, ShortDefinition, Swatch } from './themes';

type Props = {
  theme?: DefinedThemes | ShortDefinition | Swatch;
};

const themeContext = createContext<string | null>(null);

const ThemeWrapper = styled('span', {
  display: 'contents',
});

const ThemeProvider: React.FC<Props> = ({ theme, children }) => {
  const contextTheme = useContext(themeContext);

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

  if (!className) {
    return <>{children}</>;
  }

  return (
    <>
      <themeContext.Provider value={className}>
        <ThemeWrapper className={className}>{children}</ThemeWrapper>
      </themeContext.Provider>
      <Reset />
    </>
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
