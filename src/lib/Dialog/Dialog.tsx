import React, { useCallback, useState } from 'react';
import { Root, Trigger, Title, Overlay, Portal, DialogTitleProps } from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';

import { DialogModal } from './DialogModal';
import { styled } from '../stitches.config';
import { Heading } from '../Heading';
import { useRootElementRef } from '../ThemeProvider/ThemeProvider';

interface Props {
  children: [React.ReactElement, (close: () => void) => React.ReactNode];
  defaultOpen?: boolean;
  /**
   * The modality of the dialog. When set to true, interaction with outside elements will be disabled and only dialog content will be visible to screen readers.
   */
  modal?: boolean;
}

export const Dialog = ({ children, modal, ...props }: Props) => {
  const [open, setOpen] = useState(props.defaultOpen);
  const [trigger, content] = children;
  const rootRef = useRootElementRef();

  const close = useCallback(() => setOpen(false), []);

  return (
    <Root open={open} onOpenChange={setOpen} defaultOpen={props.defaultOpen} modal={modal}>
      <Trigger asChild>{trigger}</Trigger>
      <AnimatePresence>
        {open && content && (
          <Portal container={rootRef.current}>
            <Overlay asChild forceMount>
              <OverlayStyled
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, type: 'tween' }}
              />
            </Overlay>
            {content(close)}
          </Portal>
        )}
      </AnimatePresence>
    </Root>
  );
};

const DialogTitle: React.FC<DialogTitleProps & React.ComponentProps<typeof Heading>> = ({ ...props }) => {
  return (
    <Title asChild>
      <Heading {...props} />
    </Title>
  );
};

Dialog.Modal = DialogModal;
Dialog.Title = DialogTitle;

const OverlayStyled = styled(motion.div, {
  backgroundColor: 'rgba(0,0,0,0.6)',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  overflow: 'hidden',
  zIndex: 10,
});
