import React, { createContext, useContext, useMemo, useState } from 'react';

const menuStateContext = createContext(false);
const menuStateControlsContext = createContext<ReturnType<typeof useTogglesState>[1]>({} as any);

export const OpenStateProvider: React.FC<{ defaultOpen?: boolean }> = ({ defaultOpen, children }) => {
  const [isOpen, controls] = useTogglesState(defaultOpen);

  return (
    <menuStateControlsContext.Provider value={controls}>
      <menuStateContext.Provider value={isOpen}>{children}</menuStateContext.Provider>
    </menuStateControlsContext.Provider>
  );
};

export function withOpenStateProvider<T>(Component: React.ComponentType<T>): React.ComponentType<T> {
  return React.memo((props) => (
    <OpenStateProvider>
      <Component {...props} />
    </OpenStateProvider>
  ));
}

export function useOpenState() {
  return useContext(menuStateContext);
}

export function useOpenStateControls() {
  return useContext(menuStateControlsContext);
}

type MenuControlFunctions = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

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
