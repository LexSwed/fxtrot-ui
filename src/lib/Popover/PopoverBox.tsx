import type { PopoverContentProps } from '@radix-ui/react-popover';
import { motion, Variants } from 'framer-motion';
import React, { useLayoutEffect, useState } from 'react';
import { listStyles } from '../shared/FloatingList';
import { CssStyles, styled } from '../stitches.config';

interface InnerBoxProps extends React.ComponentProps<'div'> {
  'data-side'?: PopoverContentProps['side'];
  'side'?: PopoverContentProps['side'];
  'css'?: CssStyles;
  'id'?: string;
}

export const PopoverBox = React.forwardRef<HTMLDivElement, InnerBoxProps>(({ side, style = {}, ...props }, ref) => {
  const minWidth = useTriggerWidth(props.id);
  const transitionSide = props['data-side'] || side;
  return (
    <StyledBox
      style={{ ...style, minWidth }}
      variants={transitionSide ? animations[transitionSide] : undefined}
      initial="initial"
      animate="animate"
      exit="initial"
      transition={{ duration: 0.15, type: 'tween' }}
      {...(props as any)}
      ref={ref}
    />
  );
});

function useTriggerWidth(triggerElementId?: string) {
  const [width, setWidth] = useState<number>();

  useLayoutEffect(() => {
    const triggerEl = document.querySelector(`[aria-controls="${triggerElementId}"]`);
    if (triggerEl) {
      setWidth((triggerEl as HTMLElement).getBoundingClientRect().width);
    }
  }, [triggerElementId]);

  return width;
}

const StyledBox = styled(motion.div, listStyles, {
  br: '$base',
  bc: '$surface',
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
