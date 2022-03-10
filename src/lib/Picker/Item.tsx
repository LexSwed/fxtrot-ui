import React from 'react';
import { CheckIcon } from '@heroicons/react/solid';
import * as RdxSelect from '@radix-ui/react-select';

import { Icon } from '../Icon/Icon';
import { ListItem } from '../shared/ListItem';

export interface Props extends React.ComponentProps<typeof ListItem> {
  value: string;
  label?: string;
  disabled?: boolean;
}
export interface OptionType extends React.ReactElement<Props, typeof Item> {}

const Item = React.forwardRef<HTMLDivElement, Props>(({ value, label, disabled, ...props }, ref) => {
  return (
    <RdxSelect.Item value={value} disabled={disabled} textValue={label} asChild>
      <ListItem {...props} main="space-between" ref={ref}>
        <RdxSelect.ItemText>{label}</RdxSelect.ItemText>
        {value && (
          <RdxSelect.ItemIndicator asChild>
            <Icon as={CheckIcon} color="$primaryStill" size="md" />
          </RdxSelect.ItemIndicator>
        )}
      </ListItem>
    </RdxSelect.Item>
  );
});

Item.displayName = 'PickerItem';

export default Item;
