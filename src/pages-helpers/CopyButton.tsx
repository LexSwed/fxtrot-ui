import React from 'react';
import { Icon, IconButton, useCopyToClipboard } from '@fxtrot/ui';
import { CheckIcon, ClipboardCopyIcon } from '@heroicons/react/outline';

type Props = { text: string; color: string };

export const CopyButton = ({ text, color }: Props) => {
  const [copied, copy] = useCopyToClipboard();
  return (
    <IconButton aria-label="Copy code" onClick={() => copy(text)} variant="transparent" size="sm">
      <Icon color={color} size="md" as={copied ? CheckIcon : ClipboardCopyIcon} />
    </IconButton>
  );
};
