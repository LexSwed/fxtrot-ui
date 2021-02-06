import { atom, useAtom } from 'jotai';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { useEffect } from 'react';

const innerValue = atom<string | null>(null);
interface SyncedValue {
  (propValue?: string | null, propOnChange?: (newValue: string | null) => void): readonly [
    value: string | null,
    setValue: (newValue: string | null) => void
  ];
}
export const useSyncValue: SyncedValue = (propValue, onChange = () => {}) => {
  const [value, setValue] = useAtom(innerValue);

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
export const useFocusedItemId = () => useAtom(focusedItemId);
export const useItemSelected = (value: string) => value === useAtomValue(innerValue);
export const useItemFocused = (id: string) => id === useAtomValue(focusedItemId);
export const useFocusItem = () => {
  return useUpdateAtom(focusedItemId);
};
