import React from 'react';
import { ExternalLinkIcon } from '@heroicons/react/outline';

import Icon, { IconBox } from '../Icon/Icon';
import { styled } from '../stitches.config';
import Text from '../Text/Text';

const Link = styled(Text, {
  'display': 'inline-flex',
  'alignItems': 'center',
  'color': '$primaryStill',
  'textDecoration': 'none',
  'boxSizing': 'border-box',
  'cursor': 'pointer',
  'fontWeight': 600,
  '&:hover': {
    textDecoration: 'underline',
  },
  '&:focus': {
    textDecoration: 'underline',
  },
  '&:visited': {
    'color': '$primaryActive',
    '& path': {
      stroke: '$primaryActive',
    },
  },

  [`& ${IconBox}`]: {
    'display': 'inline-block',
    'ml': '$1',
    '& path': {
      stroke: '$primaryStill',
    },
  },
});

interface Props extends React.ComponentProps<typeof Link> {
  external?: 'icon' | true;
}

const TextLink = React.forwardRef<HTMLAnchorElement, Props>(({ external, children, ...props }, ref) => {
  const additionalProps = external ? { target: '_blank', rel: 'noopener' } : null;

  return (
    <Link {...additionalProps} {...props} as="a" ref={ref as any}>
      {children}
      {external === 'icon' ? <Icon size="md" as={ExternalLinkIcon} /> : null}
    </Link>
  );
});

TextLink.displayName = 'TextLink';

export default TextLink;
