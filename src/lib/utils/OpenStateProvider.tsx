import React, { useContext, createContext, useMemo, useState } from 'react';

const menuStateContext = createContext(false);
const menuStateControlsContext = createContext<ReturnType<typeof useTogglesState>[1]>({} as any);

export const OpenStateProvider: React.FC = ({ children }) => {
  const [isOpen, controls] = useTogglesState();

  return (
    <menuStateControlsContext.Provider value={controls}>
      <menuStateContext.Provider value={isOpen}>{children}</menuStateContext.Provider>
    </menuStateControlsContext.Provider>
  );
};

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

function useTogglesState(): [isOpen: boolean, controls: MenuControlFunctions] {
  const [isOpen, setOpen] = useState(false);

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
