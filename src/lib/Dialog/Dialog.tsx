import React from 'react';

import { useAllHandlers } from '../utils/hooks';
import { OpenStateProvider, useOpenStateControls } from '../utils/OpenStateProvider';
import { DialogRender, DialogModal, DialogTitle } from './DialogRender';

interface Props {
  children: [React.ReactElement, (close: () => void) => React.ReactNode];
  defaultOpen?: boolean;
}

const DialogInner = ({ children }: Props) => {
  const [trigger, modal] = children;
  const { open } = useOpenStateControls();

  const onClick = useAllHandlers(trigger.props.onClick, open);

  return (
    <>
      {React.cloneElement(trigger, {
        onClick,
      })}
      <DialogRender>{modal}</DialogRender>
    </>
  );
};

const Dialog: React.FC<Props> & {
  Modal: typeof DialogModal;
  Title: typeof DialogTitle;
} = ({ defaultOpen, ...props }) => {
  return (
    <OpenStateProvider defaultOpen={defaultOpen}>
      <DialogInner {...props} />
    </OpenStateProvider>
  );
};

Dialog.Modal = DialogModal;
Dialog.Title = DialogTitle;

export default Dialog;
