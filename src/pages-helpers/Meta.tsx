import React from 'react';
import Head from 'next/head';

type Props = {
  title: string;
};

export const Meta = ({ title = 'Fxtrot UI' }: Props) => {
  return (
    <Head>
      <title>{`Fxtrot UI | ${title}`}</title>
      <meta name="keywords" content="react, fxtrot, components, component library, design system" />
    </Head>
  );
};
