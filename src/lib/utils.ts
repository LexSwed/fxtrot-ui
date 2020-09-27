import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

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

export function useAllHandlers<E extends React.SyntheticEvent<any, Event>>(
  ...handlers: (React.EventHandler<E> | undefined)[]
): React.EventHandler<E> {
  const handlersRef = useRef(handlers);

  useEffect(() => {
    handlersRef.current = handlers;
  }, handlers); // eslint-disable-line react-hooks/exhaustive-deps

  return useCallback((...args) => {
    handlersRef.current.forEach((fn) => fn?.(...args));
  }, []);
}

type KeyboardHandler = ((event: React.KeyboardEvent<any>) => void) | undefined;
type KeyboardHandlers = { [Key in React.KeyboardEvent<any>['key']]: KeyboardHandler };

export function useKeyboardHandles(handlers: KeyboardHandlers): KeyboardHandler {
  const handlersRef = useRef(handlers);

  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  return useCallback<(event: React.KeyboardEvent<any>) => void>((event) => {
    handlersRef.current[event.key]?.(event);
  }, []);
}

const MOUSEDOWN = 'mousedown';
const TOUCHSTART = 'touchstart';

type HandledEvents = [typeof MOUSEDOWN, typeof TOUCHSTART];
type HandledEventsType = HandledEvents[number];
type PossibleEvent = {
  [Type in HandledEventsType]: HTMLElementEventMap[Type];
}[HandledEventsType];
type Handler = (event: PossibleEvent) => void;

const events: HandledEvents = [MOUSEDOWN, TOUCHSTART];

export default function useOnClickOutside(ref: React.RefObject<HTMLElement>, handler: Handler | null) {
  const handlerRef = useLatest(handler);

  useEffect(() => {
    if (!handlerRef.current) {
      return;
    }

    const listener = (event: PossibleEvent) => {
      if (ref.current?.contains?.(event.target as Node)) {
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
  }, [handlerRef, ref]);
}
