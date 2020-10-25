import React from 'react';
import ListItem from '../ListItem';
import { styled } from '../stitches.config';

const MenuItem = styled(ListItem, {
  'position': 'relative',
  '::after': {
    position: 'absolute',
    left: 0,
    top: '$1',
    bottom: '$1',
    width: '2px',
    content: `''`,
    bc: 'transparent',
  },
  'variants': {
    'aria-selected': {
      true: {
        'bc': '$surfaceActive',
        '::after': {
          bc: '$primaryActive',
        },
      },
      false: {
        '::after': {
          bc: 'transparent',
        },
      },
    },
  },
});

type Props = React.ComponentProps<typeof MenuItem> & {
  selected?: boolean;
};

const Item: React.FC<Props> = ({ selected, ...props }) => {
  return <MenuItem {...props} role="treeitem" aria-selected={selected} tabIndex={selected ? 0 : -1} />;
};

export default Item;
