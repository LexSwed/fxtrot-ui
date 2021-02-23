import React from 'react';
import { HiOutlineExternalLink } from 'react-icons/hi';

import Icon from '../Icon';
import { styled } from '../stitches.config';
import Text from '../Text/Text';
import { forwardRef, PropsOf } from '../utils/types';

const ExternalIcon = styled(Icon, {});

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

  [`& ${ExternalIcon}`]: {
    'display': 'inline-block',
    'ml': '$1',
    '& path': {
      stroke: '$primaryStill',
    },
  },
});

interface Props extends PropsOf<typeof Link> {
  external?: 'icon' | true;
}

const TextLink = forwardRef<HTMLAnchorElement, Props>(({ external, children, ...props }, ref) => {
  const additionalProps = external ? { target: '_blank', rel: 'noopener' } : null;

  return (
    <Link {...additionalProps} {...props} as="a" ref={ref as any}>
      {children}
      {external === 'icon' ? <ExternalIcon size="md" as={HiOutlineExternalLink} /> : null}
    </Link>
  );
});

TextLink.displayName = 'TextLink';

export default TextLink;
