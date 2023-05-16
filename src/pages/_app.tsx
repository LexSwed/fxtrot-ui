import './globals.css';
import localFont from 'next/font/local';

import { NextSeo } from 'next-seo';
import { lazy } from 'react';
import { ThemeProvider } from '@fxtrot/ui';

import type { AppProps } from 'next/dist/shared/lib/router/router';

const MdxProvider = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "MDXProvider" */
      'src/pages-helpers/MdxProvider'
    )
);

const Inter = localFont({
  src: '../../public/fonts/Inter-VariableFont_slnt,wght.ttf',
  fallback: ['-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, sans-serif'],
  weight: 'variable',
  variable: '--fxtrot-fontFamily-sans',
});
const FiraCode = localFont({
  src: '../../public/fonts/FiraCode-VariableFont_wght.ttf',
  fallback: ['Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace'],
  weight: 'variable',
  variable: '--fxtrot-fontFamily-mono',
});

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
      <ThemeProvider theme={{ fontFamily: { sans: Inter.style.fontFamily, mono: FiraCode.style.fontFamily } }}>
        <MdxProvider>
          <Component {...pageProps} />
        </MdxProvider>
      </ThemeProvider>
    </>
  );
}
