import React, { useMemo } from 'react';
import type { Options } from '@popperjs/core';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import Portal from '../Portal';
import { styled } from '../stitches.config';
import { sameWidth, useKeyboardHandles, useOnClickOutside, usePopper } from '../utils';
import { useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';

const Popper = styled('div', {
  zIndex: '$2',
  position: 'absolute',
});

const PopperBox = styled(motion.div, {
  bc: '$surfaceStill',
  br: '$md',
  border: '1px solid $borderLight',
  outline: 'none',
  boxShadow: '$xl',
});

const animations: Record<string, Variants> = {
  top: {
    initial: {
      opacity: 0,
      y: 5,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  },
  bottom: {
    initial: {
      opacity: 0,
      y: -5,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  },
  right: {
    initial: {
      opacity: 0,
      x: -5,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
  },
  left: {
    initial: {
      opacity: 0,
      x: 5,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
  },
};

type Props = {
  triggerRef: React.RefObject<HTMLElement>;
  offset?: number;
  placement?: Options['placement'];
};

const Popover: React.FC<Props> = ({ children, triggerRef, offset = 8, placement = 'bottom-start' }) => {
  const isOpen = useOpenState();
  const { close } = useOpenStateControls();
  const [popperRef, state] = usePopper(
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

  useOnClickOutside(close, isOpen, popperRef, triggerRef);

  const handleKeyDown = useKeyboardHandles(
    useMemo(
      () => ({
        Escape: close,
        Tab: close,
      }),
      [close]
    )
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <Portal>
          <Popper ref={popperRef as any} onKeyDown={handleKeyDown}>
            <PopperBox
              variants={state?.placement ? animations[state?.placement.split('-')[0]] : animations.bottom}
              initial="initial"
              animate="animate"
              exit="initial"
              transition={{ duration: 0.15, type: 'tween' }}
            >
              {children}
            </PopperBox>
          </Popper>
        </Portal>
      )}
    </AnimatePresence>
  );
};

export default Popover;
