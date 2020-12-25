import { atom, useAtom } from 'jotai';
import { useSelector, useUpdateAtom } from 'jotai/utils';
import { useCallback, useEffect } from 'react';

const filterText = atom('');
const focusedItemId = atom<string | null>(null);
const innerValue = atom<string | null>(null);

export const useSyncValue = (propValue?: string | null, onChange?: (newValue: string | null) => void) => {
  const [value, setValue] = useAtom(innerValue);

  const handleChange = useCallback(
    (newValue: string | null) => {
      // we expect `propOnChange` to change also `value` prop, so useEffect would update internal value
      if (typeof onChange === 'function') {
        onChange(newValue);
      } else {
        setValue(newValue);
      }
    },
    [onChange, setValue]
  );

  useEffect(() => {
    if (typeof propValue !== 'undefined') {
      setValue(propValue);
    }
  }, [propValue, setValue]);

  return [value, handleChange] as const;
};

export const useFilterText = () => useAtom(filterText);

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
