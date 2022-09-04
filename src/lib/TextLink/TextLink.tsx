import React from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

import { styled } from '../stitches.config';
import { Icon } from '../Icon';
import { Text } from '../Text';

interface Props extends React.ComponentProps<typeof Link> {
  external?: 'icon' | true;
}

const TextLinkRoot = React.forwardRef<HTMLAnchorElement, Props>(
  ({ external, inline = true, children, ...props }, ref) => {
    const additionalProps = external ? { target: '_blank', rel: 'noreferrer' } : null;

    return (
      <Link {...additionalProps} external={external} inline={inline} {...props} ref={ref}>
        {children}
        {external === 'icon' ? <Icon size="sm" as={ArrowTopRightOnSquareIcon} /> : null}
      </Link>
    );
  }
);

TextLinkRoot.displayName = 'TextLink';

export const TextLink = styled(TextLinkRoot, {
  // create new stitches CSS selector
  '&:empty': {},
});

const Link = styled('a', Text, {
  boxSizing: 'border-box',
  cursor: 'pointer',
  fontWeight: 600,
  transition: '0.1s ease-in',

  variants: {
    inline: {
      true: {
        'textDecoration': 'underline solid transparent 2px',
        'outline': 'inset 0px $colors$surfacePrimary2',
        'outlineOffset': 0,

        '@hover': {
          '&:where(:hover, :focus)': {
            bc: '$surfacePrimary2',
            outlineWidth: '$sizes$1',
            textDecorationColor: '$colors$primary',
          },
        },
      },
      false: {
        'transition': 'text-decoration 0.1s ease-in',
        'textDecoration': 'underline solid transparent 2px',
        '@hover': {
          '$outline': 2,
          '&:where(:hover, :focus)': {
            textDecorationColor: '$colors$primary',
          },
        },
      },
    },
    external: {
      true: {},
      icon: {
        [`& > ${Icon}`]: {
          ml: '$1',
        },
      },
    },
  },
});
