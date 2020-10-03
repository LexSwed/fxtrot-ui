import React, { createContext, useContext } from 'react';
import Box from '../Box';
import { themes } from '../theme/themes';

type Theme = keyof typeof themes;

type Props = {
  theme?: Theme;
};

const themeContext = createContext<Props['theme']>('default');

const ThemeProvider: React.FC<Props> = ({ theme, children }) => {
  const contextTheme = useContext(themeContext);
  const themeClass = themes[(theme as Theme) || (contextTheme as Theme)];

  if (!themeClass) {
    return <>{children}</>;
  }

  return (
    <themeContext.Provider value={theme}>
      <Box className={themeClass} as="span">
        {children}
      </Box>
    </themeContext.Provider>
  );
};

export default ThemeProvider;
