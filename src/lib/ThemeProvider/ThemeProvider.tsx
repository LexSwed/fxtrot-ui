import React from 'react';
import Box from '../Box';
import { themes } from '../theme/themes';

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

function joinNonEmpty(...strings: Array<string | undefined>) {
  return strings.filter(Boolean).join(' ');
}
