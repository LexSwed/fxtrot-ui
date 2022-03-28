import React from 'react';
import { Content, DialogContentProps, Overlay } from '@radix-ui/react-dialog';
import { motion, Variants } from 'framer-motion';

import { styled } from '../stitches.config';
import type { CssStyles } from '..';
import { DialogClose } from './DialogClose';

export interface ModalProps extends React.ComponentProps<'div'> {
  hasCloseButton?: boolean;
  overlay?: 'dialog' | 'side';
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
      overlay = 'dialog',
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
        <OverlayStyled
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          overlay={overlay}
          css={css?.overlay}
        >
          <Content
            asChild
            forceMount
            onOpenAutoFocus={onOpenAutoFocus}
            onCloseAutoFocus={onCloseAutoFocus}
            onEscapeKeyDown={onEscapeKeyDown}
            onPointerDownOutside={onPointerDownOutside}
          >
            <DialogWindow
              variants={variants[overlay]}
              initial="initial"
              animate="animate"
              exit="exit"
              overlay={overlay}
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
  outline: 'none',
  pointerEvents: 'auto',
  minWidth: 320,
  boxShadow: '$lg',
  position: 'relative',
  variants: {
    overlay: {
      side: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
      dialog: {
        'br': '$md',
        '@desktop': {
          maxWidth: '80vw',
        },
      },
    },
  },
});

const OverlayStyled = styled(motion.div, {
  backgroundColor: 'rgba(0,0,0,0.6)',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflowY: 'auto',
  zIndex: 100,
  variants: {
    overlay: {
      side: {},
      dialog: {
        display: 'grid',
        placeItems: 'center',
      },
    },
  },
});

const variants: Record<NonNullable<ModalProps['overlay']>, Variants> = {
  side: {
    initial: { opacity: 0, x: '-100%' },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      x: '-100%',
      transition: {
        duration: 0.2,
      },
    },
  },
  dialog: {
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
