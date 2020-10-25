import { FocusScope } from '@react-aria/focus';
import { StitchesProps } from '@stitches/react';
import React, { useMemo } from 'react';
import { useUIDSeed } from 'react-uid';
import { HiOutlineX } from 'react-icons/hi';
import Button from '../Button';
import Flex from '../Flex';
import { HeadingText } from '../Heading/Heading';
import Icon from '../Icon';
import Portal from '../Portal';
import { styled } from '../stitches.config';
import { useAllHandlers, useKeyboardHandles } from '../utils';

import { OpenStateProvider, useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';
import { DialogContext, DialogProvider, useDialog } from './utils';

export const DialogTrigger: React.FC<{
  children: [React.ReactElement<typeof Button>, DialogContext['render']];
}> = ({ children }) => {
  const [trigger, fn] = children;

  return (
    <OpenStateProvider>
      <Trigger>{trigger}</Trigger>
      <DialogMain render={fn} />
    </OpenStateProvider>
  );
};

const Trigger: React.FC<{ children: React.ReactElement<typeof Button> }> = ({ children }) => {
  const { open } = useOpenStateControls();

  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      children.props?.onClick?.(e);
      open();
    },
  });
};

const Underlay = styled('div', {
  backgroundColor: 'rgba(0,0,0,0.6)',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 5,
  overflow: 'hidden',
});

const ModalWrapper = styled(Flex, {
  zIndex: 6,
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
});

const DialogWindow = styled('section', {
  bc: '$surfaceStill',
  p: '$8',
  outline: 'none',
  maxHeight: '90vh',
  maxWidth: '90vw',
  minWidth: 320,
  br: '$md',
  pointerEvents: 'auto',
  position: 'relative',

  [`& ${HeadingText}`]: {
    fontSize: '$md',
  },
});

const DialogMain: React.FC<{ render: DialogContext['render'] }> = ({ render }) => {
  const isOpen = useOpenState();
  const { close } = useOpenStateControls();
  const seed = useUIDSeed();
  const context = useMemo<DialogContext>(() => ({ seed, render }), [seed, render]);

  if (!isOpen || !render) return null;

  return (
    <DialogProvider value={context}>
      <Portal>
        <Underlay aria-hidden="true" onClick={close} />
        <ModalWrapper main="center" cross="center">
          <FocusScope contain autoFocus restoreFocus>
            {render(close)}
          </FocusScope>
        </ModalWrapper>
      </Portal>
    </DialogProvider>
  );
};

const CloseButtonContainer = styled('div', {
  position: 'absolute',
  top: '$2',
  right: '$2',
});

export const Modal: React.FC<StitchesProps<typeof DialogWindow>> = ({ children, ...props }) => {
  const { seed } = useDialog();
  const { close } = useOpenStateControls();
  const handleKeyDown = useAllHandlers(
    props.onKeyDown,
    useKeyboardHandles({
      Escape: close,
    })
  );

  return (
    <DialogWindow {...props} onKeyDown={handleKeyDown} role="dialog" tabIndex={-1} aria-labelledby={seed('heading')}>
      <CloseButtonContainer>
        <Button variant="flat" onClick={close} aria-label="Dismiss">
          <Icon as={HiOutlineX} />
        </Button>
      </CloseButtonContainer>
      {children}
    </DialogWindow>
  );
};
