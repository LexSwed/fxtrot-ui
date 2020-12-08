import React, { useCallback, useEffect } from 'react';
import { HiSelector } from 'react-icons/hi';

import TextField from '../TextField';
import { useAllHandlers, useKeyboardHandles } from '../utils';
import { useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';
import { useComboBox } from './utils';
import Button from '../Button';
import Icon from '../Icon';
import { styled } from '../stitches.config';

interface Props extends Omit<React.ComponentProps<typeof TextField>, 'icon' | 'type' | 'value'> {
  value?: string;
  onSelect?: () => void;
}

const Input: React.FC<Props> = ({ onChange, onSelect, ...props }) => {
  const { inputRef, focusedItemId, focusControls } = useComboBox();
  const isOpen = useOpenState();
  const { open, close } = useOpenStateControls();

  const handleChange = useAllHandlers<string>(onChange as any, open);

  const handleSelect = useAllHandlers(onSelect, close);

  const handleKeyDown = useKeyboardHandles({
    'ArrowDown': () => {
      if (isOpen) {
        focusControls.focusNext();
      } else {
        open();
      }
    },
    'ArrowUp': () => {
      if (isOpen) {
        focusControls.focusPrev();
      } else {
        open();
      }
    },
    'Escape': close,
    'Tab.propagate': close,
    'Enter': handleSelect,
    'Space': handleSelect,
  });

  const onKeyDown = useAllHandlers(handleKeyDown, props.onKeyDown);

  return (
    <TextField
      aria-expanded={isOpen}
      aria-autocomplete="list"
      role="combobox"
      {...props}
      aria-controls={isOpen ? props['aria-controls'] : undefined}
      aria-activedescendant={focusedItemId}
      autoComplete="off"
      spellCheck="false"
      icon={ComboButton}
      onKeyDown={onKeyDown}
      onChange={handleChange}
      inputRef={inputRef}
    />
  );
};

const ButtonStyled = styled(Button, {
  zIndex: 2,
  position: 'relative',
  pointerEvents: 'all',
});

const ComboButton = () => {
  const isOpen = useOpenState();
  const { open } = useOpenStateControls();
  const { inputRef } = useComboBox();

  return (
    <ButtonStyled
      variant="transparent"
      tabIndex={-1}
      aria-hidden={isOpen}
      aria-expanded={isOpen}
      aria-label="Open the list"
      /* onClick would cause onOutside click to close the popup */
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        open();
        inputRef.current?.focus();
      }}
    >
      <Icon as={HiSelector} />
    </ButtonStyled>
  );
};

export default Input;
