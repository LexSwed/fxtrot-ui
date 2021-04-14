import React, { createContext, useContext, useMemo, useRef } from 'react';

import { stitchesConfig, styled } from '../stitches.config';
import { Reset } from './Reset';
import { themes, createNewTheme, DefinedThemes, ShortDefinition, Swatch } from './themes';

type Props = {
  theme?: DefinedThemes | ShortDefinition | Swatch;
};

interface ThemeContext {
  themeClassName?: string;
  ref?: React.RefObject<HTMLDivElement>;
}

const themeContext = createContext<ThemeContext>({});

const ThemeWrapper = styled('span', {
  display: 'contents',
  color: '$text',
});

const ThemeProvider: React.FC<Props> = ({ theme, children }) => {
  const { themeClassName: contextTheme, ref: contextRef } = useContext(themeContext);
  const innerRef = useRef<HTMLDivElement>(null);

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

  const value = useMemo(() => ({ themeClassName: className, ref: contextRef || innerRef }), [className, contextRef]);

  if (!className) {
    return <>{children}</>;
  }

  return (
    <>
      <themeContext.Provider value={value}>
        <ThemeWrapper className={className} ref={contextRef ? undefined : innerRef}>
          {children}
        </ThemeWrapper>
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
