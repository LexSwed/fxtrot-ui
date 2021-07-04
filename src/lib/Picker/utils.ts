import { createContext, useContext } from 'react';
import type { ItemProps } from '../Item/Item';

export interface PickerContext {
  value?: string;
  onChange?: (newValue: string) => void;
  size?: ItemProps['size'];
}

const context = createContext({} as PickerContext);

export const PickerProvider = context.Provider;

export const usePicker = () => useContext(context);
