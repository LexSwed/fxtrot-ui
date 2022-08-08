import React from 'react';
import { ExternalLinkIcon } from '@heroicons/react/solid';

import { styled } from '../stitches.config';
import { Icon, IconBox } from '../Icon/Icon';
import { Text } from '../Text';

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

export const TextLink = React.forwardRef<HTMLAnchorElement, Props>(
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

TextLink.displayName = 'TextLink';
