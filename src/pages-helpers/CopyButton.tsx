import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { Button, useCopyToClipboard } from '@fxtrot/ui';

type Props = { text: string; label?: string };

export const CopyButton = ({ text, label = 'Copy code' }: Props) => {
  const [copied, copy] = useCopyToClipboard();
  return (
    <Button
      label={label}
      style={{ color: 'inherit' }}
      icon={copied ? CheckIcon : ClipboardIcon}
      onClick={() => copy(text)}
      variant="flat"
      size="sm"
    />
  );
};
