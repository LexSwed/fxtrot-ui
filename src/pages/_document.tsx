import React from 'react';
import { stitchesConfig } from '@fxtrot/ui';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Fira+Code&display=optional"
            rel="stylesheet"
            key="google-font-Fira"
          />
          <style id="fxtrot-ui" dangerouslySetInnerHTML={{ __html: stitchesConfig.getCssText() }} />
          <style id="fxtrot-ui" dangerouslySetInnerHTML={{ __html: `body:not(:empty) { overflow: initial; }` }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
