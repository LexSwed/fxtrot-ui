import NextDocument, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { stitchesConfig } from 'src/lib/stitches.config';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link href="https://fonts.googleapis.com/css?family=Fira+Code" rel="stylesheet" key="google-font-Fira" />
          <style id="stitches" dangerouslySetInnerHTML={{ __html: stitchesConfig.getCssString() }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
