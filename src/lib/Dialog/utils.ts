import { createContext, useContext } from 'react';
import { useUIDSeed } from 'react-uid';

const dialogContext = createContext<DialogContext>({
  seed: null,
} as any);

export type DialogContext = {
  seed: ReturnType<typeof useUIDSeed>;
  render: (close: () => void) => React.ReactNode;
};

export function useDialog() {
  return useContext(dialogContext);
}

export const DialogProvider = dialogContext.Provider;
