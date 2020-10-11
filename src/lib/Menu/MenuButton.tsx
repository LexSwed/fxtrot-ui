import React from 'react';
import Button from '../Button';
import { useAllHandlers, useForkRef, useKeyboardHandles } from '../utils';
import { useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';
import { useMenu } from './utils';

type ButtonProps = React.ComponentProps<typeof Button>;

const MenuButton = React.forwardRef<HTMLButtonElement, ButtonProps>((buttonProps, propsRef) => {
  const isOpen = useOpenState();
  const { open, toggle } = useOpenStateControls();
  const { seed, triggerRef } = useMenu();
  const onPress = useAllHandlers(buttonProps.onPress, toggle);

  const handleKeyDown = useKeyboardHandles({
    ArrowDown: open,
    ArrowUp: open,
  });

  const onKeyDown = useAllHandlers(buttonProps.onKeyDown, handleKeyDown);

  const refs = useForkRef(triggerRef as React.RefObject<HTMLButtonElement>, propsRef);

  return (
    <Button
      {...buttonProps}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-controls={isOpen ? seed('menu') : undefined}
      id={seed('button')}
      onPress={onPress}
      onKeyDown={onKeyDown}
      ref={refs}
    />
  );
});

export default MenuButton;
