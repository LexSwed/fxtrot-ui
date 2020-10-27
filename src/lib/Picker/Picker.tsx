import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Popover from '../Popover';
import { useId } from '../utils';
import { OpenStateProvider } from '../utils/OpenStateProvider';
import List from './List';
import Item from './Item';
import Trigger from './Trigger';
import { PickerProvider } from './utils';

type Props = React.ComponentProps<typeof Trigger> & {
  value?: string;
  onChange?: (newValue: string) => void;
  children: React.ElementType<typeof Item>[] | React.ElementType<typeof Item>;
};

const Picker: React.FC<Props> & {
  Item: typeof Item;
} = ({ children, id, value, onChange, ...triggerProps }) => {
  const [innerValue, onChangeInner] = useValue(value, onChange);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const triggerId = useId();
  const title = useTitle({ children, value: innerValue });

  const contextValue = useMemo(
    () => ({
      value: innerValue,
      triggerRef,
      onChange: onChangeInner,
    }),
    [onChangeInner, innerValue]
  );

  return (
    <OpenStateProvider>
      <PickerProvider value={contextValue}>
        <Trigger id={triggerId} {...triggerProps}>
          {title}
        </Trigger>
        <Popover triggerRef={triggerRef}>
          <List triggerId={triggerId}>{children}</List>
        </Popover>
      </PickerProvider>
    </OpenStateProvider>
  );
};

Picker.Item = Item;

Picker.propTypes = {
  children: (props, propName, componentName) => {
    if (props[propName]?.some?.((el: React.ReactNode) => !isOption(el))) {
      return new Error(
        `Invalid child supplied to ${componentName}. ${componentName} only accepts ${Item.displayName} as children`
      );
    }
    return null;
  },
};

export default Picker;

function isOption(el: React.ReactNode): el is React.ReactElement<React.ComponentProps<typeof Item>> {
  return React.isValidElement(el) && el.type === Item;
}

function useTitle({ children, value }: { children: Props['children']; value?: string }) {
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    if (!value) return;
    let label = null;
    React.Children.forEach(children, (el) => {
      if (el.props.value === value) {
        label = el.props.label;
      }
    });
    if (label) {
      setTitle(label);
    }
  }, [value, children]);

  return title;
}

function useValue(propValue: Props['value'], propOnChange: Props['onChange']) {
  const [value, setValue] = useState(propValue);

  const onChange = useCallback(
    (newValue: string) => {
      // we expect `propOnChange` to change also `value` prop, so useEffect would update internal value
      if (typeof propOnChange === 'function') {
        propOnChange?.(newValue);
      } else {
        setValue(newValue);
      }
    },
    [propOnChange]
  );

  useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  return [value, onChange] as const;
}
