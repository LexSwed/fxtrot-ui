import React from 'react';
import { HiSelector } from 'react-icons/hi';

import TextField from '../TextField';
import { useAllHandlers, useForkRef, useKeyboardHandles } from '../utils';
import { useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';
import { useComboBox } from './utils';

interface Props extends Omit<React.ComponentProps<typeof TextField>, 'icon'> {}

const Input = React.forwardRef<HTMLDivElement, Props>(({ id, hint, inputRef, ...props }, ref) => {
  const { triggerRef } = useComboBox();
  const isOpen = useOpenState();
  const { open, close } = useOpenStateControls();

  const handleKeyDown = useKeyboardHandles({
    ArrowDown: open,
    ArrowUp: open,
    Escape: close,
  });

  const onKeyDown = useAllHandlers(props.onKeyDown, handleKeyDown);

  const refs = useForkRef(inputRef, triggerRef);

  return (
    <TextField
      aria-expanded={isOpen}
      aria-autocomplete="list"
      role="combobox"
      {...props}
      autoComplete="off"
      spellCheck="false"
      icon={HiSelector}
      onKeyDown={onKeyDown}
      inputRef={refs}
      ref={ref}
    />
  );
});

export default Input;
