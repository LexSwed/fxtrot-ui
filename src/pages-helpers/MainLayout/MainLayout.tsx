import Link from 'next/link';
import Head from 'next/head';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Icon, Row, TextLink, Dialog, Column, Button } from '@fxtrot/ui';
import type React from 'react';
import { SideNav } from './SideNav';

import styles from './styles.module.css';

type Props = {
  meta: { title: string };
  docs: React.ComponentProps<typeof SideNav>['docs'];
  children?: React.ReactNode;
};

export const MainLayout: React.FC<Props> = ({ children, meta, docs }) => {
  return (
    <>
      <Head>
        <title>{[meta.title, 'Fxtrot UI'].join(' | ')}</title>
        <meta name="keywords" content="react, fxtrot, components, component library, design system" />
      </Head>
      <div className="relative max-w-screen-lg pb-8 mx-auto">
        <main className={styles.main}>
          <header className={styles.header}>
            <Row gap="md" cross="center">
              <div className={styles['mobile-menu-button-wrapper']}>
                <Dialog>
                  <Button label="Menu" variant="flat">
                    <Icon as={Bars3Icon} size="lg" />
                  </Button>
                  {() => (
                    <Dialog.Modal placement="side">
                      <Column gap="md">
                        <Dialog.Title>Menu</Dialog.Title>
                        <SideNav docs={docs} />
                      </Column>
                    </Dialog.Modal>
                  )}
                </Dialog>
              </div>
              <Row main="space-between" className="flex-1">
                <Link href="/" passHref legacyBehavior>
                  <TextLink inline={false} textStyle="title-sm" tone="neutral">
                    Fxtrot UI
                  </TextLink>
                </Link>
                <TextLink
                  href="https://github.com/LexSwed/fxtrot-ui"
                  external
                  tone="neutral"
                  title="Open the source on GitHub"
                  inline={false}
                >
                  <Icon as={GitHubIcon} size="sm" />
                </TextLink>
              </Row>
            </Row>
          </header>
          <aside className={styles['nav-panel']}>
            <SideNav docs={docs} />
          </aside>
          <section className={styles.content}>{children}</section>
        </main>
      </div>
    </>
  );
};

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);
