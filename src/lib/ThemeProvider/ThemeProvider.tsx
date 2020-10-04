import React, { createContext, useContext, useMemo } from 'react';
import Box from '../Box';
import { themes } from '../theme/themes';
import { css } from '../stitches.config';
import { Swatch } from '../theme/colors';

type ThemeName = keyof typeof themes;

type Props = {
  theme?: ThemeName | Swatch;
};

const themeContext = createContext<Props['theme']>('blue');

const styles = {
  display: 'contents',
};

const ThemeProvider: React.FC<Props> = ({ theme, children }) => {
  const contextTheme = useContext(themeContext);

  const themeClass = useMemo(() => {
    if (typeof theme === 'object') {
      return css.theme(theme as Swatch);
    }

    return themes[(theme as ThemeName) || (contextTheme as ThemeName)];
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
