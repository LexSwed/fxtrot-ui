import React from 'react';
import { XIcon } from '@heroicons/react/outline';
import { Slot } from '@radix-ui/react-slot';
import { Content, Title, Close } from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';

import Button from '../Button';
import Icon from '../Icon';
import Heading from '../Heading';
import { styled } from '../stitches.config';

interface ModalProps extends React.ComponentProps<'div'> {}

export const DialogModal: React.FC<ModalProps> = ({ children, ...props }) => {
  return (
    <Content as={Slot} forceMount>
      <DialogWindow
        as={motion.div}
        initial={{ opacity: 0, y: 5 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { opacity: { duration: 0.2 }, y: { duration: 0.2 } },
        }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.1, type: 'tween' }}
        {...props}
      >
        {children}
        <CloseButtonContainer>
          <Close as={Slot}>
            <Button variant="flat">
              <Icon as={XIcon} />
            </Button>
          </Close>
        </CloseButtonContainer>
      </DialogWindow>
    </Content>
  );
};

export const DialogTitle: React.FC<React.ComponentProps<typeof Heading>> = (props) => {
  return <Title {...props} as={Heading} />;
};

const CloseButtonContainer = styled('div', {
  position: 'absolute',
  top: '$2',
  right: '$2',
});

const DialogWindow = styled(Content, {
  bc: '$surfaceStill',
  p: '$8',
  pt: '$10',
  outline: 'none',
  maxHeight: '90vh',
  maxWidth: '80vw',
  minWidth: 480,
  br: '$md',
  pointerEvents: 'auto',
  position: 'relative',
});
