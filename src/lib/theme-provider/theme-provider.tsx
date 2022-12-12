import {
  ComponentPropsWithoutRef,
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

import { useForkRef } from '../utils/hooks';

type Props = {
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<'div'>, 'className'>;

const ThemeProvider = forwardRef<HTMLDivElement, Props>((props, propRef) => {
  const rootRef = useFxtrotRootRef();
  const ref = useRef<HTMLDivElement>(null);
  const [direction, directionRef] = useDirection();
  const refs = useForkRef<HTMLElement>(ref, directionRef, propRef);

  return (
    <rootRefContext.Provider value={rootRef.current ? rootRef : ref}>
      <DirectionProvider dir={direction}>
        <TooltipProvider delayDuration={400}>
          <span {...props} ref={refs} />
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
