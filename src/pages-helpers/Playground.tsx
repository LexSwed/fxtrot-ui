import * as React from 'react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { Root, Content, Trigger, CollapsibleTriggerProps } from '@radix-ui/react-collapsible';
import prismTheme from 'prism-react-renderer/themes/github';

import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { Column, Icon, Text, ToggleButton } from '@fxtrot/ui';
import type { Language } from 'prism-react-renderer';
import { components } from './MdxProvider';

type Props = {
  code: string;
  language: string;
  fileName?: string;
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
            <div>
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
          <CodeToggleButton />
        </Trigger>
      </Column>
    </div>
  );
};

const CodeToggleButton = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>((props, ref) => {
  return (
    <ToggleButton size="sm" className="rounded-none p-2" {...props} ref={ref}>
      <Icon as={ChevronUpDownIcon} size="lg" />
      <Text className="w-[80px]" textStyle="label-md">
        {props['aria-expanded'] ? 'Hide code' : 'Show code'}
      </Text>
    </ToggleButton>
  );
});
