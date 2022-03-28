import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Column, Section, MenuList } from '@fxtrot/ui';

type DocEntry = { section: string; title?: string; href: string };

type Props = {
  docs: DocEntry[];
};

export const SideNav = ({ docs }: Props) => {
  const groupped = docs.reduce<{ [section: string]: DocEntry[] }>(
    (res, item) => {
      res[item.section].push(item);
      return res;
    },
    {
      '': [],
      'Components': [],
      'Patterns': [],
    }
  );
  return (
    <Column gap="12">
      <MenuList>
        {Object.entries(groupped).map(([section, links]) => {
          if (!section) {
            return <LinksList links={links} key="index routes" />;
          }
          return (
            <Section title={section} gap="3" key={section}>
              <LinksList links={links} />
            </Section>
          );
        })}
      </MenuList>
    </Column>
  );
};

const LinksList = ({ links }: { links: DocEntry[] }) => {
  const router = useRouter();
  return (
    <>
      {links.map((item) => {
        return (
          <Link href={item.href} passHref key={item.title}>
            <MenuList.Item as="a" aria-selected={item.href === router.pathname}>
              {item.title}
            </MenuList.Item>
          </Link>
        );
      })}
    </>
  );
};
