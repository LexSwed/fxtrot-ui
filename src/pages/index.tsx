import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { BsGithub } from 'react-icons/bs';
import { Column, Heading, Icon, LinkButton, Row, Text, TextLink } from '@fxtrot/ui';

const App = () => {
  return (
    <>
      <NextSeo title="Fxtrot UI" description="A component library for React projects." />
      <div className="flex h-[100lvh] max-w-7xl flex-col px-4 pb-16 mx-auto lg:px-16">
        <div className="py-8">
          <Row as="header" main="space-between" cross="center">
            <Heading as="h1" level="2">
              Fxtrot
            </Heading>
            <LinkButton
              href="https://github.com/LexSwed/fxtrot-ui"
              target="_blank"
              rel="noreferrer"
              label="Source code"
              variant="flat"
            >
              <Icon as={BsGithub} size="2xl" />
            </LinkButton>
          </Row>
        </div>
        <div className="grid h-full place-items-center p-8">
          <Column className="gap-16" cross="center">
            <Column className="gap-14" cross="center">
              <Heading as="h1" level="3">
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
      </div>
    </>
  );
};

export default App;
