import React from 'react';

type PossibleRef<T> = React.Ref<T> | ((instance: T | null) => void) | null | undefined;

/**
 * https://react-hooks.org/docs/use-fork-ref
 */
export function useForkRef<T = unknown>(...refs: Array<PossibleRef<T>>) {
  return React.useMemo(() => {
    if (!refs.some(Boolean)) return;

    return (value: T | null) => {
      refs.forEach((ref) => setRef<T>(ref, value));
    };
  }, refs); // eslint-disable-line react-hooks/exhaustive-deps
}

function setRef<T = unknown>(ref: PossibleRef<T>, value: T | null) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (typeof ref === 'object' && ref !== null) {
    (ref as any).current = value;
  }
}
