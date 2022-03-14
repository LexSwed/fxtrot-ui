import React from 'react';
import { Icon, IconButton, useCopyToClipboard } from '@fxtrot/ui';
import { ClipboardCheckIcon, ClipboardCopyIcon } from '@heroicons/react/outline';

type Props = { text: string; color: string };

export const CopyButton = ({ text, color }: Props) => {
  const [copied, copy] = useCopyToClipboard();
  return (
    <IconButton aria-label="Copy code" onClick={() => copy(text)} variant="transparent" size="sm">
      <Icon color={color} size="lg" as={copied ? ClipboardCheckIcon : ClipboardCopyIcon} />
    </IconButton>
  );
};
