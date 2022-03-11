import React from 'react';
import * as RovingFocusGroup from '@radix-ui/react-roving-focus';

import { styled } from '../stitches.config';
import { useAllHandlers, useKeyboardHandles } from '../utils/hooks';
import { ListItem } from '../shared/ListItem';

interface Props extends React.ComponentProps<typeof StyledItem> {}

export const Item = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const onKeyDown = useKeyboardHandles({
    'Enter': (e) => e.currentTarget.click?.(),
    ' ': (e) => e.currentTarget.click?.(),
  });
  const handleKeyDown = useAllHandlers(props.onKeyDown, onKeyDown);

  return (
    <RovingFocusGroup.Item asChild focusable={!props.disabled} active={props['aria-selected'] === true}>
      <StyledItem {...props} aria-disabled={props.disabled} role="treeitem" onKeyDown={handleKeyDown} ref={ref} />
    </RovingFocusGroup.Item>
  );
});

Item.displayName = 'MenuListItem';

export const StyledItem = styled('button', ListItem, {
  'display': 'block',
  'position': 'relative',
  'textDecoration': 'none',
  'cursor': 'default',
  '&[aria-selected="true"]': {
    'bc': '$shape--hover',
    'color': '$text-accent',
    '&::after': {
      bc: '$shape-accent',
    },
    '&:focus': {
      'color': '$text-accent',
      '&:after': {
        transform: 'none',
        bc: '$shape-accent--active',
      },
    },
  },
  '&[aria-selected="false"]': {
    '&::after': {
      bc: 'transparent',
    },
  },
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
});
