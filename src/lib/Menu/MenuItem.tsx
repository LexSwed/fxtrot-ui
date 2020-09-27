import React from 'react';
import Inline from '../Inline';
import { styled } from '../stitches.config';

const Item = styled(Inline, {
  'px': '$3',
  'fontSize': '$sm',
  'lineHeight': 1,
  'display': 'flex',
  'height': '$8',
  'cursor': 'pointer',
  'br': '$sm',
  '$outline': -2,
  'flex': 'none',
  'minWidth': '100%',

  ':hover': {
    bc: '$surfaceHover',
  },
  ':focus': {
    bc: '$surfaceActive',
  },
  ':active': {
    bc: '$surfaceActive',
  },
});

type Props = React.ComponentProps<typeof Item>;

const MenuItem = React.forwardRef<HTMLLIElement, Props>((props, ref) => {
  return <Item {...props} as="li" tabIndex={-1} role="menuitem" ref={ref} />;
});

export default MenuItem;
