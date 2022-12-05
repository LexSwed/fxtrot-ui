import { NextSeo } from 'next-seo';
import { Column, Heading, Icon, IconButton, LinkButton, Row, styled, Text, TextLink } from '@fxtrot/ui';
import Link from 'next/link';
import { BsGithub } from 'react-icons/bs';

const App = () => {
  return (
    <>
      <NextSeo title="Fxtrot UI" description="A component library for React projects." />
      <Wrapper>
        <div className="py-8">
          <Row as="header" main="space-between" cross="center">
            <Heading as="h1" level="2">
              Fxtrot
            </Heading>
            <a href="https://github.com/LexSwed/fxtrot-ui" target="_blank" rel="noreferrer">
              <IconButton aria-label="Source code" variant="flat">
                <Icon as={BsGithub} size="2xl" />
              </IconButton>
            </a>
          </Row>
        </div>
        <div className="grid h-full place-items-center p-8">
          <Column className="gap-16" cross="center">
            <Column className="gap-14" cross="center">
              <Heading as="h1" level="4">
                React component library for Fxtrot project
              </Heading>
              <Link href="/installation" passHref legacyBehavior>
                <LinkButton variant="primary" size="lg">
                  Documentation
                </LinkButton>
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
        </div>
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
