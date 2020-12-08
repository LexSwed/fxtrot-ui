import React, { createContext, useContext } from 'react';

interface PickerContext {
  triggerRef: React.RefObject<HTMLButtonElement>;
  value?: string;
  onChange?: (newValue: string) => void;
}

const context = createContext({
  triggerRef: { current: null },
} as PickerContext);

export const PickerProvider = context.Provider;

export const usePicker = () => useContext(context);
