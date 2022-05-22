import React from 'react';
import { Icon, IconButton, useCopyToClipboard } from '@fxtrot/ui';
import { CheckIcon, ClipboardCopyIcon } from '@heroicons/react/outline';

type Props = { text: string; color: string; label?: string };

export const CopyButton = ({ text, color, label = 'Copy code' }: Props) => {
  const [copied, copy] = useCopyToClipboard();
  return (
    <IconButton label={label} onClick={() => copy(text)} variant="flat" size="sm">
      <Icon color={color} size="md" as={copied ? CheckIcon : ClipboardCopyIcon} />
    </IconButton>
  );
};
