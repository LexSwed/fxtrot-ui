import React from 'react';
import { ExternalLinkIcon } from '@heroicons/react/solid';

import { styled } from '../stitches.config';
import { Icon, IconBox } from '../Icon/Icon';
import { Text } from '../Text';

const Link = styled('a', Text, {
  'textDecoration': 'none',
  'boxSizing': 'border-box',
  'cursor': 'pointer',
  'fontWeight': 600,
  '& > span:first-child': {
    'textDecoration': 'underline solid transparent 1px',
    'transition': 'text-decoration 0.1s ease-in',
    '&:hover, &:hover': {
      textDecorationColor: 'currentColor',
    },
  },

  'variants': {
    external: {
      true: {},
      icon: {
        [`& ${IconBox}`]: {
          '& path': {
            stroke: 'currentColor',
          },
        },
      },
    },
  },
});

interface Props extends React.ComponentProps<typeof Link> {
  external?: 'icon' | true;
}

export const TextLink = React.forwardRef<HTMLAnchorElement, Props>(({ external, children, ...props }, ref) => {
  const additionalProps = external ? { target: '_blank', rel: 'noreferrer' } : null;

  return (
    <Link {...additionalProps} external={external} {...props} ref={ref}>
      <span>{children}</span>
      {external === 'icon' ? <Icon size="sm" as={ExternalLinkIcon} /> : null}
    </Link>
  );
});

TextLink.displayName = 'TextLink';
