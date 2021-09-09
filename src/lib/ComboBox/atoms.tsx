import { Provider, atom, useAtom } from 'jotai';
import React from 'react';

import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { useEffect } from 'react';

const innerValue = atom<string | null>(null);
const fxtrotScope = Symbol('Combobox scope');

interface SyncedValue {
  (propValue?: string | null, propOnChange?: (newValue: string | null) => void): readonly [
    value: string | null,
    setValue: (newValue: string | null) => void
  ];
}
export const useSyncValue: SyncedValue = (propValue, onChange = () => {}) => {
  const [value, setValue] = useAtom(innerValue, fxtrotScope);

  useEffect(() => {
    if (typeof propValue !== 'undefined') {
      setValue(propValue);
    }
  }, [propValue, setValue]);

  if (typeof propValue !== 'undefined') {
    return [propValue, onChange] as const;
  }

  return [value, setValue] as const;
};

const focusedItemId = atom<string | null>(null);
export const useFocusedItemId = () => useAtom(focusedItemId, fxtrotScope);
export const useItemSelected = (value: string) => value === useAtomValue(innerValue, fxtrotScope);
export const useItemFocused = (id: string) => id === useAtomValue(focusedItemId, fxtrotScope);
export const useFocusItem = () => useUpdateAtom(focusedItemId, fxtrotScope);

export const StateProvider: React.FC = ({ children }) => {
  return <Provider scope={fxtrotScope}>{children}</Provider>;
};
