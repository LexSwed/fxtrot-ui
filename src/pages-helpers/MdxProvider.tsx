import * as React from 'react';
import dynamic from 'next/dynamic';
import { MDXProvider } from '@mdx-js/react';
import Image from 'next/image';
import { Heading, Text } from '@fxtrot/ui';

import * as helpers from '../pages-helpers';
import { MainLayout } from './MainLayout';
import { Code } from './Code';

export const components = {
  ...helpers,
  React,
  img: (props: any) => <Image alt={props.alt} layout="responsive" {...props} />,
  h1: (props: any) => <Heading {...props} level="1" />,
  h2: (props: any) => <Heading {...props} as="h2" level="2" />,
  p: (props: any) => <Text {...props} css={{ mt: '$3', mb: '$4' }} as="p" />,
  aside: (props: any) => <Text {...props} tone="light" css={{ my: '$4' }} />,
  code: Code,
  // @ts-expect-error
  pre: dynamic(() => import('../pages-helpers/MultilineCode').then(({ MultilineCode }) => MultilineCode), {
    ssr: false,
  }),
  strong: (props: any) => <Text {...props} as="b" />,
  wrapper: (props: any) => {
    return <MainLayout {...props} />;
  },
  Playground: () => <div>Hello world</div>,
};

export const MdxProvider: React.FC = ({ children }) => {
  return <MDXProvider components={components as any}>{children}</MDXProvider>;
};
