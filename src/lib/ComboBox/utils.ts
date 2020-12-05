import React, { createContext, useContext } from 'react';

type ComboBoxContext = {
  triggerRef: React.RefObject<HTMLInputElement>;
  value?: string;
  onChange?: (newValue: string) => void;
};

const context = createContext({
  triggerRef: { current: null },
} as ComboBoxContext);

export const ComboBoxProvider = context.Provider;

export const useComboBox = () => useContext(context);
