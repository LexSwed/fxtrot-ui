import { FocusScope } from '@react-aria/focus';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useMemo, useRef } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import { useUIDSeed } from 'react-uid';

import Button from '../Button';
import Flex from '../Flex';
import Icon from '../Icon';
import Portal from '../Portal';
import { styled } from '../stitches.config';
import { useKeyboardHandles } from '../utils/hooks';

import { useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';
import { DialogContext, DialogProvider, useDialog } from './utils';
import Box from '../Box';

export const DialogRender: React.FC<{ render: DialogContext['render'] }> = ({ render }) => {
  const isOpen = useOpenState();
  const { close } = useOpenStateControls();
  const dialogRef = useRef<HTMLDivElement>(null);
  const seed = useUIDSeed();
  const context = useMemo<DialogContext>(() => ({ seed, render }), [seed, render]);

  const handleKeyDown = useKeyboardHandles({
    'Escape.propagate': (e) => {
      if (dialogRef.current?.contains(e.target as Node)) {
        close();
      }
    },
  });

  return (
    <AnimatePresence>
      {isOpen && render && (
        <DialogProvider value={context}>
          <Portal>
            <ClickCatcher>
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
                onKeyDown={handleKeyDown}
                ref={dialogRef}
              >
                <FocusScope contain autoFocus restoreFocus>
                  {render(close)}
                </FocusScope>
              </ModalWrapper>
            </ClickCatcher>
          </Portal>
        </DialogProvider>
      )}
    </AnimatePresence>
  );
};

interface ModalProps extends React.ComponentProps<typeof DialogWindow> {}

export const ModalWindow: React.FC<ModalProps> = ({ children, ...props }) => {
  const { seed } = useDialog();
  const { close } = useOpenStateControls();

  return (
    <DialogWindow {...props} role="dialog" tabIndex={-1} aria-labelledby={seed('title')}>
      {children}
      <CloseButtonContainer>
        <Button variant="flat" onClick={close} aria-label="Dismiss">
          <Icon as={HiOutlineX} />
        </Button>
      </CloseButtonContainer>
    </DialogWindow>
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

/**
 * Allows Dialog to remain open when opened by a trigger
 * inside the Menu that registers outside click listener to close the menu
 */
function preventClick(e: React.PointerEvent | React.TouchEvent | React.MouseEvent) {
  e.stopPropagation();
}
const ClickCatcher: React.FC = ({ children }) => (
  <Box display="contents" onMouseDown={preventClick} onTouchStart={preventClick} onPointerDown={preventClick}>
    {children}
  </Box>
);
