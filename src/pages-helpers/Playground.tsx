import { Box, Icon, ToggleButton } from '@fxtrot/ui';
import { SelectorIcon } from '@heroicons/react/outline';
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
      <Box boxShadow="$popper" br="$base">
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

const Preview: React.FC = ({ children }) => {
  return (
    <Box position="relative" p="$4" pb="$12" bc="$surface" br="$base">
      {children}
      <Box position="absolute" bottom="$2" right="$2">
        <Trigger asChild>
          <ToggleButton size="xs" gap="0" css={{ borderColor: '$border--light' }}>
            <Icon as={SelectorIcon} />
            Show code
          </ToggleButton>
        </Trigger>
      </Box>
    </Box>
  );
};
