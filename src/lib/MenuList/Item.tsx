import React from 'react';

import ListItem from '../ListItem/ListItem';
import { styled } from '../stitches.config';
import { forwardRef, PropsOf } from '../utils/types';

const MenuItem = styled(ListItem, {
  'position': 'relative',
  'textDecoration': 'none',
  'cursor': 'default',
  '::after': {
    position: 'absolute',
    left: 0,
    top: '$1',
    bottom: '$1',
    width: '2px',
    content: `''`,
    bc: 'transparent',
  },
  '&[aria-selected="true"]': {
    'bc': '$surfaceActive',
    'color': '$accentLight',
    '::after': {
      bc: '$accent',
    },
  },
  '&[aria-selected="false"]': {
    '::after': {
      bc: 'transparent',
    },
  },
});

interface Props extends PropsOf<typeof MenuItem> {
  selected?: boolean;
}

const Item = forwardRef<HTMLLIElement, Props>(({ selected, ...props }, ref) => {
  return (
    <MenuItem
      {...props}
      flow={props.flow}
      role="treeitem"
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      ref={ref}
    />
  );
});

export default Item;
