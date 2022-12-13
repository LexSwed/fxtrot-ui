import {
  ComponentProps,
  createContext,
  forwardRef,
  ReactNode,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Direction, DirectionProvider } from '@radix-ui/react-direction';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { clsx } from 'clsx';

import { useForkRef, useId, useIsomorphicLayoutEffect } from '../utils/hooks';
import type { Theme } from './theme';
import { createThemeColors } from './theme/utils.cjs';

import styles from './theme-provider.module.css';

type Props = {
  children?: ReactNode;
  theme?: Theme;
} & ComponentProps<'div'>;

const ThemeProvider = forwardRef<HTMLDivElement, Props>(({ theme, ...props }, propRef) => {
  const rootRef = useFxtrotRootRef();
  const ref = useRef<HTMLDivElement>(null);
  const [direction, directionRef] = useDirection();
  const refs = useForkRef<HTMLElement>(ref, directionRef, propRef);
  const className = `fxtrot-ui-${useId().slice(1, -1)}`;

  useIsomorphicLayoutEffect(() => {
    if (!theme) return;
    const sheet = new CSSStyleSheet();
    const colors = createThemeColors(theme!.colors);
    sheet.replaceSync(
      `.${className} { ${Object.entries(colors)
        .map((pair) => pair.join(': '))
        .join(';')} }`
    );
    document.adoptedStyleSheets.push(sheet);
  }, []);

  return (
    <rootRefContext.Provider value={rootRef.current ? rootRef : ref}>
      <DirectionProvider dir={direction}>
        <TooltipProvider delayDuration={400}>
          <div {...props} className={clsx(styles['fxtrot-ui-theme'], className, props.className)} ref={refs} />
        </TooltipProvider>
      </DirectionProvider>
    </rootRefContext.Provider>
  );
});

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
