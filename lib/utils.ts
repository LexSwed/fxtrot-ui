import React from 'react';

/**
 * https://react-hooks.org/docs/use-fork-ref
 */
export function useForkRef<T>(...refs: Array<React.Ref<T>>) {
  return React.useMemo(() => {
    if (!refs.some(Boolean)) return;

    return (value: any) => {
      refs.forEach((ref) => setRef(ref, value));
    };
  }, refs); // eslint-disable-line react-hooks/exhaustive-deps
}

function setRef<T = any>(
  ref: React.MutableRefObject<T> | ((instance: T | null) => void) | null | undefined,
  value: T | null
) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (typeof ref === 'object' && ref !== null) {
    ref.current = value;
  }
}
