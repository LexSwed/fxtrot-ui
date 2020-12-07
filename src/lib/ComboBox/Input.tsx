import React, { useEffect } from 'react';
import { HiSelector } from 'react-icons/hi';

import TextField from '../TextField';
import { useAllHandlers, useKeyboardHandles } from '../utils';
import { useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';
import { useComboBox } from './utils';

interface Props extends Omit<React.ComponentProps<typeof TextField>, 'icon' | 'type' | 'value'> {
  value?: string;
}

const Input: React.FC<Props> = (props) => {
  const {
    inputRef,
    focusedItemId,
    focusControls,
    selectedItemValue,
    onChange: changeValue,
    renderedItems,
  } = useComboBox();
  const isOpen = useOpenState();
  const { open, close } = useOpenStateControls();

  const onChange = useAllHandlers<string>(props.onChange as any, open);

  const onSelect = useAllHandlers(() => {
    const newValue = Object.keys(renderedItems).find((key) => renderedItems[key].id === focusedItemId);
    if (newValue) {
      changeValue?.(newValue);
      onChange(renderedItems[newValue].label);
    }
    close();
  });

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
    'Enter': onSelect,
    'Space': onSelect,
  });

  const onKeyDown = useAllHandlers(handleKeyDown, props.onKeyDown);

  useEffect(() => {
    if (isOpen && selectedItemValue) {
      focusControls.focus(renderedItems[selectedItemValue]?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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
      icon={HiSelector}
      onKeyDown={onKeyDown}
      onChange={onChange}
      inputRef={inputRef}
    />
  );
};

export default Input;
