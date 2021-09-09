import React, { useCallback, useEffect, useLayoutEffect, useState, useRef } from 'react';
import { useUID } from 'react-uid';

type PossibleRef<T> = React.Ref<T> | ((instance: T | null) => void) | null | undefined;

/**
 * https://react-hooks.org/docs/use-fork-ref
 */
export function useForkRef<T extends Element>(...refs: Array<PossibleRef<T>>) {
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

export const isServer = typeof document === 'undefined';

export const useIsomorphicLayoutEffect = isServer ? useEffect : useLayoutEffect;

export const useLatest = <T>(value: T): { readonly current: T } => {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
};

export function joinNonEmpty(...strings: Array<string | undefined>) {
  return strings.filter(Boolean).join(' ');
}

export function useAllHandlers<E = React.SyntheticEvent<any, Event>>(
  ...handlers: (
    | (E extends React.SyntheticEvent<any, Event> ? React.EventHandler<E> : (...args: any[]) => void)
    | undefined
  )[]
): E extends React.SyntheticEvent<any, Event> ? React.EventHandler<E> : (...args: any[]) => void {
  const handlersRef = useRef(handlers);

  useEffect(() => {
    handlersRef.current = handlers;
  }, handlers); // eslint-disable-line react-hooks/exhaustive-deps

  return useCallback((...args: any[]) => {
    handlersRef.current.forEach((fn) => (fn as any)?.(...args));
  }, []) as E extends React.SyntheticEvent<any, Event> ? React.EventHandler<E> : (...args: any[]) => void;
}

export type KeyboardHandler = ((event: React.KeyboardEvent<any>) => void) | undefined;
export type KeyboardHandlers = {
  [Key in React.KeyboardEvent<any>['key'] | `${React.KeyboardEvent<any>['key']}.propagate`]: KeyboardHandler;
};

export function useKeyboardHandles(handlers: KeyboardHandlers): KeyboardHandler {
  const handlersRef = useRef(handlers);

  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  return useCallback<(event: React.KeyboardEvent<any>) => void>((event) => {
    const handlers = handlersRef.current;
    let handler = handlers[event.key];
    if (handler && event.currentTarget.contains(event.target)) {
      event.preventDefault();
      return handler(event);
    }
    handler = handlers[`${event.key}.propagate`];
    if (handler) {
      handler(event);
    }
  }, []);
}

const MOUSEDOWN = 'mousedown';
const TOUCHSTART = 'touchstart';
const POINTERDOWN = 'pointerdown';

type HandledEventsType = typeof TOUCHSTART | typeof MOUSEDOWN | typeof POINTERDOWN;
type PossibleEvent = {
  [Type in HandledEventsType]: HTMLElementEventMap[Type];
}[HandledEventsType];
type Handler = (event: PossibleEvent) => void;

const events: HandledEventsType[] = [MOUSEDOWN, TOUCHSTART, POINTERDOWN];

export function useOnClickOutside(handler: Handler | null, isActive: boolean, ...refs: React.RefObject<HTMLElement>[]) {
  const handlerRef = useLatest(handler);
  useEffect(() => {
    if (!isActive) {
      return;
    }
    const listener = (event: PossibleEvent) => {
      // event.target is not available in shadow DOM
      const target = event.composedPath()?.[0] as Node;
      if (refs.some((ref) => ref.current?.contains?.(target))) {
        return;
      }
      handlerRef.current?.(event);
    };

    events.forEach((event) => {
      document.addEventListener(event, listener);
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, listener);
      });
    };
  }, [handlerRef, isActive, ...refs]); //eslint-disable-line react-hooks/exhaustive-deps
}

export function useId(id?: string) {
  let newId = useUID();

  return id || newId;
}

export function useDerivedState<V extends string | string[] | number | number[]>(
  propValue?: V,
  propOnChange?: (newValue: V) => void,
  defaultValue?: V
) {
  const [value, setValue] = useState(propValue || defaultValue);
  const valueRef = useLatest(value);
  const propOnChangeRef = useLatest(propOnChange);

  const onChange = useCallback(
    (newValue: V | ((currentState: V) => V)) => {
      let updatedValue: V = typeof newValue === 'function' ? newValue(valueRef.current as any) : newValue;

      // we expect `propOnChange` to change also `value` prop, so useEffect would update internal value
      if (typeof propOnChangeRef.current === 'function') {
        propOnChangeRef.current(updatedValue);
      } else {
        setValue(updatedValue);
      }
    },
    [propOnChangeRef, valueRef]
  );

  useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  return [value, onChange] as [V, typeof onChange];
}
