import React from 'react';
import Box from '../Box';
import { themes } from '../theme/themes';

type Props = {
  theme: keyof typeof themes;
};

const ThemeProvider: React.FC<Props> = ({ theme, children }) => {
  return <Box className={themes[theme]}>{children}</Box>;
};

export default ThemeProvider;
