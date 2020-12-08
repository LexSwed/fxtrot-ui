import React, { createContext,useContext } from 'react';
import { useUIDSeed } from 'react-uid';

type MenuStaticContextValue = {
  triggerRef: React.RefObject<HTMLElement>;
  seed: ReturnType<typeof useUIDSeed>;
  onAction?: (key: string) => void;
};

const menuContext = createContext<MenuStaticContextValue>({} as any);

menuContext.displayName = 'MenuContext';

export const MenuProvider = menuContext.Provider;

export function useMenu() {
  return useContext(menuContext);
}
