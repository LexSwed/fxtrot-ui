import React, { useContext, createContext, useEffect, useMemo, useRef, useCallback, useState } from 'react';
import { Options, createPopper, Instance, VirtualElement } from '@popperjs/core';
import { useUIDSeed } from 'react-uid';

type MenuStaticContextValue = ReturnType<typeof usePopper> & {
  seed: ReturnType<typeof useUIDSeed>;
};

const menuContext = createContext<MenuStaticContextValue>({} as any);
const menuStateContext = createContext<{ isOpen: boolean } & ReturnType<typeof useOpenState>[1]>({} as any);

const options: Options = {
  placement: 'bottom-start',
  strategy: 'fixed',
  modifiers: [
    { name: 'offset', options: { offset: [0, 8] } },
    {
      name: 'minWidth',
      enabled: true,
      phase: 'beforeWrite',
      requires: ['computeStyles'],
      fn({ state }) {
        const { width } = state.rects.reference;
        state.styles.popper.minWidth = `${width}px`;
      },
      effect({ state }) {
        const { width } = state.elements.reference.getBoundingClientRect();
        state.elements.popper.style.minWidth = `${width}px`;
      },
    },
  ],
};
export const MenuProvider: React.FC = ({ children }) => {
  const seed = useUIDSeed();
  const refs = usePopper(options);

  const value = useMemo(
    () => ({
      ...refs,
      seed,
    }),
    [refs, seed]
  );

  return (
    <menuContext.Provider value={value}>
      <MenuStateProvider>{children}</MenuStateProvider>
    </menuContext.Provider>
  );
};

export const MenuStateProvider: React.FC = ({ children }) => {
  const [isOpen, controls] = useOpenState();

  return (
    <menuStateContext.Provider
      value={{
        isOpen,
        ...controls,
      }}
    >
      {children}
    </menuStateContext.Provider>
  );
};

export function useMenu() {
  return useContext(menuContext);
}

export function useMenuState() {
  return useContext(menuStateContext);
}

function usePopper(
  options?: Partial<Options>
): { triggerRef: React.RefObject<Element | VirtualElement>; popoverRef: React.RefObject<HTMLElement> } {
  const triggerRef = useRef<Element | VirtualElement>(null);
  const popoverRef = useRef<HTMLElement>(null);
  const popperInstanceRef = useRef<Instance>();

  const instantiatePopper = useCallback(() => {
    if (!triggerRef.current || !popoverRef.current) return;

    popperInstanceRef.current?.destroy();
    popperInstanceRef.current = createPopper(triggerRef.current, popoverRef.current, options);
  }, [options]);

  useEffect(() => {
    return () => {
      popperInstanceRef.current?.destroy();
    };
  }, []);

  return useMemo(() => {
    return {
      triggerRef: {
        get current() {
          return triggerRef.current;
        },
        set current(node) {
          (triggerRef as React.MutableRefObject<any>).current = node;
          instantiatePopper();
        },
      },
      popoverRef: {
        get current() {
          return popoverRef.current;
        },
        set current(node) {
          (popoverRef as React.MutableRefObject<any>).current = node;
          instantiatePopper();
        },
      },
    };
  }, [triggerRef, popoverRef, instantiatePopper]);
}

function useOpenState(): [
  isOpen: boolean,
  controls: {
    open: () => void;
    close: () => void;
    toggle: () => void;
  }
] {
  const [isOpen, setOpen] = useState(false);

  const controls = useMemo(
    () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
      toggle: () => setOpen((open) => !open),
    }),
    []
  );

  return [isOpen, controls];
}
