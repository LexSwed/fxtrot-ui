import React, { createContext, useContext } from 'react';
import { useUIDSeed } from 'react-uid';

export interface FocusControls {
  focus: (newId: string) => void;
  focusNext: () => void;
  focusPrev: () => void;
}

export interface ComboBoxContext {
  inputRef: React.RefObject<HTMLInputElement>;
  textValue: string;
  selectedItemValue?: string;
  focusedItemId?: string;
  onChange?: (newValue: string | undefined | null) => void;
  idSeed: ReturnType<typeof useUIDSeed>;
  renderedItems: Record<
    string,
    {
      id: string;
      value: string;
      label: string;
      selected: boolean;
    }
  >;
  focusControls: FocusControls;
}

const context = createContext<ComboBoxContext>({
  inputRef: { current: null },
  idSeed: () => undefined as any,
  textValue: '',
  renderedItems: {},
  focusControls: {
    focus: () => {},
    focusNext: () => {},
    focusPrev: () => {},
  },
});

export const ComboBoxProvider = context.Provider;

export const useComboBox = () => useContext(context);
