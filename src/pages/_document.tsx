import React from 'react';
import { stitchesConfig } from '@fxtrot/ui';
import Document, { Html, Head, Main, NextScript } from 'next/document';

const getCssAndReset = () => {
  const css = stitchesConfig.getCssText();
  stitchesConfig.reset();
  return css;
};

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Fira+Code&display=optional"
            rel="stylesheet"
            key="google-font-Fira"
          />
          <style id="fxtrot-ui" dangerouslySetInnerHTML={{ __html: getCssAndReset() }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
