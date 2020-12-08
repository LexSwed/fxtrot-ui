import { StitchesProps } from '@stitches/react';
import React from 'react';
import { HiOutlineExternalLink } from 'react-icons/hi';

import { FlexBox, FlexType } from '../Flex';
import Icon from '../Icon';
import { styled } from '../stitches.config';
import { font,textSize } from '../theme/variants';

const Link = styled(FlexBox as FlexType<'a'>, {
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

type Props = StitchesProps<typeof Link> & { external?: boolean };

const TextLink = React.forwardRef<HTMLAnchorElement, Props>(
  (
    { font = 'default', size = 'base', external, children, flow = 'row', main = 'start', space = '$1', ...props },
    ref
  ) => {
    const additionalProps = external ? { target: '_blank', rel: 'noopener' } : null;

    return (
      <Link
        {...additionalProps}
        {...props}
        flow={flow}
        main={main}
        space={space}
        as="a"
        font={font}
        size={size}
        ref={ref as any}
      >
        {children}
        {external ? <Icon as={HiOutlineExternalLink} /> : null}
      </Link>
    );
  }
);

TextLink.displayName = 'TextLink';

export default TextLink;
