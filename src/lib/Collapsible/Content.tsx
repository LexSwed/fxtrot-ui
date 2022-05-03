import React from 'react';
import * as Rdx from '@radix-ui/react-collapsible';

import { keyframes, styled } from '../stitches.config';
import type { CssStyles } from '../stitches.config';

interface ContentProps extends React.ComponentProps<'div'> {
  css?: CssStyles;
}
export const Content = React.forwardRef<HTMLDivElement, ContentProps>((props, ref) => {
  return (
    <Rdx.Content asChild>
      <StyledContent {...props} ref={ref} />
    </Rdx.Content>
  );
});

const open = keyframes({
  from: { opacity: 0, transform: 'translateY(-10px)', height: 0 },
  to: { opacity: 1, transform: 'none', height: 'var(--radix-collapsible-content-height)' },
});

const close = keyframes({
  from: { opacity: 1, transform: 'none', height: 'var(--radix-collapsible-content-height)' },
  to: { opacity: 0, transform: 'translateY(-10px)', height: 0 },
});

const StyledContent = styled('div', {
  'overflow': 'hidden',
  'willChange': 'transform, opacity',
  '&[data-state="open"]': { animation: `${open} 300ms ease-out forwards` },
  '&[data-state="closed"]': { animation: `${close} 200ms ease-out forwards` },
  '@no-motion': {
    animationDuration: '0s',
  },
});
