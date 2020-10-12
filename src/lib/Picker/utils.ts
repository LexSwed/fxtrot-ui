import React, { createContext, useContext } from 'react';

type PickerContext = {
  triggerRef: React.RefObject<HTMLButtonElement>;
  value?: string;
  onChange?: (newValue: string) => void;
};

const context = createContext({} as PickerContext);

export const PickerProvider = context.Provider;

export const usePicker = () => useContext(context);