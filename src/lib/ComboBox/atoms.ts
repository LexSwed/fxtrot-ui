import { atom, useAtom } from 'jotai';
import { useSelector, useUpdateAtom } from 'jotai/utils';
import { useCallback, useEffect } from 'react';

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

const filterText = atom('');
export const useFilterText = () => useAtom(filterText);

const focusedItemId = atom<string | null>(null);
export const useFocusedItemId = () => useAtom(focusedItemId);
export const useItemSelected = (value: string) =>
  useSelector(
    innerValue,
    useCallback((innerVal) => value === innerVal, [value])
  );
export const useItemFocused = (id: string) =>
  useSelector(
    focusedItemId,
    useCallback((focusedId) => id === focusedId, [id])
  );
export const useFocusItem = (id: string) => {
  const setFocused = useUpdateAtom(focusedItemId);

  return useCallback(() => setFocused(id), [id, setFocused]);
};
