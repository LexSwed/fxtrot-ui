import * as FxtrotUI from '@fxtrot/ui';
import { Box, Icon, ToggleButton } from '@fxtrot/ui';
import { SelectorIcon } from '@heroicons/react/outline';
import { Root, Content, Trigger } from '@radix-ui/react-collapsible';
import type { Language } from 'prism-react-renderer';
import nightOwl from 'prism-react-renderer/themes/nightOwl';

import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

type Props = {
  code: string;
  language: string;
};

export const Playground = ({ code, language }: Props) => {
  return (
    <LiveProvider theme={nightOwl} scope={FxtrotUI} code={`${code}`} language={language as Language}>
      <Box boxShadow="$base" br="$base">
        <Root>
          <LivePreview
            // @ts-expect-error
            Component={Preview}
          />
          <Content asChild>
            <Box css={{ borderBottomLeftRadius: '$base', borderBottomRightRadius: '$base', overflow: 'hidden' }}>
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
    <Box position="relative" p="$4" pb="$8" bc="$surface">
      {children}
      <Box position="absolute" bottom="$2" right="$2">
        <Trigger asChild>
          <ToggleButton size="xs" gap="0" css={{ borderColor: '$border--light' }}>
            <Icon as={SelectorIcon} />
            Open code
          </ToggleButton>
        </Trigger>
      </Box>
    </Box>
  );
};
