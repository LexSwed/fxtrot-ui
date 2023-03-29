import { createContext, useContext, useMemo, useState, useImperativeHandle, forwardRef, type ReactNode } from 'react';

const openStateContext = createContext(false);
const openStateControlsContext = createContext<MenuControlFunctions>({} as MenuControlFunctions);

export interface OpenStateRef extends MenuControlFunctions {}

export const OpenStateProvider = forwardRef<OpenStateRef, { defaultOpen?: boolean; children?: ReactNode }>(
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
      <openStateControlsContext.Provider value={controls}>
        <openStateContext.Provider value={isOpen}>{children}</openStateContext.Provider>
      </openStateControlsContext.Provider>
    );
  }
);

OpenStateProvider.displayName = 'OpenStateProvider';

export function useOpenState() {
  return useContext(openStateContext);
}
export function useOpenStateControls() {
  return useContext(openStateControlsContext);
}
interface MenuControlFunctions {
  open: () => void;
  close: () => void;
  toggle: () => void;
  switch: (value: boolean) => void;
}
