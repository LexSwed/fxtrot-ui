import React, { createContext, useContext, useMemo } from 'react';
import Box from '../Box';
import { themes } from '../theme/themes';
import { css, styled } from '../stitches.config';
import { Swatch, ColorName } from '../theme/colors';

type Props = {
  theme?: ColorName | Swatch;
};

const themeContext = createContext<string | null>(null);

const ThemeWrapper = styled(Box, {
  display: 'contents',
});

const ThemeProvider: React.FC<Props> = ({ theme, children }) => {
  const contextTheme = useContext(themeContext);

  const themeClass = useMemo(() => {
    if (typeof theme === 'object') {
      return css.theme(theme as Swatch);
    }

    return themes[theme as ColorName];
  }, [theme]);

  const className = themeClass || contextTheme;

  if (!className) {
    return <>{children}</>;
  }

  return (
    <themeContext.Provider value={className}>
      <ThemeWrapper className={className} as="span">
        {children}
      </ThemeWrapper>
    </themeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => useContext(themeContext);
