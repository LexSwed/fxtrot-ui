import React, { createContext, useContext, useMemo } from 'react';
import Box from '../Box';
import { themes, Swatch } from '../theme/themes';
import { css } from '../stitches.config';

type ThemeName = keyof typeof themes;

type Props = {
  theme?: ThemeName | Swatch;
};

const themeContext = createContext<Props['theme']>('blue');

const styles = {
  display: 'contents',
};

const ThemeProvider: React.FC<Props> = ({ theme = 'blue', children }) => {
  const contextTheme = useContext(themeContext);
  const themeClass = useMemo(() => {
    if (typeof theme === 'string') {
      return themes[(theme as ThemeName) || (contextTheme as ThemeName)];
    }

    return css.theme(theme);
  }, [contextTheme, theme]);

  if (!themeClass) {
    return <>{children}</>;
  }

  return (
    <themeContext.Provider value={theme}>
      <Box className={themeClass} css={styles} as="span">
        {children}
      </Box>
    </themeContext.Provider>
  );
};

export default ThemeProvider;
