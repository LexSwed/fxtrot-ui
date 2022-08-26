import { useState } from 'react';
import { Column, Icon, Row, styled, Switch, Text, TextField, useCopyToClipboard } from '@fxtrot/ui';
import * as solidIcons from '@heroicons/react/24/outline';
import * as outlineIcons from '@heroicons/react/24/outline';

export const IconsPreview = () => {
  const [filterText, setText] = useState('');
  const [isOutline, setOutline] = useState(true);
  return (
    <Column cross="stretch" gap="md">
      <Row gap="md" cross="center">
        <TextField css={{ flexBasis: '50%' }} value={filterText} onChange={setText} placeholder="Search for an icon" />
        <Switch defaultChecked onChange={setOutline} label="Show outline icons" />
      </Row>
      <Row wrap="wrap" gap="4">
        {Object.entries(isOutline ? outlineIcons : solidIcons)
          .filter(([name]) => name.toLowerCase().includes(filterText.toLowerCase()))
          .map(([name, icon]) => (
            <IconCopy name={name} icon={icon} isOutline={isOutline} key={name} />
          ))}
      </Row>
    </Column>
  );
};

const IconCopy = ({ name, icon, isOutline }: { name: string; icon: React.ElementType; isOutline: boolean }) => {
  const [copied, copy] = useCopyToClipboard();
  function handleClick() {
    copy(`import { ${name} } from '@heroicons/react/${isOutline ? 'outline' : 'solid'}'`);
  }
  return (
    <IconBox key={name} title={name} onClick={handleClick}>
      <Icon as={icon} color={copied ? '$primary' : '$onSurfaceVariant'} size="xl" />
      {copied ? (
        <Text css={{ position: 'absolute', bottom: '$2', color: '$primary' }} as="div">
          Copied!
        </Text>
      ) : null}
    </IconBox>
  );
};

const IconBox = styled('button', {
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'position': 'relative',
  'size': 80,
  'gap': '$4',
  'boxShadow': '$sm',
  'transition': '0.2s ease-in-out',
  'cursor': 'pointer',
  'minWidth': 0,
  'overflow': 'hidden',
  'bc': '#fff',
  'focusRing': '$outline',
  '&:hover': {
    boxShadow: '$md',
  },
});
