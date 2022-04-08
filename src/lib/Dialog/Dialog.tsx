import React, { useRef } from 'react';
import { Root, Trigger } from '@radix-ui/react-dialog';
import { AnimatePresence } from 'framer-motion';

import { DialogModal } from './DialogModal';
import { Portal } from '../Portal';
import { OpenStateProvider, OpenStateRef, useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';
import { DialogClose } from './DialogClose';
import { DialogTitle } from './DialogTitle';

interface Props {
  children: [React.ReactElement, (close: () => void) => React.ReactNode];
  defaultOpen?: boolean;
  /**
   * The modality of the dialog. When set to true, interaction with outside elements will be disabled and only dialog content will be visible to screen readers.
   */
  modal?: boolean;
}

const DialogInner = ({ children, modal, ...props }: Props) => {
  const open = useOpenState();
  const controls = useOpenStateControls();
  const [trigger, content] = children;

  return (
    <Root open={open} onOpenChange={controls.switch} defaultOpen={props.defaultOpen} modal={modal}>
      <Trigger asChild>{trigger}</Trigger>
      {/* @ts-expect-error */}
      <AnimatePresence>{open && content && <Portal>{content(controls.close)}</Portal>}</AnimatePresence>
    </Root>
  );
};

export const Dialog = React.forwardRef<OpenStateRef, Props>((props, ref) => {
  return (
    <OpenStateProvider defaultOpen={props.defaultOpen} ref={ref}>
      <DialogInner {...props} />
    </OpenStateProvider>
  );
}) as React.ForwardRefExoticComponent<Props & React.RefAttributes<OpenStateRef>> & {
  Modal: typeof DialogModal;
  Close: typeof DialogClose;
  Title: typeof DialogTitle;
};

Dialog.Modal = DialogModal;
Dialog.Close = DialogClose;
Dialog.Title = DialogTitle;

export function useDialogRef() {
  return useRef<OpenStateRef>(null);
}
