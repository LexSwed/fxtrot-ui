import { Options } from '@popperjs/core';
import React, { useMemo } from 'react';
import Portal from '../Portal';
import { styled } from '../stitches.config';
import { sameWidth, useKeyboardHandles, useOnClickOutside, usePopper } from '../utils';
import { useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';

const Popper = styled('div', {
  position: 'absolute',
  bc: '$surfaceStill',
  br: '$md',
  border: '1px solid $gray200',
  outline: 'none',
  boxShadow: '$xl',
});

type Props = {
  triggerRef: React.RefObject<HTMLElement>;
  offset?: number;
  placement?: Options['placement'];
};

const Popover: React.FC<Props> = ({ children, triggerRef, offset = 8, placement = 'bottom-start' }) => {
  const isOpen = useOpenState();
  const { close } = useOpenStateControls();
  const popperRef = usePopper(
    triggerRef,
    useMemo<Options>(
      () => ({
        placement,
        strategy: 'fixed',
        modifiers: [{ name: 'offset', options: { offset: [0, offset] } }, sameWidth],
      }),
      [placement, offset]
    )
  );

  useOnClickOutside(close, popperRef, triggerRef);

  const handleKeyDown = useKeyboardHandles(
    useMemo(
      () => ({
        Escape: close,
        Tab: close,
      }),
      [close]
    )
  );

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <Popper ref={popperRef as any} onKeyDown={handleKeyDown}>
        {children}
      </Popper>
    </Portal>
  );
};

export default Popover;
