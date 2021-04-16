import { atom, Provider } from 'jotai';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import React, { useMemo, useImperativeHandle } from 'react';

export interface OpenStateRef {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const openStateAtom = atom(false);
openStateAtom.scope = Symbol('OpenState');

export const OpenStateProvider = React.forwardRef<OpenStateRef, { defaultOpen?: boolean; children?: React.ReactNode }>(
  ({ defaultOpen, children }, ref) => {
    const controls = useOpenStateControls();

    useImperativeHandle(ref, () => controls, [controls]);

    return (
      <Provider initialValues={[[openStateAtom, defaultOpen]]} scope={openStateAtom.scope}>
        {children}
      </Provider>
    );
  }
);

export function useOpenState() {
  return useAtomValue(openStateAtom);
}

interface MenuControlFunctions {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export function useOpenStateControls(): MenuControlFunctions {
  const setOpen = useUpdateAtom(openStateAtom);

  return useMemo<MenuControlFunctions>(
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
    [setOpen]
  );
}
