import React, { createContext, useContext, useMemo, useState, useImperativeHandle } from 'react';

const menuStateContext = createContext(false);
const menuStateControlsContext = createContext<MenuControlFunctions>({} as MenuControlFunctions);

export interface OpenStateRef extends MenuControlFunctions {}

export const OpenStateProvider = React.forwardRef<OpenStateRef, { defaultOpen?: boolean; children?: React.ReactNode }>(
  ({ children, defaultOpen }, ref) => {
    const [isOpen, controls] = useToggleState({ defaultOpen }, ref);

    useImperativeHandle(ref, () => controls, [controls]);

    return (
      <menuStateControlsContext.Provider value={controls}>
        <menuStateContext.Provider value={isOpen}>{children}</menuStateContext.Provider>
      </menuStateControlsContext.Provider>
    );
  }
);

export function useToggleState({ defaultOpen }: { defaultOpen?: boolean }, ref: React.ForwardedRef<OpenStateRef>) {
  const handles = useBooleanState(defaultOpen);
  const controls = handles[1];

  useImperativeHandle(ref, () => controls, [controls]);

  return handles;
}

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
function useBooleanState(defaultOpen = false): [isOpen: boolean, controls: MenuControlFunctions] {
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
      switch: (value) => {
        setOpen(value);
      },
    }),
    []
  );
  return [isOpen, controls];
}
