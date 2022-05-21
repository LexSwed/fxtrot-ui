import React from 'react';
import { ExternalLinkIcon } from '@heroicons/react/solid';

import { styled } from '../stitches.config';
import { Icon, IconBox } from '../Icon/Icon';
import { Text } from '../Text';

const Link = styled('a', Text, {
  'boxSizing': 'border-box',
  'cursor': 'pointer',
  'fontWeight': 600,
  'textDecoration': 'underline solid transparent 1px',
  'transition': 'text-decoration 0.1s ease-in',
  '&:where(:hover, :focus)': {
    textDecorationColor: 'currentColor',
  },

  'variants': {
    external: {
      true: {},
      icon: {
        [`& > ${IconBox}`]: {
          '& path': {
            stroke: 'currentColor',
            strokeWidth: '0.01em',
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
      {children}
      {external === 'icon' ? <Icon size="md" as={ExternalLinkIcon} /> : null}
    </Link>
  );
});

TextLink.displayName = 'TextLink';
