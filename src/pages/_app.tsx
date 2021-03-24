import React from 'react';
import { DokzProvider, GithubLink } from 'dokz';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/dist/next-server/lib/router/router';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <ChakraProvider resetCSS>
      <DokzProvider
        headerItems={[<GithubLink key="0" url="https://github.com/LexSwed/fxtrot-ui" />]}
        sidebarOrdering={{
          'index.mdx': true,
        }}
        docsRootPath="pages"
        githubUrl="LexSwed/fxtrot-ui"
        branch="master"
        headerLogo="Fxtrot UI"
      >
        <Component {...pageProps} />
      </DokzProvider>
    </ChakraProvider>
  );
}
