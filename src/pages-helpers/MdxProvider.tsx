import * as React from 'react';
import { MDXProvider } from '@mdx-js/react';
import Image from 'next/image';
import { BsTypeBold, BsTypeItalic, BsTypeUnderline } from 'react-icons/bs';
import * as Icons from '@heroicons/react/24/outline';
import Link from 'next/link';
import { clsx } from 'clsx';
import * as FxtrotUI from '@fxtrot/ui';

import { Heading, Text, TextLink } from '@fxtrot/ui';

import * as helpers from '../pages-helpers';
import { MultilineCode } from '../pages-helpers/MultilineCode';
import { MainLayout } from './MainLayout';
import { Code } from './Code';
import { Playground } from './Playground';

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

const AnchoredHeading = ({ id, children, ...props }: any) => {
  return (
    <Heading className="group/heading [scroll-margin-block-start:100px] " dense={false} {...props} id={id}>
      {children}{' '}
      {id && (
        <Link
          href={`#${id}`}
          replace
          className="text-[0.8em] no-underline transition-opacity duration-300 focus:opacity-100 group-hover/heading:opacity-100 md:opacity-0"
        >
          #
        </Link>
      )}
    </Heading>
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
          <TextLink {...props} inline />
        </Link>
      );
    }
    return <TextLink href={href} external="icon" {...props} />;
  },
  img: (props: any) => <Image alt={props.alt} layout="responsive" {...props} />,
  h1: (props: any) => <AnchoredHeading {...props} dense={false} as="h2" level="1" />,
  h2: (props: any) => <AnchoredHeading {...props} dense={false} as="h3" level="2" />,
  h3: (props: any) => <Heading dense={false} {...props} as="h4" level="3" />,
  h4: (props: any) => <Heading dense={false} {...props} as="h5" level="4" />,
  h5: (props: any) => <Heading dense={false} {...props} as="h6" level="5" />,
  h6: (props: any) => <Heading dense={false} {...props} as="h6" level="6" />,
  p: (props: any) => <Text {...props} className="mt-3 mb-2" as="p" />,
  aside: (props: any) => <Text {...props} tone="light" className="my-4" />,
  code: Code,
  MultilineCode,
  pre: Pre,
  strong: (props: any) => <Text {...props} as="strong" />,
  wrapper: (props: any) => {
    return <MainLayout {...props} />;
  },
  li: (props: any) => <Text as="li" {...props} />,
  ul: (props: any) => (
    <ul {...props} className={clsx('flex list-inside list-disc flex-col flex-nowrap gap-2 pl-4', props.className)} />
  ),
};

export const MdxProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <MDXProvider components={components as any}>{children}</MDXProvider>;
};
