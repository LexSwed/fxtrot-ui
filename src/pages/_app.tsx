import React from 'react';
import { DokzProvider, GithubLink } from 'dokz';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/dist/next-server/lib/router/router';
import { ThemeProvider } from '@fxtrot/ui';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <ChakraProvider>
      <DokzProvider
        headerItems={[<GithubLink key="0" url="https://github.com/LexSwed/fxtrot-ui" />]}
        sidebarOrdering={{
          'index.mdx': true,
        }}
        docsRootPath="pages"
        githubUrl="LexSwed/fxtrot-ui"
        branch="main"
        headerLogo="Fxtrot UI"
      >
        <ThemeProvider theme="blue">
          <Component {...pageProps} />
        </ThemeProvider>
      </DokzProvider>
    </ChakraProvider>
  );
}
