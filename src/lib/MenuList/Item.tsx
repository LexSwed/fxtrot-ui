import React from 'react';

import { StyledItem, ItemProps } from '../Item/Item';
import { css } from '../stitches.config';

const style = css({
  'position': 'relative',
  'textDecoration': 'none',
  'cursor': 'default',
  '&::after': {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    transition: '0.12s ease-in-out',
    transform: 'scaleY(0.75)',
    width: '2px',
    content: `''`,
    bc: 'transparent',
  },
  '&:focus:after': {
    transform: 'none',
  },
  'variants': {
    selected: {
      true: {
        'bc': '$surfaceActive',
        'color': '$accentLight',
        '&::after': {
          bc: '$accent',
        },
      },
      false: {
        '&::after': {
          bc: 'transparent',
        },
      },
    },
  },
});

const Item = React.forwardRef<HTMLDivElement, ItemProps>(({ className, ...props }, ref) => {
  const selected = props['aria-selected'];
  return (
    <StyledItem
      {...props}
      role="treeitem"
      tabIndex={selected ? 0 : -1}
      ref={ref}
      className={`${style({ selected })}${className ? ` ${className}` : ''}`}
    />
  );
});

Item.displayName = 'MenuListItem';

export default Item;
