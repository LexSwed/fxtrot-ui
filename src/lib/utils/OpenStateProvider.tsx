import { atom, useAtom, WritableAtom, SetStateAction } from 'jotai';
import React, { createContext, useContext, useMemo, useState, useImperativeHandle } from 'react';

const menuStateContext = createContext(false);
const menuStateControlsContext = createContext<MenuControlFunctions>({} as MenuControlFunctions);

export interface OpenStateRef extends MenuControlFunctions {}

export const OpenStateProvider = React.forwardRef<OpenStateRef, { defaultOpen?: boolean; children?: React.ReactNode }>(
  ({ children, defaultOpen }, ref) => {
    const [isOpen, controls] = useBooleanState({ defaultOpen }, ref);

    useImperativeHandle(ref, () => controls, [controls]);

    return (
      <menuStateControlsContext.Provider value={controls}>
        <menuStateContext.Provider value={isOpen}>{children}</menuStateContext.Provider>
      </menuStateControlsContext.Provider>
    );
  }
);

const defaultAtom = atom<boolean | undefined>(false);
const openStateAtomContext = createContext<typeof defaultAtom>(defaultAtom);
export const ToggleStateScope: React.FC<{ atom: typeof defaultAtom }> = ({ children, atom }) => {
  return <openStateAtomContext.Provider value={atom}>{children}</openStateAtomContext.Provider>;
};

export function useToggleState({ defaultOpen }: { defaultOpen?: boolean }, ref: React.ForwardedRef<OpenStateRef>) {
  const [openStateAtom] = useState(() => atom(defaultOpen));
  const [isOpen, setOpen] = useAtom(openStateAtom);

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
    [setOpen]
  );

  useImperativeHandle(ref, () => controls, [controls]);

  return [isOpen, controls, openStateAtom] as const;
}
export function useToggleStateAtom() {
  return useAtom(useContext(openStateAtomContext));
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
