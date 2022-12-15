import './globals.css';

import { NextSeo } from 'next-seo';
import { ThemeProvider } from '@fxtrot/ui';

import { MdxProvider } from 'src/pages-helpers/MdxProvider';
import type { AppProps } from 'next/dist/shared/lib/router/router';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <>
      <NextSeo
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/icons/favicon.ico',
          },
          {
            rel: 'icon',
            href: '/icons/favicon-32x32.png',
            type: 'image/png',
            sizes: '32x32',
          },
          {
            rel: 'icon',
            href: '/icons/favicon-16x16.png',
            type: 'image/png',
            sizes: '16x16',
          },
          {
            rel: 'apple-touch-icon',
            href: '/icons/apple-touch-icon.png',
            sizes: '180x180',
          },
          {
            rel: 'manifest',
            href: '/icons/site.webmanifest',
          },
        ]}
      />
      <ThemeProvider>
        <MdxProvider>
          <Component {...pageProps} />
        </MdxProvider>
      </ThemeProvider>
    </>
  );
}
