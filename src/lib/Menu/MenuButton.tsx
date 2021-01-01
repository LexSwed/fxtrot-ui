import React from 'react';

import Button from '../Button';
import { useAllHandlers, useForkRef, useKeyboardHandles } from '../utils';
import { useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';
import { useMenu } from './utils';

interface ButtonProps extends React.ComponentProps<typeof Button> {}

const MenuButton: React.FC<ButtonProps> = (buttonProps) => {
  const isOpen = useOpenState();
  const { open, close, toggle } = useOpenStateControls();
  const { seed, triggerRef } = useMenu();
  const onClick = useAllHandlers(buttonProps.onClick, toggle);

  const handleKeyDown = useKeyboardHandles({
    ArrowDown: open,
    ArrowUp: open,
    Escape: close,
  });

  const onKeyDown = useAllHandlers(buttonProps.onKeyDown, handleKeyDown);

  const refs = useForkRef(triggerRef as React.RefObject<HTMLButtonElement>);

  return (
    <Button
      {...buttonProps}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-controls={isOpen ? seed('menu') : undefined}
      id={seed('button')}
      onClick={onClick}
      onKeyDown={onKeyDown}
      ref={refs}
    />
  );
};

export default MenuButton;
