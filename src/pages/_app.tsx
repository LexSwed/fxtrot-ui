import React from 'react';
import type { AppProps } from 'next/dist/shared/lib/router/router';
import { ThemeProvider, Reset } from '@fxtrot/ui';

import { MdxProvider } from 'src/pages-helpers/MdxProvider';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <ThemeProvider>
      <Reset />
      <MdxProvider>
        <Component {...pageProps} />
      </MdxProvider>
    </ThemeProvider>
  );
}
