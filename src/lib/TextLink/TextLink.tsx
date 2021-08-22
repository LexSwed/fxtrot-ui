import React from 'react';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import type { VariantProps } from '@stitches/react';
import type * as Polymorphic from '@radix-ui/react-polymorphic';

import { styled } from '../stitches.config';
import { Icon, IconBox } from '../Icon/Icon';
import { Text } from '../Text';
import type { CssStyles } from '../utils/types';

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

interface Props extends VariantProps<typeof Link> {
  external?: 'icon' | true;
  css?: CssStyles;
  children?: React.ReactNode;
}

export const TextLink = React.forwardRef(
  ({ external, children, ...props }: React.ComponentProps<TextLinkComponent>, ref) => {
    const additionalProps = external ? { target: '_blank', rel: 'noopener' } : null;

    return (
      <Link as="a" {...additionalProps} {...props} ref={ref}>
        {children}
        {external === 'icon' ? <Icon size="md" as={ExternalLinkIcon} /> : null}
      </Link>
    );
  }
) as TextLinkComponent;

type TextLinkComponent = Polymorphic.ForwardRefComponent<'a', Props>;

TextLink.displayName = 'TextLink';
