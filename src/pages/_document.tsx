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
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+Display:wght@100;200;300;400;500;600;700;800;900&display=swap"
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
