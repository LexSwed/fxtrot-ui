import React from 'react';
import ListItem from '../ListItem';
import { styled } from '../stitches.config';

const MenuItem = styled(ListItem, {
  'position': 'relative',
  'textDecoration': 'none',
  'color': 'inherit',
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

type Props = React.ComponentProps<typeof MenuItem> & {
  selected?: boolean;
};

const Item = React.forwardRef<HTMLLIElement, Props>(({ selected, ...props }, ref) => {
  return <MenuItem {...props} role="treeitem" aria-selected={selected} tabIndex={selected ? 0 : -1} ref={ref} />;
});

export default Item;