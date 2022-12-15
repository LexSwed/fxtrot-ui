import { CheckIcon } from '@heroicons/react/24/outline';
import * as RdxSelect from '@radix-ui/react-select';
import { type ComponentProps, type ReactElement, forwardRef } from 'react';

import { Icon } from '../icon';
import { ListItem } from '../shared/list-item';

export interface Props extends ComponentProps<typeof ListItem> {
  value: string;
  label?: string;
  disabled?: boolean;
}
export interface OptionType extends ReactElement<Props, typeof Item> {}

const Item = forwardRef<HTMLDivElement, Props>(({ value, label, disabled, ...props }, ref) => {
  return (
    <RdxSelect.Item value={value} disabled={disabled} textValue={label} asChild>
      <ListItem {...props} main="space-between" ref={ref}>
        <RdxSelect.ItemText>{label}</RdxSelect.ItemText>
        <RdxSelect.ItemIndicator asChild>
          <Icon as={CheckIcon} color="primary" size="md" />
        </RdxSelect.ItemIndicator>
      </ListItem>
    </RdxSelect.Item>
  );
});

Item.displayName = 'PickerItem';

export default Item;
