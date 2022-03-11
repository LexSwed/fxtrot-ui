import React from 'react';
import { DokzProvider, GithubLink } from 'dokz';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from '@fxtrot/ui';
import type { AppProps } from 'next/dist/shared/lib/router/router';

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
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </DokzProvider>
    </ChakraProvider>
  );
}
