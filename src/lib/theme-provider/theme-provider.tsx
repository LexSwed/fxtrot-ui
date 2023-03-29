import {
  type ComponentProps,
  createContext,
  forwardRef,
  type ReactNode,
  type RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { type Direction, DirectionProvider } from '@radix-ui/react-direction';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { clsx } from 'clsx';

import { useForkRef, useId } from '../utils/hooks';
import type { Theme } from './types';

import styles from './theme-provider.module.css';

import { createThemeVariables, mergeTheme } from './utils';

type Props = {
  children?: ReactNode;
  theme?: Theme;
} & ComponentProps<'div'>;

const ThemeProvider = forwardRef<HTMLDivElement, Props>(({ theme = {}, className, children, ...props }, propRef) => {
  const rootRef = useFxtrotRootRef();
  const ref = useRef<HTMLDivElement>(null);
  const [direction, directionRef] = useDirection();
  const refs = useForkRef<HTMLElement>(ref, directionRef, propRef);
  // slice :r0: -> r0
  const themeClassName = `fxtrot-ui-${useId().slice(1, -1)}`;
  const css = createThemeCssText(themeClassName, theme);

  return (
    <rootRefContext.Provider value={rootRef.current ? rootRef : ref}>
      <DirectionProvider dir={direction}>
        <TooltipProvider delayDuration={400}>
          <>
            <style dangerouslySetInnerHTML={{ __html: css }} />
            <div {...props} className={clsx(styles['fxtrot-ui-theme'], themeClassName, className)} ref={refs}>
              {children}
            </div>
          </>
        </TooltipProvider>
      </DirectionProvider>
    </rootRefContext.Provider>
  );
});

function createThemeCssText(className: string, theme: Theme) {
  const fullTheme = mergeTheme(theme);
  const css = `.${className} {${createThemeVariables(fullTheme)
    .map((entry) => entry.join(':'))
    .join(';')};}`.trim();
  return css;
}

const rootRefContext = createContext<RefObject<HTMLElement>>({ current: null });
export const useFxtrotRootRef = () => useContext(rootRefContext);

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

export { ThemeProvider };
