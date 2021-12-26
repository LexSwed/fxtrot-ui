import { AnimatePresence, motion, Variants } from 'framer-motion';
import React, { useLayoutEffect, useState } from 'react';
import type { PopoverContentProps } from '@radix-ui/react-popover';

import { styled, CssStyles } from '../stitches.config';
import { useOpenState } from '../utils/OpenStateProvider';

type RadixProps = Pick<
  PopoverContentProps,
  'align' | 'side' | 'alignOffset' | 'sideOffset' | 'forceMount' | 'portalled' | 'onCloseAutoFocus'
>;

export interface PopoverLayerProps
  extends Omit<React.ComponentProps<typeof PopperBox>, 'css' | 'align' | 'ref'>,
    RadixProps {}
interface Props extends PopoverLayerProps {
  radixElement: React.ComponentType<any>;
  css?: CssStyles;
}
export const PopoverLayer: React.FC<Props> = ({
  children,
  align = 'start',
  side = 'bottom',
  sideOffset = 8,
  radixElement: RadixElement,
  css,
  ...props
}) => {
  const open = useOpenState();
  return (
    <AnimatePresence>
      {open && (
        <RadixElement align={align} side={side} sideOffset={sideOffset} asChild {...props}>
          <InnerBox css={css} side={side}>
            {children}
          </InnerBox>
        </RadixElement>
      )}
    </AnimatePresence>
  );
};

interface InnerBoxProps extends PopoverLayerProps {
  'data-side'?: PopoverLayerProps['side'];
  'side'?: PopoverLayerProps['side'];
  'css'?: CssStyles;
}

const InnerBox = React.forwardRef<HTMLDivElement, InnerBoxProps>(({ side, style = {}, ...props }, ref) => {
  const minWidth = useTriggerWidth(props.id);
  const transitionSide = props['data-side'] || side;
  return (
    <PopperBox
      style={{ ...style, minWidth }}
      variants={transitionSide ? animations[transitionSide] : undefined}
      initial="initial"
      animate="animate"
      exit="initial"
      transition={{ duration: 0.15, type: 'tween' }}
      {...props}
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
