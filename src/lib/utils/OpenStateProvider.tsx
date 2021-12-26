import React, { createContext, useContext, useMemo, useState, useImperativeHandle } from 'react';

const menuStateContext = createContext(false);
const menuStateControlsContext = createContext<MenuControlFunctions>({} as MenuControlFunctions);

export interface OpenStateRef extends MenuControlFunctions {}

export const OpenStateProvider = React.forwardRef<OpenStateRef, { defaultOpen?: boolean; children?: React.ReactNode }>(
  ({ children, defaultOpen = false }, ref) => {
    const [isOpen, setOpen] = useState<boolean>(defaultOpen);
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
        switch: (value: boolean) => {
          setOpen(value);
        },
      }),
      []
    );

    useImperativeHandle(ref, () => controls, [controls]);

    return (
      <menuStateControlsContext.Provider value={controls}>
        <menuStateContext.Provider value={isOpen}>{children}</menuStateContext.Provider>
      </menuStateControlsContext.Provider>
    );
  }
);

OpenStateProvider.displayName = 'OpenStateProvider';

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
  switch: (value: boolean) => void;
}
