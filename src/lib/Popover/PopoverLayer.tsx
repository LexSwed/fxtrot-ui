import { AnimatePresence, motion, Variants } from 'framer-motion';
import React from 'react';
import * as Radix from '@radix-ui/react-popover';

import { styled } from '../stitches.config';
import { sameWidth, usePopper } from '../utils/popper';
import { useKeyboardHandles, useOnClickOutside } from '../utils/hooks';
import { useOpenState, useOpenStateControls, useToggleStateAtom } from '../utils/OpenStateProvider';

type RadixProps = Pick<React.ComponentProps<typeof Radix.Content>, 'align' | 'side' | 'alignOffset' | 'sideOffset'>;

interface Props extends Omit<React.ComponentProps<typeof PopperBox>, 'align'>, RadixProps {}

const PopoverLayer: React.FC<Props> = ({
  children,
  align = 'start',
  alignOffset,
  sideOffset = 8,
  side = 'bottom',
  ...props
}) => {
  const [open] = useToggleStateAtom();

  return (
    <AnimatePresence>
      {open && (
        <Radix.Content align={align} side={side} alignOffset={alignOffset} sideOffset={sideOffset} forceMount>
          <PopperBox
            {...props}
            // variants={state?.placement ? animations[state?.placement.split('-')[0]] : animations.bottom}
            // initial="initial"
            // animate="animate"
            // exit="initial"
            // transition={{ duration: 0.15, type: 'tween' }}
          >
            {children}
          </PopperBox>
        </Radix.Content>
      )}
    </AnimatePresence>
  );
};

export default PopoverLayer;

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
