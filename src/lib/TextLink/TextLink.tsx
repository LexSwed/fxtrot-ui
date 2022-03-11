import React from 'react';
import { ExternalLinkIcon } from '@heroicons/react/outline';

import { styled } from '../stitches.config';
import { Icon, IconBox } from '../Icon/Icon';
import { Text } from '../Text';

const Link = styled('a', Text, {
  'color': '$text-accent',
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
        position: 'relative',
        [`& ${IconBox}`]: {
          'position': 'absolute',
          'top': '50%',
          'transform': 'translateY(-50%)',
          '& path': {
            stroke: '$text-accent',
          },
        },
        pr: '$5',
      },
    },
  },
});

interface Props extends React.ComponentProps<typeof Link> {
  external?: 'icon' | true;
}

export const TextLink = React.forwardRef<HTMLAnchorElement, Props>(({ external, children, ...props }, ref) => {
  const additionalProps = external ? { target: '_blank', rel: 'noopener' } : null;

  return (
    <Link {...additionalProps} external={external} {...props} ref={ref}>
      <span>{children}</span>
      {external === 'icon' ? <Icon size="md" as={ExternalLinkIcon} /> : null}
    </Link>
  );
});

TextLink.displayName = 'TextLink';
