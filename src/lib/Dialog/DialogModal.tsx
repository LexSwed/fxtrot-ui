import React from 'react';
import { Content, DialogContentProps, Overlay } from '@radix-ui/react-dialog';
import { motion, Variants } from 'framer-motion';

import { styled } from '../stitches.config';
import type { CssStyles } from '..';
import { DialogClose } from './DialogClose';

export interface ModalProps extends React.ComponentProps<'div'> {
  hasCloseButton?: boolean;
  onOpenAutoFocus?: DialogContentProps['onOpenAutoFocus'];
  onCloseAutoFocus?: DialogContentProps['onCloseAutoFocus'];
  onEscapeKeyDown?: DialogContentProps['onEscapeKeyDown'];
  onPointerDownOutside?: DialogContentProps['onPointerDownOutside'];
  onInteractOutside?: DialogContentProps['onInteractOutside'];
  css?: CssStyles & {
    overlay?: CssStyles;
  };
}

export const DialogModal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      children,
      hasCloseButton = true,
      css,
      onOpenAutoFocus,
      onCloseAutoFocus,
      onEscapeKeyDown,
      onPointerDownOutside,
      ...props
    },
    ref
  ) => {
    return (
      <Overlay asChild forceMount>
        <OverlayStyled variants={overlayVariants} initial="initial" animate="animate" exit="exit" css={css?.overlay}>
          <Content
            asChild
            forceMount
            onOpenAutoFocus={onOpenAutoFocus}
            onCloseAutoFocus={onCloseAutoFocus}
            onEscapeKeyDown={onEscapeKeyDown}
            onPointerDownOutside={onPointerDownOutside}
          >
            <DialogWindow
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              {...(props as any)}
              css={css}
              ref={ref}
            >
              {children}
              {hasCloseButton && (
                <CloseButtonContainer>
                  <DialogClose />
                </CloseButtonContainer>
              )}
            </DialogWindow>
          </Content>
        </OverlayStyled>
      </Overlay>
    );
  }
);

const CloseButtonContainer = styled('div', {
  position: 'absolute',
  top: '$2',
  right: '$2',
});

const DialogWindow = styled(motion.div, {
  bc: '$surface',
  p: '$8',
  pt: '$10',
  outline: 'none',
  maxWidth: '80vw',
  br: '$md',
  pointerEvents: 'auto',
  minWidth: 320,
  boxShadow: '$lg',
  position: 'relative',
});

const OverlayStyled = styled(motion.div, {
  backgroundColor: 'rgba(0,0,0,0.6)',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'grid',
  placeItems: 'center',
  overflowY: 'auto',
});

const variants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

const overlayVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      delay: 0.1,
    },
  },
};
