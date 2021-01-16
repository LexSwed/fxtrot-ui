import { createPopper, Instance, Modifier, Options, State, VirtualElement } from '@popperjs/core';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

export function usePopper(
    triggerRef: React.RefObject<Element | VirtualElement>,
    options?: Partial<Options>
  ): [ref: React.RefObject<HTMLElement>, popperState: State | undefined] {
    const popoverRef = useRef<HTMLElement>(null);
    const popperInstanceRef = useRef<Instance>();
  
    const instantiatePopper = useCallback(() => {
      if (!triggerRef.current || !popoverRef.current) return;
  
      popperInstanceRef.current?.destroy();
      popperInstanceRef.current = createPopper(triggerRef.current, popoverRef.current, options);
    }, [triggerRef, options]);
  
    useEffect(() => {
      return () => {
        popperInstanceRef.current?.destroy();
      };
    }, []);
  
    const ref = useMemo(() => {
      return {
        get current() {
          return popoverRef.current;
        },
        set current(node) {
          (popoverRef as React.MutableRefObject<any>).current = node;
          instantiatePopper();
        },
      };
    }, [popoverRef, instantiatePopper]);
    return [ref, popperInstanceRef.current?.state];
  }
  
  export const sameWidth: Modifier<'sameWidth', {}> = {
    name: 'sameWidth',
    enabled: true,
    phase: 'beforeWrite',
    requires: ['computeStyles'],
    fn: ({ state }) => {
      state.styles.popper.minWidth = `${state.rects.reference.width}px`;
    },
    effect: ({ state }) => {
      state.elements.popper.style.minWidth = `${state.elements.reference.getBoundingClientRect().width}px`;
    },
  };