import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Column, Section, MenuList, Text } from '@fxtrot/ui';

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
      {Object.entries(groupped).map(([section, links]) => {
        if (!section) {
          return <LinksList links={links} key="index routes" />;
        }
        return (
          <Section title={section} gap="4" key={section}>
            <LinksList links={links} />
          </Section>
        );
      })}
    </Column>
  );
};

const LinksList = ({ links }: { links: DocEntry[] }) => {
  const router = useRouter();
  return (
    <MenuList>
      {links.map((item) => {
        return (
          <Link href={item.href} passHref key={item.title}>
            <MenuList.Item as="a" aria-selected={item.href === router.pathname}>
              {item.title}
            </MenuList.Item>
          </Link>
        );
      })}
    </MenuList>
  );
};
