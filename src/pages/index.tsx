import React from 'react';
import { NextSeo } from 'next-seo';
import { Box, Column, Heading, Icon, IconButton, LinkButton, Row, styled, Text, TextLink } from '@fxtrot/ui';
import Link from 'next/link';

import { BsGithub } from 'react-icons/bs';

const App = () => {
  return (
    <>
      <NextSeo title="Fxtrot UI" description="A component library for React projects." />
      <Wrapper>
        <Box py="$8">
          <Row as="header" main="space-between" cross="center">
            <Heading as="h1" level="2">
              Fxtrot
            </Heading>
            <a href="https://github.com/LexSwed/fxtrot-ui" target="_blank" rel="noreferrer">
              <IconButton label="Source code" variant="flat">
                <Icon as={BsGithub} size="lg" />
              </IconButton>
            </a>
          </Row>
        </Box>
        <Box
          height="100%"
          p="$8"
          css={{
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <Column gap="12" cross="center">
            <Column gap="4" cross="center">
              <Heading as="h1" level="5">
                React component library for Fxtrot projects
              </Heading>
              <Link href="/installation" passHref>
                <LinkButton variant="primary">Documentation</LinkButton>
              </Link>
            </Column>
            <Text>
              Built with{' '}
              <TextLink href="https://stitches.dev/" external="icon">
                Stitches
              </TextLink>
              ,{' '}
              <TextLink href="https://www.radix-ui.com/" external="icon">
                Radix
              </TextLink>{' '}
              and{' '}
              <TextLink href="https://heroicons.com/" external="icon">
                Heroicons
              </TextLink>
            </Text>
          </Column>
        </Box>
      </Wrapper>
    </>
  );
};

export default App;

const Wrapper = styled('div', {
  'px': '$4',
  'pb': '$16',
  'height': '100vh',
  'display': 'flex',
  'flexFlow': 'column nowrap',
  'maxWidth': '1280px',
  'm': '0 auto',
  '@desktop': {
    px: '$16',
  },
});
