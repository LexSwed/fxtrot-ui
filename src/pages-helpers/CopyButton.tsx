import type React from 'react';
import { Icon, IconButton, useCopyToClipboard } from '@fxtrot/ui';
import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline';

type Props = { text: string; color: React.ComponentProps<typeof Icon>['color']; label?: string };

export const CopyButton = ({ text, color, label = 'Copy code' }: Props) => {
  const [copied, copy] = useCopyToClipboard();
  return (
    <IconButton label={label} onClick={() => copy(text)} variant="flat" size="sm">
      <Icon color={color} size="sm" as={copied ? CheckIcon : ClipboardIcon} />
    </IconButton>
  );
};
