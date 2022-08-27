import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Direction, DirectionProvider } from '@radix-ui/react-direction';
import { TooltipProvider } from '@radix-ui/react-tooltip';

import { createTheme, styled } from '../stitches.config';
import { createColorVariations } from '../theme/createColorVariations';
import type { ThemeColors } from '../theme/default';
import { useForkRef } from '../utils/hooks';
import { Reset } from './Reset';

type Props = {
  theme?: Parameters<typeof createTheme>[0];
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'className'>;

export const ThemeProvider = React.forwardRef<HTMLDivElement, Props>(({ theme, ...props }, propRef) => {
  const contextTheme = useContext(themeContext);
  const rootRef = useFxtrotRootRef();
  const ref = useRef<HTMLDivElement>(null);
  const [direction, directionRef] = useDirection();
  const refs = useForkRef<HTMLElement>(ref, directionRef, propRef);
  const stitchesTheme = useMemo(() => {
    if (typeof theme === 'string') {
      return theme;
    }
    if (typeof theme === 'object') {
      return createTheme({
        ...(theme as any),
        colors: {
          ...createColorVariations(theme.colors as ThemeColors),
        },
      });
    }
    return undefined;
  }, [theme]);
  const themeValue = stitchesTheme || contextTheme;

  return (
    <rootRefContext.Provider value={rootRef.current ? rootRef : ref}>
      <themeContext.Provider value={themeValue}>
        <DirectionProvider dir={direction}>
          <TooltipProvider delayDuration={400}>
            <ThemeWrapper {...props} className={themeValue} ref={refs} />
          </TooltipProvider>
        </DirectionProvider>
      </themeContext.Provider>
      <Reset />
    </rootRefContext.Provider>
  );
});

/**
 * Allows to retrieve closest theme from context for portalled items,
 * rendered outside of initial themed DOM element
 */
const themeContext = createContext<ReturnType<typeof createTheme> | string | undefined>(undefined);
export const useTheme = () => useContext(themeContext);

const rootRefContext = createContext<React.RefObject<HTMLElement>>({ current: null });
export const useFxtrotRootRef = () => useContext(rootRefContext);

const ThemeWrapper = styled('span', {
  display: 'contents',
  color: '$onBackground',
  fontFamily: '$default',
  fontSize: '$md',
  boxSizing: 'border-box',
});

export const ContextThemeProvider = React.forwardRef<HTMLDivElement, Omit<Props, 'theme'>>((props, ref) => {
  const contextTheme = useContext(themeContext);
  return <ThemeWrapper {...props} className={contextTheme} ref={ref} />;
});

function useDirection() {
  const [element, ref] = useState<HTMLElement | null>(null);
  const [direction, setDirection] = useState<Direction>('ltr');
  useEffect(() => {
    if (!element) {
      return;
    }
    const el = window.getComputedStyle(element);
    setDirection(el.direction as Direction);
  }, [element]);
  return [direction, ref] as const;
}
