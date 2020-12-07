import React, { createContext, useContext } from 'react';

export interface FocusControls {
  focus: (newId: string) => void;
  focusNext: () => void;
  focusPrev: () => void;
}

export interface RenderedItems {
  [value: string]: {
    id: string;
    value: string;
    label: string;
    selected: boolean;
  };
}

export interface ComboBoxContext {
  inputRef: React.RefObject<HTMLInputElement>;
  selectedItemValue?: string;
  focusedItemId?: string;
  onChange?: (newValue: string | undefined | null) => void;
  renderedItems: RenderedItems;
  focusControls: FocusControls;
}

const context = createContext<ComboBoxContext>({
  inputRef: { current: null },
  renderedItems: {},
  focusControls: {
    focus: () => {},
    focusNext: () => {},
    focusPrev: () => {},
  },
});

export const ComboBoxProvider = context.Provider;

export const useComboBox = () => useContext(context);
