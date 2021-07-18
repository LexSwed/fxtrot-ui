import React from 'react';
import { XIcon } from '@heroicons/react/outline';
import { Close } from '@radix-ui/react-dialog';
import { motion, Variants } from 'framer-motion';

import Button from '../Button';
import Icon from '../Icon';
import { styled } from '../stitches.config';

interface ModalProps extends React.ComponentProps<'div'> {}

export const DialogModal: React.FC<ModalProps> = ({ children, ...props }) => {
  return (
    <DialogWindow
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.1, type: 'tween' }}
      {...(props as any)}
    >
      {children}
      <CloseButtonContainer>
        <Close as={Button} variant="flat">
          <Icon as={XIcon} />
        </Close>
      </CloseButtonContainer>
    </DialogWindow>
  );
};

const CloseButtonContainer = styled('div', {
  position: 'absolute',
  top: '$2',
  right: '$2',
});

const DialogWindow = styled(motion.div, {
  bc: '$surfaceStill',
  p: '$8',
  pt: '$10',
  outline: 'none',
  maxWidth: '80vw',
  br: '$md',
  pointerEvents: 'auto',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 200,
  maxHeight: '85vh',
  mt: '-5vh',
});

const variants: Variants = {
  initial: { opacity: 0, y: 'calc(-50% + 10px)', x: '-50%' },
  animate: {
    opacity: 1,
    y: '-50%',
    x: '-50%',
    transition: { opacity: { duration: 0.2 }, y: { duration: 0.2 } },
  },
  exit: { opacity: 0, y: 'calc(-50% + 20px)', x: '-50%' },
};
