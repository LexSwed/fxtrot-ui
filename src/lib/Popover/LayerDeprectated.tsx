import type { Options } from '@popperjs/core';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import React, { useMemo } from 'react';

import Portal from '../Portal';
import { styled } from '../stitches.config';
import { sameWidth, usePopper } from '../utils/popper';
import { useKeyboardHandles, useOnClickOutside } from '../utils/hooks';
import { useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';

interface Props extends React.ComponentProps<typeof PopperBox> {
  triggerRef: React.RefObject<HTMLElement>;
  offset?: number;
  placement?: Options['placement'];
}

export const PopoverLayerDeprecated: React.FC<Props> = ({
  children,
  triggerRef,
  offset = 8,
  placement = 'bottom-start',
  ...props
}) => {
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

  const handleKeyDown = useKeyboardHandles({
    'Escape.propagate': (e) => {
      if (popperRef.current?.contains(e.target as Node)) {
        close();
      }
    },
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <Popper ref={popperRef as any} onKeyDown={handleKeyDown}>
          <PopperBox
            {...props}
            variants={state?.placement ? animations[state?.placement.split('-')[0]] : animations.bottom}
            initial="initial"
            animate="animate"
            exit="initial"
            transition={{ duration: 0.15, type: 'tween' }}
          >
            {children}
          </PopperBox>
        </Popper>
      )}
    </AnimatePresence>
  );
};

const Popper = styled('div', {
  position: 'absolute',
});

const PopperBox = styled(motion.div, {
  bc: '$surfaceStill',
  br: '$md',
  outline: 'none',
  boxShadow: '$popper',
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
