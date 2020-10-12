import React from 'react';
import Flex from '../Flex';
import Icon from '../Icon';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { styled } from '../stitches.config';
import { textSize, font } from '../theme/variants';

const Link = styled(Flex, {
  'color': '$primaryStill',
  'textDecoration': 'none',
  'boxSizing': 'border-box',
  'cursor': 'pointer',
  'fontWeight': 600,
  ':hover': {
    textDecoration: 'underline',
  },
  ':focus': {
    textDecoration: 'underline',
  },
  ':visited': {
    'color': '$primaryActive',
    '& path': {
      stroke: '$primaryActive',
    },
  },

  '& svg': {
    size: '0.8em',
  },

  '& path': {
    stroke: '$primaryStill',
  },

  'variants': {
    font,
    size: textSize,
  },
});

type AnchorProps = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
type LinkProps = React.ComponentProps<typeof Link>;
type Props = AnchorProps & LinkProps & { external?: boolean };

const TextLink = React.forwardRef<HTMLAnchorElement, Props>(
  ({ font = 'default', size = 'base', external, children, ...props }, ref) => {
    const additionalProps = external ? { target: '_blank', rel: 'noopener' } : null;

    return (
      <Link flow="row" space="$1" as="a" font={font} size={size} {...additionalProps} {...props} ref={ref}>
        {children}
        {external ? <Icon as={HiOutlineExternalLink} /> : null}
      </Link>
    );
  }
);

TextLink.displayName = 'TextLink';

export default TextLink;
