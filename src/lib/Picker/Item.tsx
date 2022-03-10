import React from 'react';
import { CheckIcon } from '@heroicons/react/solid';
import * as RdxSelect from '@radix-ui/react-select';

import { Icon } from '../Icon/Icon';
import { StyledItem, ItemProps } from '../Item/Item';

export interface OptionType extends React.ReactElement<ItemProps, typeof Item> {}

const Item = React.forwardRef<HTMLDivElement, ItemProps>(({ value, label, disabled, ...props }, ref) => {
  return (
    <RdxSelect.Item value={value} disabled={disabled} textValue={label} asChild>
      <StyledItem {...props} main="space-between" ref={ref}>
        <RdxSelect.ItemText>{label}</RdxSelect.ItemText>
        {value && (
          <RdxSelect.ItemIndicator asChild>
            <Icon as={CheckIcon} color="$primaryStill" size="md" />
          </RdxSelect.ItemIndicator>
        )}
      </StyledItem>
    </RdxSelect.Item>
  );
});

Item.displayName = 'PickerItem';

export default Item;
