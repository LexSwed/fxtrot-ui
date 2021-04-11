import React from 'react';

import Heading from '../Heading/Heading';
import { useAllHandlers } from '../utils/hooks';
import { OpenStateProvider, useOpenStateControls } from '../utils/OpenStateProvider';
import { DialogRender, ModalWindow } from './DialogRender';
import { DialogContext, useDialog } from './utils';

type DialogRoot = React.FC<{
  children: [React.ReactElement, DialogContext['render']];
  defaultOpen?: boolean;
}>;

const DialogInner: DialogRoot = ({ children }) => {
  const [trigger, fn] = children;
  const { open } = useOpenStateControls();

  const onClick = useAllHandlers(trigger.props.onClick, open);

  return (
    <>
      {React.cloneElement(trigger, {
        onClick,
      })}
      <DialogRender render={fn} />
    </>
  );
};

const Dialog: DialogRoot & {
  Modal: typeof ModalWindow;
  Title: typeof Title;
} = ({ defaultOpen, ...props }) => {
  return (
    <OpenStateProvider defaultOpen={defaultOpen}>
      <DialogInner {...props} />
    </OpenStateProvider>
  );
};

const Title: React.FC<React.ComponentProps<typeof Heading>> = (props) => {
  const { seed } = useDialog();
  return <Heading {...props} id={seed('title')} />;
};

Dialog.Modal = ModalWindow;
Dialog.Title = Title;

export default Dialog;
