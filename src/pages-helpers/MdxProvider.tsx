import * as React from 'react';
import { MDXProvider } from '@mdx-js/react';
import Image from 'next/image';
import * as FxtrotUI from '@fxtrot/ui';
import { BsTypeBold, BsTypeItalic, BsTypeUnderline } from 'react-icons/bs';
import * as Icons from '@heroicons/react/24/outline';

import { Heading, styled, Text, TextLink } from '@fxtrot/ui';

import * as helpers from '../pages-helpers';
import { MainLayout } from './MainLayout';
import { Code } from './Code';
import { Playground } from './Playground';
import Link from 'next/link';
import { MultilineCode } from '../pages-helpers/MultilineCode';
import { Li, Ul } from './List';

const Pre: React.FC<{ preview: boolean; children?: React.ReactNode }> = ({ children, preview = false }) => {
  if (!(React.Children.only(children) && React.isValidElement<{ children: string; className?: string }>(children))) {
    return null;
  }
  const code = children.props.children.trim();
  const language = children.props.className?.replace('language-', '') || '';
  if (preview) {
    return <Playground code={code} language={language} />;
  }
  return <MultilineCode code={code} language={language} />;
};

const HeadingWithAnchor = styled(Heading, {
  'scrollMarginBlockStart': 100,
  '& > a': {
    'opacity': 0,
    'transition': '0.3s ease-in-out',
    'color': '$onSurfaceVariant',
    'textDecoration': 'none',
    'fontSize': '0.8em',
    '@untilDesktop': {
      opacity: 1,
      fontSize: '0.8em',
    },
  },
  '&:hover > a': {
    opacity: 1,
  },
});
const AnchoredHeading = ({ id, children, ...props }: any) => {
  return (
    <HeadingWithAnchor {...props} id={id}>
      {children}{' '}
      {id && (
        <Link href={`#${id}`} replace scroll={false}>
          <Heading level={props.level}>#</Heading>
        </Link>
      )}
    </HeadingWithAnchor>
  );
};

export const components = {
  React,
  ...helpers,
  ...FxtrotUI,
  ...Icons,
  // used by ActionGroup docs
  BsTypeBold,
  BsTypeItalic,
  BsTypeUnderline,
  a: ({ href, ...props }: any) => {
    if (href.startsWith('/')) {
      return (
        <Link href={href} passHref legacyBehavior>
          <TextLink {...props} />
        </Link>
      );
    }
    return <TextLink href={href} external="icon" {...props} />;
  },
  img: (props: any) => <Image alt={props.alt} layout="responsive" {...props} />,
  h1: (props: any) => <AnchoredHeading {...props} level="1" />,
  h2: (props: any) => <AnchoredHeading {...props} as="h2" level="2" />,
  h3: (props: any) => <Heading {...props} as="h3" level="3" />,
  h4: (props: any) => <Heading {...props} as="h4" level="4" />,
  h5: (props: any) => <Heading {...props} as="h5" level="5" />,
  h6: (props: any) => <Heading {...props} as="h6" level="6" />,
  p: (props: any) => <Text {...props} css={{ mt: '$3', mb: '$4' }} as="p" />,
  aside: (props: any) => <Text {...props} tone="light" css={{ my: '$4' }} />,
  code: Code,
  pre: Pre,
  strong: (props: any) => <Text {...props} as="strong" />,
  wrapper: (props: any) => {
    return <MainLayout {...props} />;
  },
  li: (props: any) => <Li {...props} />,
  ul: (props: any) => <Ul {...props} />,
};

export const MdxProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <MDXProvider components={components as any}>{children}</MDXProvider>;
};
