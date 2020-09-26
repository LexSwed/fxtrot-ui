import React from 'react';
import Box from '../Box';
import { themes } from '../theme/themes';
import { joinNonEmpty } from '../utils';

type Props = {
  theme: keyof typeof themes;
};

const ThemeProvider: React.FC<Props> = ({ theme, children }) => {
  const themeClass = theme in themes ? themes[theme] : theme;
  return (
    <>
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? (
          React.cloneElement(child, { className: joinNonEmpty(child.props.className, themeClass) })
        ) : (
          <Box className={themeClass} as="span">
            {child}
          </Box>
        )
      )}
    </>
  );
};

export default ThemeProvider;
