import React, { createContext, useContext, useMemo, useState, useImperativeHandle } from 'react';

const menuStateContext = createContext(false);
const menuStateControlsContext = createContext<MenuControlFunctions>({} as MenuControlFunctions);

export interface OpenStateRef {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const OpenStateProvider = React.forwardRef<OpenStateRef, { defaultOpen?: boolean; children?: React.ReactNode }>(
  ({ defaultOpen, children }, ref) => {
    const [isOpen, controls] = useTogglesState(defaultOpen);

    useImperativeHandle(ref, () => controls, [controls]);

    return (
      <menuStateControlsContext.Provider value={controls}>
        <menuStateContext.Provider value={isOpen}>{children}</menuStateContext.Provider>
      </menuStateControlsContext.Provider>
    );
  }
);

export function useOpenState() {
  return useContext(menuStateContext);
}

export function useOpenStateControls() {
  return useContext(menuStateControlsContext);
}

interface MenuControlFunctions {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

function useTogglesState(defaultOpen = false): [isOpen: boolean, controls: MenuControlFunctions] {
  const [isOpen, setOpen] = useState(defaultOpen);

  const controls = useMemo<MenuControlFunctions>(
    () => ({
      open: () => {
        setOpen(true);
      },
      close: () => {
        setOpen(false);
      },
      toggle: () => {
        setOpen((open) => !open);
      },
    }),
    []
  );

  return [isOpen, controls];
}
