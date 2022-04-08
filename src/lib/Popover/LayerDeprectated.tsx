import React, { useLayoutEffect, useEffect } from 'react';
import {
  useFloating,
  shift,
  offset as floatingOffset,
  autoUpdate,
  AlignedPlacement,
  flip,
} from '@floating-ui/react-dom';
import { AnimatePresence, motion, Variants } from 'framer-motion';

import { styled } from '../stitches.config';
import { useKeyboardHandles, useOnClickOutside } from '../utils/hooks';
import { useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';

interface Props extends React.ComponentProps<typeof PopperBox> {
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
  const isOpen = useOpenState();
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

  useOnClickOutside(close, isOpen, refs.floating, triggerRef);

  const handleKeyDown = useKeyboardHandles({
    Escape: (e) => {
      if (refs.floating.current?.contains(e.target as Node)) {
        close();
      }
    },
  });

  return (
    // @ts-expect-error
    <AnimatePresence>
      {isOpen && (
        <Popper
          ref={floating}
          style={{
            top: y ?? '',
            left: x ?? '',
            minWidth: refs.reference.current?.getBoundingClientRect().width,
          }}
          onKeyDown={handleKeyDown}
        >
          <PopperBox
            {...props}
            variants={resultingPlacement ? animations[resultingPlacement.split('-')[0]] : animations.bottom}
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
  zIndex: 2147483647,
});

const PopperBox = styled(motion.div, {
  bc: '$surface',
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
