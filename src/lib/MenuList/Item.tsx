import type { StitchesProps } from '@stitches/react';
import React from 'react';

import ListItem from '../ListItem';
import { focusOnMouseOver } from '../ListItem/ListItem';
import { styled } from '../stitches.config';
import { forwardRef, useAllHandlers } from '../utils';

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

interface Props extends StitchesProps<typeof MenuItem> {
  selected?: boolean;
}

const Item = forwardRef<Props, 'li'>(({ selected, ...props }, ref) => {
  const onMouseEnter = useAllHandlers(props.onMouseEnter, focusOnMouseOver);

  return (
    <MenuItem
      {...props}
      onMouseEnter={onMouseEnter}
      role="treeitem"
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      ref={ref}
    />
  );
});

export default Item;
