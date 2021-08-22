import React, { useCallback, useState } from 'react';
import { Root, Trigger, Title, Overlay } from '@radix-ui/react-dialog';
import { Slot } from '@radix-ui/react-slot';
import { AnimatePresence, motion } from 'framer-motion';

import { DialogModal } from './DialogModal';
import { styled } from '../stitches.config';
import Heading from '../Heading';

interface Props {
  children: [React.ReactElement, (close: () => void) => React.ReactNode];
  defaultOpen?: boolean;
}

export const Dialog = ({ children, ...props }: Props) => {
  const [open, setOpen] = useState(props.defaultOpen);
  const [trigger, content] = children;

  const close = useCallback(() => setOpen(false), []);

  return (
    <Root open={open} onOpenChange={setOpen} defaultOpen={props.defaultOpen}>
      <Trigger as={Slot}>{trigger}</Trigger>
      <AnimatePresence>
        {open && content && (
          <>
            <Overlay as={Slot} forceMount>
              <OverlayStyled
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, type: 'tween' }}
              />
            </Overlay>
            {content(close)}
          </>
        )}
      </AnimatePresence>
    </Root>
  );
};

const DialogTitle: React.FC<React.ComponentProps<typeof Heading>> = (props) => {
  return <Title {...props} as={Heading} />;
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
});
