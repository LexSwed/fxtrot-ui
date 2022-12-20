import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { BsGithub } from 'react-icons/bs';
import { Column, Heading, Icon, LinkButton, Row, TextLink } from '@fxtrot/ui';

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
          <Column className="gap-24" cross="center">
            <Column className="gap-14" cross="center">
              <Heading as="h1" level="2">
                Fxtrot React component library
              </Heading>
              <Link href="/installation" passHref legacyBehavior>
                <LinkButton variant="primary" size="lg">
                  Documentation
                </LinkButton>
              </Link>
            </Column>
            <Row gap="sm" wrap="wrap" as="ul">
              <li className="w-[16rem] rounded-md bg-primary/5 p-4">
                SSR and Server Components compatible, works with{' '}
                <TextLink href="https://remix.run/" external="icon">
                  Remix
                </TextLink>{' '}
                and{' '}
                <TextLink href="https://nextjs.org/" external="icon">
                  Next.js
                </TextLink>
              </li>
              <li className="w-[16rem] rounded-md bg-primary/5 p-4">
                Fully typed – autocomplete support for properties with TypeScript
              </li>
              <li className="w-[16rem] rounded-md bg-primary/5 p-4">
                RTL support through extensive usage of{' '}
                <TextLink
                  href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties"
                  external="icon"
                >
                  CSS Logical Properties
                </TextLink>
              </li>
              <li className="w-[16rem] rounded-md bg-primary/5 p-4">
                Satisfying accessibility provided by{' '}
                <TextLink href="https://www.radix-ui.com/" external="icon">
                  Radix
                </TextLink>
              </li>
              <li className="w-[16rem] rounded-md bg-primary/5 p-4">
                Customizable{' '}
                <Link href="/theming" passHref legacyBehavior>
                  <TextLink inline={false}>theming with great Tailwind defaults</TextLink>
                </Link>
              </li>
              <li className="w-[16rem] rounded-md bg-primary/5 p-4">
                Overridable styles, with{' '}
                <TextLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/@layer" external="icon">
                  CSS Cascade Layers
                </TextLink>
              </li>
            </Row>
          </Column>
        </div>
      </div>
    </>
  );
};

export default App;
