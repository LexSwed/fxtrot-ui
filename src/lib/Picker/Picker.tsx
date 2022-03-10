import React from 'react';
import * as RdxSelect from '@radix-ui/react-select';

import type { OptionType } from './Item';
import { PickerTrigger, PickerTriggerProps } from './Trigger';
import Item from './Item';
import { styled } from '../stitches.config';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/outline';
import { Icon } from '../Icon';

interface Props extends Omit<PickerTriggerProps, 'value' | 'onChange' | 'defaultValue' | 'children' | 'size'> {
  value?: string;
  defaultValue?: string;
  onChange?: (newValue: string) => void;
  size?: PickerTriggerProps['size'];
  children: OptionType[] | OptionType;
}

export const Picker = ({ children, name, onChange, value, defaultValue = '', ...triggerProps }: Props) => {
  return (
    <RdxSelect.Root value={value} defaultValue={defaultValue} onValueChange={onChange} name={name}>
      <PickerTrigger {...triggerProps} />
      <Content>
        <SelectArrow as={RdxSelect.SelectScrollUpButton}>
          <Icon as={ChevronUpIcon} size="sm" />
        </SelectArrow>
        <Viewport>
          {defaultValue === '' ? <EmptyItem value="" size="sm" label="" /> : null}
          {children}
        </Viewport>
        <SelectArrow as={RdxSelect.SelectScrollDownButton}>
          <Icon as={ChevronDownIcon} size="sm" />
        </SelectArrow>
      </Content>
    </RdxSelect.Root>
  );
};

Picker.Item = Item;

const EmptyItem = styled(Item, {
  height: '$4 !important',
});

const Content = styled(RdxSelect.Content, {
  bc: '$surfaceStill',
  br: '$md',
  outline: 'none',
  boxShadow: '$popper',
});

const Viewport = styled(RdxSelect.Viewport, {
  p: '$1',
  focusRing: '$focusRing',
});

const SelectArrow = styled('div', {
  py: '$1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
