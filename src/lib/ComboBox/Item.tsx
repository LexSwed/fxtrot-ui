import React from 'react';
import { CheckIcon } from '@heroicons/react/solid';

import { Icon, IconBox } from '../Icon/Icon';
import { StyledItem, ItemProps } from '../Item/Item';
import { css } from '../stitches.config';
import { useAllHandlers } from '../utils/hooks';
import { useItemSelected, useItemFocused, useFocusItem } from './atoms';

const ownStyle = css({
  [`& > ${IconBox}`]: {
    color: '$primaryStill',
  },
});

export interface OptionType extends React.ReactElement<ItemProps, typeof Item> {}

export const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ id, value, label, main = 'space-between', className, ...props }, propRef) => {
    const isSelected = useItemSelected(value as string);
    const isFocused = useItemFocused(id as string);

    const updateFocusedItemId = useFocusItem();
    const onMouseOver = useAllHandlers(props.onMouseOver, () => updateFocusedItemId(id as string));
    const preventMouseDown = useAllHandlers(props.onMouseDown, (e) => {
      e.preventDefault();
      e.stopPropagation();
    });

    return (
      <StyledItem
        {...props}
        id={id}
        data-focused={isFocused}
        aria-selected={isSelected}
        onMouseOver={onMouseOver}
        onMouseDown={preventMouseDown}
        main={main}
        ref={propRef}
        className={`${ownStyle} ${className}`}
      >
        {label}
        {isSelected ? <Icon as={CheckIcon} size="md" /> : null}
      </StyledItem>
    );
  }
);

Item.displayName = 'Item';
