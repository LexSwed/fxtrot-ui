import React, { useCallback } from 'react';
import Inline from '../Inline';
import { styled } from '../stitches.config';
import { useAllHandlers } from '../utils';
import { useMenuControlState } from './utils';

const Item = styled(Inline, {
  'pr': '$3',
  'pl': '$2',
  'borderLeft': '2px solid transparent',
  'fontSize': '$sm',
  'lineHeight': 1,
  'display': 'flex',
  'height': '$8',
  'cursor': 'pointer',
  'br': '$sm',
  'outline': 'none',

  ':hover': {
    bc: '$surfaceHover',
  },
  ':focus': {
    bc: '$surfaceActive',
    borderLeftColor: '$primaryStill',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  ':active': {
    bc: '$surfaceActive',
    borderLeftColor: '$primaryStill',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});

type Props = React.ComponentProps<typeof Item>;

const MenuItem = React.forwardRef<HTMLLIElement, Props>((props, ref) => {
  const { close } = useMenuControlState();
  const onClick = useAllHandlers(
    props.onClick,
    useCallback(
      (event) => {
        if (event.defaultPrevented) return;
        close();
      },
      [close]
    )
  );

  return <Item {...props} onClick={onClick} as="li" tabIndex={-1} role="menuitem" ref={ref} />;
});

export default MenuItem;
