import { DokzProvider, GithubLink } from 'dokz';
import type { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import React, { Fragment } from 'react';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <Fragment>
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Fira+Code" rel="stylesheet" key="google-font-Fira" />
      </Head>
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
    </Fragment>
  );
}
