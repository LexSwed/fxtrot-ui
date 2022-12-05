import type React from 'react';
import { Column, Icon, ToggleButton } from '@fxtrot/ui';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { Root, Content, Trigger } from '@radix-ui/react-collapsible';
import type { Language } from 'prism-react-renderer';
import prismTheme from 'prism-react-renderer/themes/github';

import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { components } from './MdxProvider';

import styles from './Playground.module.css';

type Props = {
  code: string;
  language: string;
};

export const Playground = ({ code, language }: Props) => {
  return (
    <LiveProvider theme={prismTheme} scope={components} code={`${code}`} language={language as Language}>
      <div className="rounded-md shadow-popper mt-4 mb-6">
        <Root>
          <LivePreview
            // @ts-expect-error
            Component={Preview}
          />
          <Content asChild>
            <div className={styles.editor}>
              <LiveEditor />
            </div>
          </Content>
          <LiveError />
        </Root>
      </div>
    </LiveProvider>
  );
};

const Preview: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="rounded-md bg-surface">
      <Column>
        <div className="overflow-auto p-4">{children}</div>
        <Trigger asChild>
          <ToggleButton size="sm" className="m-2">
            <Icon as={ChevronUpDownIcon} size="lg" />
            Show code
          </ToggleButton>
        </Trigger>
      </Column>
    </div>
  );
};
