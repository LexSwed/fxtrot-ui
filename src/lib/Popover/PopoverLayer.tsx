import { AnimatePresence, motion, Variants } from 'framer-motion';
import React from 'react';
import * as Radix from '@radix-ui/react-popover';

import { keyframes, styled } from '../stitches.config';
import { useToggleStateAtom } from '../utils/OpenStateProvider';
import { Slot } from '@radix-ui/react-slot';

type RadixProps = Pick<React.ComponentProps<typeof Radix.Content>, 'align' | 'side' | 'alignOffset' | 'sideOffset'>;

interface Props extends Omit<React.ComponentProps<'div'>, 'align' | 'ref'>, RadixProps {}

const PopoverLayer: React.FC<Props> = ({
  children,
  align = 'start',
  side = 'bottom',
  alignOffset,
  sideOffset = 8,
  ...props
}) => {
  const [open] = useToggleStateAtom();

  return (
    <AnimatePresence>
      {open && (
        <Radix.Content align={align} side={side} alignOffset={alignOffset} sideOffset={sideOffset} as={Slot} forceMount>
          <InnerBox {...props}>{children}</InnerBox>
        </Radix.Content>
      )}
    </AnimatePresence>
  );
};

export default PopoverLayer;

const InnerBox = React.forwardRef<HTMLDivElement, Props & { 'data-side'?: RadixProps['side'] }>((props, ref) => {
  return (
    <PopperBox
      ref={ref}
      {...(props as any)}
      variants={props['data-side'] ? animations[props['data-side']] : undefined}
      initial="initial"
      animate="animate"
      exit="initial"
      transition={{ duration: 0.15, type: 'tween' }}
    />
  );
});

const slideDown = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-5px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideUp = keyframes({
  '0%': { opacity: 0, transform: 'translateY(5px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});
const slideRight = keyframes({
  '0%': { opacity: 0, transform: 'translateX(5px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});
const slideLeft = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-5px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const PopperBox = styled(motion.div, {
  'bc': '$surfaceStill',
  'br': '$md',
  'outline': 'none',
  'boxShadow': '$popper',

  '&[data-side="top"]': { animationName: slideUp },
  '&[data-side="bottom"]': { animationName: slideDown },
  '&[data-side="left"]': { animationName: slideRight },
  '&[data-side="right"]': { animationName: slideLeft },
  'animationDuration': '0.2s',
  'animationTimingFunction': 'cubic-bezier(0.16, 1, 0.3, 1)',
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
