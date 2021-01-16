import { FocusScope } from '@react-aria/focus';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useMemo } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import { useUIDSeed } from 'react-uid';

import Button from '../Button';
import Flex from '../Flex';
import Icon from '../Icon';
import Portal from '../Portal';
import { styled } from '../stitches.config';
import { useAllHandlers, useKeyboardHandles } from '../utils/hooks';
import type { PropsOf } from '../utils/types';

import { useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';
import { DialogContext, DialogProvider, useDialog } from './utils';

interface ModalProps extends PropsOf<typeof DialogWindow> {}

export const ModalWindow: React.FC<ModalProps> = ({ children, ...props }) => {
  const { seed } = useDialog();
  const { close } = useOpenStateControls();
  const handleKeyDown = useAllHandlers(
    props.onKeyDown,
    useKeyboardHandles({
      Escape: close,
    })
  );

  return (
    <DialogWindow {...props} onKeyDown={handleKeyDown} role="dialog" tabIndex={-1} aria-labelledby={seed('title')}>
      {children}
      <CloseButtonContainer>
        <Button variant="flat" onClick={close} aria-label="Dismiss">
          <Icon as={HiOutlineX} />
        </Button>
      </CloseButtonContainer>
    </DialogWindow>
  );
};

export const DialogRender: React.FC<{ render: DialogContext['render'] }> = ({ render }) => {
  const isOpen = useOpenState();
  const { close } = useOpenStateControls();
  const seed = useUIDSeed();
  const context = useMemo<DialogContext>(() => ({ seed, render }), [seed, render]);

  return (
    <AnimatePresence>
      {isOpen && render && (
        <DialogProvider value={context}>
          <Portal>
            <Underlay
              key="underlay"
              aria-hidden="true"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, type: 'tween' }}
            />
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
              key="dialog"
            >
              <FocusScope contain autoFocus restoreFocus>
                {render(close)}
              </FocusScope>
            </ModalWrapper>
          </Portal>
        </DialogProvider>
      )}
    </AnimatePresence>
  );
};

const CloseButtonContainer = styled('div', {
  position: 'absolute',
  top: '$2',
  right: '$2',
});

const Underlay = styled(motion.div, {
  backgroundColor: 'rgba(0,0,0,0.6)',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  overflow: 'hidden',
});

const ModalWrapper = styled(Flex, {
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
});

const DialogWindow = styled('section', {
  bc: '$surfaceStill',
  p: '$8',
  pt: '$10',
  outline: 'none',
  maxHeight: '90vh',
  maxWidth: '90vw',
  minWidth: 480,
  br: '$md',
  pointerEvents: 'auto',
  position: 'relative',
});
