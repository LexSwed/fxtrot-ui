import { AnimatePresence, motion, Variants } from 'framer-motion';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import type { PopoverContentOwnProps, PopoverContentPrimitive } from '@radix-ui/react-popover';

import { keyframes, styled } from '../stitches.config';
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
        as: any;
        disableOutsideScroll?: PopoverContentOwnProps['disableOutsideScroll'];
        forceMount?: PopoverContentOwnProps['forceMount'];
      }
    >;
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
          <InnerBox {...props}>{children}</InnerBox>
        </RadixElement>
      )}
    </AnimatePresence>
  );
};

const InnerBox = React.forwardRef<
  HTMLDivElement,
  PopoverLayerProps & { 'data-side'?: RadixProps['side']; 'as'?: React.ElementType }
>(({ style, ...props }, ref) => {
  const [minWidth, setMinWidth] = useState<number>();

  useLayoutEffect(() => {
    const triggerEl = document.querySelector(`[aria-controls="${props.id}"]`);
    if (triggerEl) {
      setMinWidth((triggerEl as HTMLElement).getBoundingClientRect().width);
    }
  }, [props.id]);

  return <PopperBox ref={ref} style={{ ...style, minWidth }} {...(props as any)} />;
});

/**
 * Preserve both, CSS animation for mount and framer-motion for unmount
 * otherwise data-side doesn't get value until the component is mounted
 * and so framer-motion doesn't get correct animation variant
 */
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

const PopperBox = styled('div', {
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
