import React, { useLayoutEffect, useEffect } from 'react';
import {
  useFloating,
  shift,
  offset as floatingOffset,
  autoUpdate,
  AlignedPlacement,
  flip,
} from '@floating-ui/react-dom';

import { styled } from '../stitches.config';
import { useKeyboardHandles, useOnClickOutside } from '../utils/hooks';
import { useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';
import { Presence } from '../shared/Presence';
import { PopoverBox } from './PopoverBox';

interface Props extends React.ComponentProps<typeof PopoverBox> {
  triggerRef: React.RefObject<HTMLElement>;
  offset?: number;
  placement?: AlignedPlacement;
}

export const PopoverLayerDeprecated: React.FC<Props> = ({
  children,
  triggerRef,
  offset = 8,
  placement = 'bottom-start',
  ...props
}) => {
  const open = useOpenState();
  const { close } = useOpenStateControls();
  const {
    x,
    y,
    reference,
    floating,
    refs,
    update,
    placement: resultingPlacement,
  } = useFloating({
    placement,
    middleware: [shift(), flip(), floatingOffset(offset)],
  });

  useLayoutEffect(() => {
    reference(triggerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerRef.current, reference]);

  useEffect(() => {
    if (!refs.reference.current || !refs.floating.current) {
      return;
    }
    // Only call this when the floating element is rendered
    return autoUpdate(refs.reference.current, refs.floating.current, update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refs.reference.current, refs.floating.current, update]);

  useOnClickOutside(close, open, refs.floating, triggerRef);

  const handleKeyDown = useKeyboardHandles({
    Escape: (e) => {
      if (refs.floating.current?.contains(e.target as Node)) {
        close();
      }
    },
  });
  const [side, align] = resultingPlacement.split('-');

  return (
    <Presence present={open}>
      {({ ref }) => (
        <Popper
          ref={floating}
          style={{
            top: y ?? '',
            left: x ?? '',
            minWidth: refs.reference.current?.getBoundingClientRect().width,
          }}
          onKeyDown={handleKeyDown}
        >
          <PopoverBox {...props} data-state={open ? 'open' : 'closed'} data-side={side} data-align={align} ref={ref}>
            {children}
          </PopoverBox>
        </Popper>
      )}
    </Presence>
  );
};

const Popper = styled('div', {
  position: 'absolute',
  zIndex: 2147483647,
});
