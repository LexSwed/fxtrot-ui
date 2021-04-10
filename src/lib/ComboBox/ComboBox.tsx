import React, { useState, useEffect, useRef } from 'react';
import { useUIDSeed } from 'react-uid';
import flattenChildren from 'react-keyed-flatten-children';

import { OpenStateProvider, useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';

import Input, { Props as InputProps } from './Input';
import Item, { OptionType } from './Item';
import { useAllHandlers, useForkRef, useLatest } from '../utils/hooks';
import Popover from '../Popover/PopoverLayer';
import { StateProvider, useFocusedItemId, useSyncValue } from './atoms';
import VirtualList from './VirtualList';
import { ListBoxContext } from '../ListBox/ListBoxContext';

interface Props
  extends Omit<
    InputProps,
    | 'onChange'
    | 'onSelect'
    | 'value'
    | 'children'
    | 'hasNewBadge'
    | 'onSelect'
    | 'onFocusNext'
    | 'onFocusPrev'
    | 'aria-controls'
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
  const [filterText, setFilterText] = useState('');
  const [focusedItemId, setFocusedItemId] = useFocusedItemId();
  const { close } = useOpenStateControls();
  const scrollToIndexRef = useRef<(index: number) => void>(() => {});

  const allowNewElement = !!onInputChange;
  const listboxId = idSeed('listbox');

  const items = useFilteredItems(children, filterText);

  useUpdateTextWithLabel(value, children, setFilterText, allowNewElement);
  useOnInputChangeSync(onInputChange, filterText);

  const createOptionId = (value: string) => idSeed('option') + value;
  const handleSelect = () => {
    if (focusedItemId) {
      const selected = items.find((item) => createOptionId(item.props.value as string) === focusedItemId);
      if (selected) {
        setFilterText(selected.props.label || '');
        setValue(selected.props.value || null);
      }
    }
    close();
  };
  const handleFocus = (createNewIndex: (oldIndex: number) => number) => {
    const itemIndex = items.findIndex((item) => createOptionId(item.props.value as string) === focusedItemId);
    const newIndex = itemIndex > -1 ? createNewIndex(itemIndex) : 0;
    setFocusedItemId(createOptionId(items[newIndex]?.props?.value as string));
    scrollToIndexRef.current(newIndex);
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
  const handleFilterChange = (text: string) => {
    if (allowNewElement || text === '') {
      setValue(null);
    }
    setFilterText(text);
  };

  return (
    <>
      <Input
        {...textFieldProps}
        aria-controls={isOpen ? listboxId : ''}
        aria-activedescendant={focusedItemId as string}
        inputRef={inputRefs}
        hasNewBadge={allowNewElement && !value && !!filterText}
        value={filterText}
        onChange={handleFilterChange}
        onBlur={handleBlur}
        onSelect={handleSelect}
        onFocusNext={handleFocusNext}
        onFocusPrev={handleFocusPrev}
      />
      <Popover triggerRef={triggerRef}>
        <VirtualList
          id={listboxId}
          aria-labelledby={idSeed('input')}
          scrollToIndexRef={scrollToIndexRef}
          size={items.length}
        >
          {(index) => {
            const item = items[index];

            return React.cloneElement(item, {
              id: createOptionId(item.props.value as string),
              onMouseUp: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                setFilterText(item.props.label);
                setValue(item.props.value as string);
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

const ComboBox: React.FC<Props> = (props) => {
  return (
    <OpenStateProvider>
      <ListBoxContext ListItem={Item}>
        <StateProvider>
          <ComboBoxInner {...props} />
        </StateProvider>
      </ListBoxContext>
    </OpenStateProvider>
  );
};

export default ComboBox;

function useFilteredItems(children: Props['children'], filterText: string) {
  const items = flattenChildren(children) as OptionType[];
  if (filterText === '') return items;

  return items.filter((child) => {
    return child.props.label.toLowerCase().includes(filterText.toLowerCase());
  });
}

function useOnInputChangeSync(onInputChange: Props['onInputChange'], filterText: string) {
  const onInputChangeRef = useLatest(onInputChange);

  useEffect(() => {
    onInputChangeRef.current?.(filterText);
  }, [filterText, onInputChangeRef]);
}

function useUpdateTextWithLabel(
  value: Props['value'],
  children: Props['children'],
  setFilterText: React.Dispatch<React.SetStateAction<string>>,
  allowNewElement: boolean
) {
  useEffect(() => {
    const item = (React.Children.toArray(children) as OptionType[]).find((item) => item.props.value === value);
    setFilterText((text) => item?.props?.label || (allowNewElement ? text : ''));
  }, [value, children, setFilterText, allowNewElement]);
}
