import React from 'react';

import { StyledItem, ItemComponent } from '../Item/Item';
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
  '&[aria-selected="true"]': {
    'bc': '$surfaceActive',
    'color': '$accentLight',
    '&::after': {
      bc: '$accent',
    },
  },
  '&[aria-selected="false"]': {
    '&::after': {
      bc: 'transparent',
    },
  },
});

const Item: ItemComponent = React.forwardRef(({ 'aria-selected': selected, className, ...props }, ref) => {
  return (
    <StyledItem
      {...props}
      role="treeitem"
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      ref={ref}
      className={`${style.className} ${className}`}
    />
  );
});

export default Item;
