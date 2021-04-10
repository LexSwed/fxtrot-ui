import React from 'react';

import Button from '../Button';
import type { ButtonComponent } from '../Button/Button';
import Heading from '../Heading/Heading';
import { useAllHandlers } from '../utils/hooks';
import { OpenStateProvider, useOpenStateControls } from '../utils/OpenStateProvider';
import { DialogRender, ModalWindow } from './DialogRender';
import { DialogContext, useDialog } from './utils';

type DialogRoot = React.FC<{
  children: [React.ReactNode, DialogContext['render']];
  defaultOpen?: boolean;
}> & {
  Trigger: typeof Trigger;
  Modal: typeof ModalWindow;
  Title: typeof Title;
};

const Dialog: DialogRoot = ({ defaultOpen, children }) => {
  const [trigger, fn] = children;

  return (
    <OpenStateProvider defaultOpen={defaultOpen}>
      {trigger}
      <DialogRender render={fn} />
    </OpenStateProvider>
  );
};

const Trigger: ButtonComponent = React.forwardRef((props, ref) => {
  const { open } = useOpenStateControls();

  const handleClick = useAllHandlers(props.onClick, open);

  return <Button {...props} onClick={handleClick} ref={ref} />;
});

const Title: React.FC<React.ComponentProps<typeof Heading>> = (props) => {
  const { seed } = useDialog();
  return <Heading {...props} id={seed('title')} />;
};

Dialog.Trigger = Trigger;
Dialog.Modal = ModalWindow;
Dialog.Title = Title;

export default Dialog;
