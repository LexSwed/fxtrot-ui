import React, { createContext, useContext, useMemo } from 'react';

import { css, styled } from '../stitches.config';
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
      return css.theme(createNewTheme(theme));
    } else if (isFullSwatch(theme)) {
      return css.theme(theme);
    }

    return css.theme(themes[theme]);
  }, [theme]);

  const className = themeClass || contextTheme;

  if (!className) {
    return <>{children}</>;
  }

  return (
    <themeContext.Provider value={className}>
      <ThemeWrapper className={className}>{children}</ThemeWrapper>
    </themeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => useContext(themeContext);

function isShortDefinition(theme: Props['theme']): theme is ShortDefinition {
  return typeof theme === 'object' && !!(theme as ShortDefinition)?.primary;
}

function isFullSwatch(theme: Props['theme']): theme is Swatch {
  return typeof theme === 'object' && !!(theme as Swatch)?.colors?.$text;
}
