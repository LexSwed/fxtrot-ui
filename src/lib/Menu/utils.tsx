import React, { useContext, createContext, useEffect, useMemo, useRef, useCallback, useState } from 'react';
import { Options, createPopper, Instance, VirtualElement } from '@popperjs/core';
import { useUIDSeed } from 'react-uid';

type MenuStaticContextValue = {
  triggerRef: React.RefObject<HTMLElement>;
  popoverRef: React.RefObject<HTMLElement>;
  seed: ReturnType<typeof useUIDSeed>;
  onAction?: (key: string) => void;
};

const menuContext = createContext<MenuStaticContextValue>({} as any);

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

export const MenuProvider: React.FC<{
  onAction?: (key: string) => void;
}> = ({ children, onAction }) => {
  const seed = useUIDSeed();
  const triggerRef = useRef<HTMLElement>(null);
  const popoverRef = usePopper(triggerRef, options);

  const menuContextValue = useMemo(
    () => ({
      triggerRef,
      popoverRef,
      seed,
      onAction,
    }),
    [triggerRef, popoverRef, seed, onAction]
  );

  return (
    <menuContext.Provider value={menuContextValue}>
      <MenuStateProvider>
        <>{children}</>
      </MenuStateProvider>
    </menuContext.Provider>
  );
};

const menuStateContext = createContext(false);
const menuStateControlsContext = createContext<ReturnType<typeof useOpenState>[1]>({} as any);

export const MenuStateProvider: React.FC = ({ children }) => {
  const [isOpen, controls] = useOpenState();

  return (
    <menuStateControlsContext.Provider value={controls}>
      <menuStateContext.Provider value={isOpen}>{children}</menuStateContext.Provider>
    </menuStateControlsContext.Provider>
  );
};

export function useMenu() {
  return useContext(menuContext);
}

export function useMenuOpenState() {
  return useContext(menuStateContext);
}

export function useMenuControlState() {
  return useContext(menuStateControlsContext);
}

function usePopper(
  triggerRef: React.RefObject<Element | VirtualElement>,
  options?: Partial<Options>
): React.RefObject<HTMLElement> {
  const popoverRef = useRef<HTMLElement>(null);
  const popperInstanceRef = useRef<Instance>();

  const instantiatePopper = useCallback(() => {
    if (!triggerRef.current || !popoverRef.current) return;

    popperInstanceRef.current?.destroy();
    popperInstanceRef.current = createPopper(triggerRef.current, popoverRef.current, options);
  }, [triggerRef, options]);

  useEffect(() => {
    return () => {
      popperInstanceRef.current?.destroy();
    };
  }, []);

  return useMemo(() => {
    return {
      get current() {
        return popoverRef.current;
      },
      set current(node) {
        (popoverRef as React.MutableRefObject<any>).current = node;
        instantiatePopper();
      },
    };
  }, [popoverRef, instantiatePopper]);
}

type InternalState = { lastKey: string | null; items: Map<HTMLLIElement, { action: string }> };
type MenuControlFunctions = {
  stateRef: {
    readonly current: InternalState;
  };
  open: () => void;
  close: () => void;
  toggle: () => void;
  update: (state?: Partial<InternalState>) => void;
};
const initialState: InternalState = { lastKey: null, items: new Map() };
function useOpenState(): [isOpen: boolean, controls: MenuControlFunctions] {
  const [isOpen, setOpen] = useState(false);
  const internalStateRef = useRef<InternalState>(initialState);

  const controls = useMemo<MenuControlFunctions>(
    () => ({
      stateRef: internalStateRef,
      open: () => {
        setOpen(true);
      },
      close: () => {
        internalStateRef.current = initialState;
        setOpen(false);
      },
      toggle: () => {
        setOpen((open) => {
          if (open) {
            internalStateRef.current = initialState;
          }
          return !open;
        });
      },
      update: (state) => {
        internalStateRef.current = {
          ...internalStateRef.current,
          ...state,
        };
      },
    }),
    []
  );

  return [isOpen, controls];
}
