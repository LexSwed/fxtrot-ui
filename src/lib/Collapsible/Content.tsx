import React from 'react';
import * as Rdx from '@radix-ui/react-collapsible';
import { AnimatePresence, motion, Variants } from 'framer-motion';

import { styled } from '../stitches.config';
import { useOpenState } from '../utils/OpenStateProvider';
import type { CssStyles } from '../stitches.config';

interface ContentProps extends React.ComponentProps<'div'> {
  css?: CssStyles;
}
export const Content = React.forwardRef<HTMLDivElement, ContentProps>((props, ref) => {
  return (
    <Rdx.Content asChild forceMount>
      <ContentInner {...props} ref={ref} />
    </Rdx.Content>
  );
});

const StyledContent = styled(motion.div, {});
const ContentInner = React.forwardRef<HTMLDivElement, ContentProps>((props, ref) => {
  const open = useOpenState();
  return (
    // @ts-expect-error
    <AnimatePresence>
      {open ? (
        <StyledContent
          {...(props as any)}
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          ref={ref}
        />
      ) : null}
    </AnimatePresence>
  );
});
const contentVariants: Variants = {
  initial: { opacity: 0, y: -10, height: 0 },
  animate: { opacity: 1, y: 0, height: 'auto', transition: { duration: 0.3 } },
  exit: {
    opacity: 0,
    height: 0,
    y: -10,
    transition: {
      duration: 0.2,
    },
  },
};
