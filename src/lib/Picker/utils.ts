import { createContext, useContext } from 'react';

interface PickerContext {
  value?: string;
  onChange?: (newValue: string) => void;
}

const context = createContext({} as PickerContext);

export const PickerProvider = context.Provider;

export const usePicker = () => useContext(context);
