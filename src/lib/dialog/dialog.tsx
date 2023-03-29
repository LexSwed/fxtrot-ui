import {
  type ComponentProps,
  forwardRef,
  type ForwardRefExoticComponent,
  type ReactElement,
  type ReactNode,
  type RefAttributes,
  useRef,
} from 'react';
import * as RdxModal from '@radix-ui/react-dialog';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { OpenStateProvider, type OpenStateRef, useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';
import { Button } from '../button';
import { Heading } from '../heading';
import { DialogModal } from './dialog-modal';

interface CloseButtonProps extends ComponentProps<typeof Button> {}

const DialogClose = forwardRef<HTMLButtonElement, CloseButtonProps>((props, ref) => {
  return (
    <RdxModal.DialogClose asChild>
      <Button icon={XMarkIcon} variant="flat" {...props} ref={ref} />
    </RdxModal.DialogClose>
  );
});

interface TitleProps extends ComponentProps<typeof Heading> {}

const DialogTitle = ({ level = '4', ...props }: TitleProps) => {
  return (
    <RdxModal.Title asChild>
      <Heading {...props} level={level} />
    </RdxModal.Title>
  );
};

interface Props {
  children: [ReactElement, (close: () => void) => ReactNode];
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
    <RdxModal.Root open={open} onOpenChange={controls.switch} defaultOpen={props.defaultOpen} modal={modal}>
      <RdxModal.Trigger asChild>{trigger}</RdxModal.Trigger>
      {content(controls.close)}
    </RdxModal.Root>
  );
};

export const Dialog = forwardRef<OpenStateRef, Props>((props, ref) => {
  return (
    <OpenStateProvider defaultOpen={props.defaultOpen} ref={ref}>
      <DialogInner {...props} />
    </OpenStateProvider>
  );
}) as ForwardRefExoticComponent<Props & RefAttributes<OpenStateRef>> & {
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
