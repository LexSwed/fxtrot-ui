import React, { useCallback, useState } from 'react';
import { Root, Trigger, Overlay } from '@radix-ui/react-dialog';
import { Slot } from '@radix-ui/react-slot';
import { AnimatePresence, motion } from 'framer-motion';

import { DialogModal, DialogTitle } from './DialogModal';
import { styled } from '../stitches.config';
import Flex from '../Flex';
import Portal from '../Portal';

interface Props {
  children: [React.ReactElement, (close: () => void) => React.ReactNode];
  defaultOpen?: boolean;
}

const Dialog = ({ children, ...props }: Props) => {
  const [open, setOpen] = useState(false);
  const [trigger, content] = children;

  const close = useCallback(() => setOpen(false), []);

  return (
    <Root open={open} onOpenChange={setOpen} defaultOpen={props.defaultOpen}>
      <Trigger as={Slot}>{trigger}</Trigger>
      <AnimatePresence>
        {open && content && (
          <Portal>
            <Overlay as={Slot}>
              <OverlayStyled as={motion.div} />
            </Overlay>
            <ModalWrapper
              main="center"
              cross="center"
              as={motion.div as any}
              initial={{ opacity: 0, y: 5 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { opacity: { duration: 0.2 }, y: { duration: 0.2 } },
              }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.1, type: 'tween' }}
            >
              {content(close)}
            </ModalWrapper>
          </Portal>
        )}
      </AnimatePresence>
    </Root>
  );
};

Dialog.Modal = DialogModal;
Dialog.Title = DialogTitle;

const ModalWrapper = styled(Flex, {
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
});

const OverlayStyled = styled(Overlay, {
  backgroundColor: 'rgba(0,0,0,0.6)',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  overflow: 'hidden',
});

export default Dialog;
