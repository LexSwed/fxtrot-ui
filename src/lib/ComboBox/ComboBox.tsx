import React, { useEffect, useMemo, useRef } from 'react';
import { Provider } from 'jotai';
import { useUIDSeed } from 'react-uid';

import { OpenStateProvider, useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';

import Input, { Props as InputProps } from './Input';
import Item, { OptionType } from './Item';
import { useAllHandlers, useForkRef } from '../utils';
import Popover from '../Popover';
import { useFilterText, useFocusedItemId, useSyncValue } from './atoms';
import VirtualList from './VirtualList';

interface Props
  extends Omit<
    InputProps,
    'onChange' | 'onSelect' | 'value' | 'children' | 'hasNewBadge' | 'onSelect' | 'onFocusNext' | 'onFocusPrev'
  > {
  value?: string | null;
  onChange?: (newValue: string | null) => void;
  onInputChange?: (text: string) => void;
  children: OptionType[] | OptionType;
}

const ComboBoxInner: React.FC<Props> = ({
  value: propValue,
  onChange: propOnChange,
  children,
  inputRef,
  onInputChange,
  ...textFieldProps
}) => {
  const triggerRef = useRef<HTMLInputElement>(null);
  const inputRefs = useForkRef(triggerRef, inputRef);
  const idSeed = useUIDSeed();
  const isOpen = useOpenState();
  const [value, setValue] = useSyncValue(propValue, propOnChange);
  const [filterText, setFilterText] = useFilterText();
  const [focusedItemId, setFocusedItemId] = useFocusedItemId();
  const { close } = useOpenStateControls();

  const allowNewElement = !!onInputChange;
  const listboxId = idSeed('listbox');
  const createOptionId = (value: string) => idSeed('option') + value;

  useEffect(() => {
    onInputChange?.(filterText);
  }, [filterText, onInputChange]);

  const items = useMemo<OptionType[]>(() => {
    if (filterText === '') return React.Children.toArray(children) as OptionType[];

    let filtered: OptionType[] = [];

    React.Children.forEach(children, (item: OptionType) => {
      if (item.props.label.toLowerCase().includes(filterText.toLowerCase())) {
        filtered.push(item);
      }
    });

    return filtered;
  }, [children, filterText]);

  useEffect(() => {
    if (value) {
      const item = (React.Children.toArray(children) as OptionType[]).find((item) => item.props.value === value);
      item && setFilterText(item.props?.label);
    }
  }, [children, setFilterText, value]);

  const handleSelect = () => {
    if (focusedItemId) {
      const selected = items.find((item) => createOptionId(item.props.value) === focusedItemId);
      if (selected) {
        setFilterText(selected.props.label || '');
        setValue(selected.props.value || null);
      }
    }
    close();
  };
  const handleFocus = (createNewIndex: (oldIndex: number) => number) => {
    const itemIndex = items.findIndex((item) => createOptionId(item.props.value) === focusedItemId);
    const newIndex = itemIndex > -1 ? createNewIndex(itemIndex) : 0;
    setFocusedItemId(createOptionId(items[newIndex]?.props?.value));
    // rowVirtualizer.scrollToIndex(newIndex);
  };
  const handleFocusNext = () => {
    handleFocus((index) => (index < items.length - 1 ? index + 1 : 0));
  };
  const handleFocusPrev = () => {
    handleFocus((index) => (index > 0 ? index - 1 : items.length - 1));
  };
  const handleBlur = useAllHandlers(
    textFieldProps.onBlur,
    allowNewElement
      ? undefined
      : () => {
          if (filterText === '') {
            setValue(null);
          } else if (value) {
            const selected = items.find((item) => item.props.value === value);
            setFilterText(selected?.props?.label || '');
          } else {
            setFilterText('');
          }
        }
  );

  return (
    <>
      <Input
        {...textFieldProps}
        aria-controls={isOpen ? listboxId : ''}
        aria-activedescendant={focusedItemId as string}
        inputRef={inputRefs}
        hasNewBadge={allowNewElement && !value && !!filterText}
        onBlur={handleBlur}
        onSelect={handleSelect}
        onFocusNext={handleFocusNext}
        onFocusPrev={handleFocusPrev}
      />
      <Popover triggerRef={triggerRef}>
        <VirtualList id={listboxId} aria-labelledby={idSeed('input')} size={items.length}>
          {(index) => {
            const item = items[index];

            return React.cloneElement(item, {
              id: createOptionId(item.props.value),
              onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                setFilterText(item.props.value);
                setValue(item.props.value);
                close();

                item.props.onClick?.(e);
              },
            });
          }}
        </VirtualList>
      </Popover>
    </>
  );
};

const ComboBox: React.FC<Props> & { Item: typeof Item } = (props) => {
  return (
    <OpenStateProvider>
      <Provider>
        <ComboBoxInner {...props} />
      </Provider>
    </OpenStateProvider>
  );
};

ComboBox.Item = Item;

export default ComboBox;
