import React, { CSSProperties, useEffect, useMemo, useRef } from 'react';
import { Provider } from 'jotai';
import { useUIDSeed } from 'react-uid';
import { useVirtual } from 'react-virtual';

import { OpenStateProvider, useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';

import Input, { Props as InputProps } from './Input';
import Item, { Props as ItemProps } from './Item';
import { useAllHandlers, useForkRef } from '../utils';
import Popover from '../Popover';
import ListBox from '../ListBox';
import { useFilterText, useFocusedItemId, useSyncValue } from './atoms';

interface OptionType extends React.ReactElement<ItemProps, typeof Item> {}
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
  const listRef = useRef<HTMLUListElement>(null);
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
    if (!isOpen) return [];
    if (filterText === '') return React.Children.toArray(children) as OptionType[];

    let filtered: OptionType[] = [];

    React.Children.forEach(children, (item: OptionType) => {
      if (item.props.label.toLowerCase().includes(filterText.toLowerCase())) {
        filtered.push(item);
      }
    });

    return filtered;
  }, [children, filterText, isOpen]);
  const rowVirtualizer = useVirtual({
    size: items.length,
    parentRef: listRef,
    paddingStart: 4,
    paddingEnd: 4,
    overscan: 5,
  });
  const listStyle: CSSProperties = {
    height: `${rowVirtualizer.totalSize}px`,
    width: '100%',
    position: 'relative',
  };

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
    const newIndex = itemIndex ? createNewIndex(itemIndex) : 0;
    setFocusedItemId(createOptionId(items[newIndex]?.props?.value));
    rowVirtualizer.scrollToIndex(newIndex);
  };
  const handleFocusNext = () => {
    handleFocus((index) => (index < rowVirtualizer.totalSize ? index + 1 : 0));
  };
  const handleFocusPrev = () => {
    handleFocus((index) => (index > 0 ? index - 1 : rowVirtualizer.totalSize - 1));
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
        <ListBox role="listbox" id={listboxId} aria-labelledby={idSeed('input')} style={listStyle} ref={listRef}>
          {rowVirtualizer.virtualItems.map(({ index, start, measureRef }) => {
            const item: OptionType = items[index];
            return (
              <div
                key={item.props.value}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${start}px)`,
                }}
                ref={measureRef}
              >
                {React.cloneElement(item, {
                  id: createOptionId(item.props.value),
                  onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                    setFilterText(item.props.value);
                    setValue(item.props.value);
                    close();

                    item.props.onClick?.(e);
                  },
                })}
              </div>
            );
          })}
        </ListBox>
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
