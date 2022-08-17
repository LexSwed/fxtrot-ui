import React from 'react';
import { ExternalLinkIcon } from '@heroicons/react/solid';

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
        {external === 'icon' ? <Icon size="md" as={ExternalLinkIcon} /> : null}
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
        'outline': 'inset 0 transparent',

        '@hover': {
          '&:where(:hover, :focus)': {
            bc: '$surfacePrimary2',
            outline: 'inset $sizes$1 $colors$surfacePrimary2',
            $$outlineColor: '$colors$surfacePrimary2',
            textDecorationColor: '$colors$primary',
          },
        },
      },
      false: {
        'textDecoration': 'underline solid transparent 2px',
        '@hover': {
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
          '& path': {
            stroke: 'currentColor',
            strokeWidth: '0.01em',
          },
        },
      },
    },
  },
});
