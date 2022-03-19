import React from 'react';
import type { AppProps } from 'next/dist/shared/lib/router/router';

import { MdxProvider } from 'src/pages-helpers/MdxProvider';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <MdxProvider>
      <Component {...pageProps} />
    </MdxProvider>
  );
}
