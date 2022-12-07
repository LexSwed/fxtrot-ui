import * as RdxSelect from '@radix-ui/react-select';

import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { styled } from '../stitches.config';
import type { OptionType } from './Item';
import { Icon } from '../icon';
import { PopoverBox } from '../Popover/PopoverBox';
import { Portal } from '../Portal';
import Item from './Item';
import { PickerTrigger, PickerTriggerProps } from './Trigger';

interface Props extends Omit<PickerTriggerProps, 'value' | 'onChange' | 'defaultValue' | 'children' | 'size'> {
  value?: string;
  defaultValue?: string;
  onChange?: (newValue: string) => void;
  size?: PickerTriggerProps['size'];
  children: OptionType[] | OptionType;
}

export const Picker = ({ children, name, onChange, value, defaultValue, ...triggerProps }: Props) => {
  return (
    <RdxSelect.Root value={value} defaultValue={defaultValue} onValueChange={onChange} name={name}>
      <PickerTrigger {...triggerProps} />
      <Portal radixPortal={RdxSelect.Portal}>
        <Content>
          <SelectArrow as={RdxSelect.SelectScrollUpButton}>
            <Icon as={ChevronUpIcon} size="sm" />
          </SelectArrow>
          <Viewport css={{ $$itemSize: triggerProps.size }}>{children}</Viewport>
          <SelectArrow as={RdxSelect.SelectScrollDownButton}>
            <Icon as={ChevronDownIcon} size="sm" />
          </SelectArrow>
        </Content>
      </Portal>
    </RdxSelect.Root>
  );
};

Picker.Item = Item;

const Content = styled(RdxSelect.Content, PopoverBox);

const Viewport = styled(RdxSelect.Viewport, {
  $focusRingInset: '$surface5',
});

const SelectArrow = styled('div', {
  py: '$1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
