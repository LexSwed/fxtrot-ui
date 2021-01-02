import NextDocument, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { css } from 'src/lib/stitches.config';

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;

    try {
      let extractedStyles: any[] = [];
      ctx.renderPage = () => {
        const { styles, result } = css.getStyles(originalRenderPage);
        extractedStyles = styles;
        return result;
      };

      const initialProps = await NextDocument.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}

            {extractedStyles?.map((content, index) => (
              <style key={index} dangerouslySetInnerHTML={{ __html: content }} />
            ))}
          </>
        ),
      };
    } finally {
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
