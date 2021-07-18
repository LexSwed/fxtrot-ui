import { AnimatePresence, motion, Variants } from 'framer-motion';
import React, { useLayoutEffect, useState } from 'react';
import type { PopoverContentOwnProps } from '@radix-ui/react-popover';

import { styled } from '../stitches.config';
import { useToggleStateAtom } from '../utils/OpenStateProvider';
import { Slot } from '@radix-ui/react-slot';
import type { CssStyles } from '../utils/types';

type RadixProps = Pick<PopoverContentOwnProps, 'align' | 'side' | 'alignOffset' | 'sideOffset'>;

export interface PopoverLayerProps extends Omit<React.ComponentProps<'div'>, 'align' | 'ref'>, RadixProps {
  css?: CssStyles;
}

export const PopoverLayer: React.FC<
  PopoverLayerProps & {
    radixElement: React.ElementType<
      RadixProps & {
        as?: any;
        forceMount?: PopoverContentOwnProps['forceMount'];
        disableOutsideScroll?: PopoverContentOwnProps['disableOutsideScroll'];
      }
    >;
    disableOutsideScroll?: PopoverContentOwnProps['disableOutsideScroll'];
    as?: React.ElementType;
  }
> = ({
  children,
  align = 'start',
  side = 'bottom',
  alignOffset,
  sideOffset = 8,
  disableOutsideScroll,
  radixElement: RadixElement,
  ...props
}) => {
  const [open] = useToggleStateAtom();

  return (
    <AnimatePresence>
      {open && (
        <RadixElement
          align={align}
          side={side}
          alignOffset={alignOffset}
          sideOffset={sideOffset}
          as={Slot as any}
          forceMount
          disableOutsideScroll={disableOutsideScroll}
        >
          <InnerBox {...props} side={side}>
            {children}
          </InnerBox>
        </RadixElement>
      )}
    </AnimatePresence>
  );
};

interface InnerBoxProps extends PopoverLayerProps {
  'data-side'?: RadixProps['side'];
  'side'?: PopoverLayerProps['side'];
  'as'?: React.ElementType;
}

const InnerBox = React.forwardRef<HTMLDivElement, InnerBoxProps>(({ as, side, ...props }, ref) => {
  const [minWidth, setMinWidth] = useState<number>();

  useLayoutEffect(() => {
    const triggerEl = document.querySelector(`[aria-controls="${props.id}"]`);
    if (triggerEl) {
      setMinWidth((triggerEl as HTMLElement).getBoundingClientRect().width);
    }
  }, [props.id]);

  const transitionSide = props['data-side'] || side;

  return (
    <PopperBox
      style={{ minWidth }}
      variants={transitionSide ? animations[transitionSide] : undefined}
      initial="initial"
      animate="animate"
      exit="initial"
      transition={{ duration: 0.15, type: 'tween' }}
    >
      {React.createElement(as || 'div', { ...props, ref })}
    </PopperBox>
  );
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
