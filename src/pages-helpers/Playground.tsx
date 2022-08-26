import type React from 'react';
import { Box, Column, Icon, ToggleButton } from '@fxtrot/ui';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { Root, Content, Trigger } from '@radix-ui/react-collapsible';
import type { Language } from 'prism-react-renderer';
import vsLight from 'prism-react-renderer/themes/vsLight';

import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { components } from './MdxProvider';

type Props = {
  code: string;
  language: string;
};

export const Playground = ({ code, language }: Props) => {
  return (
    <LiveProvider theme={vsLight} scope={components} code={`${code}`} language={language as Language}>
      <Box boxShadow="$popper" br="$base" mt="$4" mb="$6">
        <Root>
          <LivePreview
            // @ts-expect-error
            Component={Preview}
          />
          <Content asChild>
            <Box
              css={{
                'borderTop': '1px solid $border--light',
                '& *': {
                  borderBottomLeftRadius: '$base',
                  borderBottomRightRadius: '$base',
                },
                '& textarea': {
                  'outline': 'none',
                  'transition': '0.24s ease-in-out',
                  '&:focus': {
                    boxShadow: `0 0 0 2px inset $colors$border-accent`,
                  },
                },
              }}
            >
              <LiveEditor />
            </Box>
          </Content>
          <LiveError />
        </Root>
      </Box>
    </LiveProvider>
  );
};

const Preview: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box bc="$background" br="$base">
      <Column>
        <Box overflow="auto" p="$4">
          {children}
        </Box>
        <Trigger asChild>
          <ToggleButton size="sm" gap="0" css={{ m: '$2' }}>
            <Icon as={ChevronUpDownIcon} size="lg" />
            Show code
          </ToggleButton>
        </Trigger>
      </Column>
    </Box>
  );
};
