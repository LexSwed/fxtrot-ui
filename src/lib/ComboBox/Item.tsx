import React from 'react';
import { CheckIcon } from '@heroicons/react/solid';

import { Icon, IconBox } from '../Icon/Icon';
import { styled } from '../stitches.config';
import { useAllHandlers } from '../utils/hooks';
import { useItemSelected, useItemFocused, useFocusItem } from './atoms';
import { ListItem } from '../shared/ListItem';

export interface Props extends React.ComponentProps<typeof ListItem> {
  value: string;
  label?: string;
  disabled?: boolean;
}

export interface OptionType extends React.ReactElement<Props, typeof Item> {}

export const Item = React.forwardRef<HTMLDivElement, Props>(
  ({ id, value, label, main = 'space-between', ...props }, propRef) => {
    const isSelected = useItemSelected(value as string);
    const isFocused = useItemFocused(id as string);

    const updateFocusedItemId = useFocusItem();
    const handlePointerOver = useAllHandlers(props.onPointerOver, () => updateFocusedItemId(id as string));

    return (
      <StyledItem
        role="option"
        disabled={props.disabled}
        tabIndex={props.disabled ? undefined : -1}
        aria-disabled={props.disabled}
        id={id}
        data-focused={isFocused}
        aria-selected={isSelected}
        onPointerOver={handlePointerOver}
        main={main}
        ref={propRef}
        {...props}
      >
        {label}
        {isSelected ? <Icon as={CheckIcon} size="md" /> : null}
      </StyledItem>
    );
  }
);

Item.displayName = 'Item';

const StyledItem = styled(ListItem, {
  [`& > ${IconBox}`]: {
    color: '$primaryStill',
  },
});
