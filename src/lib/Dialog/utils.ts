import { createContext, useContext } from 'react';
import type { useUIDSeed } from 'react-uid';

const dialogContext = createContext<DialogContext>({
  seed: () => {},
} as any);

export interface DialogContext {
  seed: ReturnType<typeof useUIDSeed>;
  render: (close: () => void) => React.ReactNode;
}

export function useDialog() {
  return useContext(dialogContext);
}

export const DialogProvider = dialogContext.Provider;
