import React from 'react';
import { styled } from '@fxtrot/ui';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import { CopyButton } from './CopyButton';

type Props = { children: string };

export const Code = ({ children }: Props) => {
  return <InlineCodeBlock>{children}</InlineCodeBlock>;
};

type MultilineProps = {
  children: React.ReactChild;
  className?: string;
};

export const MultilineCode = ({ children, className }: MultilineProps) => {
  if (!(React.Children.only(children) && React.isValidElement(children))) {
    return null;
  }
  const code = children.props.children.trim();
  const language = className?.replace('language-', '');

  return (
    <Highlight {...defaultProps} theme={theme} code={code} language={language as Language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <CodeWrapper>
          <Pre className={className} style={style}>
            {tokens.map((line, i) => (
              <Line key={i} {...getLineProps({ line, key: i })}>
                <LineNo>{i + 1}</LineNo>
                <LineContent>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </LineContent>
              </Line>
            ))}
          </Pre>
          <ButtonWrapper>
            <CopyButton text={code} color="#fff" />
          </ButtonWrapper>
        </CodeWrapper>
      )}
    </Highlight>
  );
};

const InlineCodeBlock = styled('code', {
  whiteSpace: 'break-spaces',
  bc: '$shape-accent-light--active',
  color: '$text-accent',
  fontSize: '0.9em',
  lineHeight: 1,
  padding: '1px 3px 2px',
  br: '$xs',
  display: 'inline-block',
  verticalAlign: 'middle',
});

const Pre = styled('pre', {
  textAlign: 'left',
  margin: '1em 0',
  padding: '$4',
  overflow: 'scroll',
  br: '$sm',
});

const Line = styled('div', {
  display: 'table-row',
});

const LineNo = styled('span', {
  display: 'table-cell',
  textAlign: 'right',
  paddingRight: '1em',
  userSelect: 'none',
  opacity: 0.5,
});

const LineContent = styled('span', {
  display: 'table-cell',
});

const ButtonWrapper = styled('div', {
  position: 'absolute',
  top: 6,
  right: 3,
});

const CodeWrapper = styled('section', {
  'position': 'relative',
  [`& > ${ButtonWrapper}`]: {
    opacity: 0,
    transition: '0.24s ease-in-out',
    transitionDelay: '0.4s',
  },
  '&:hover': {
    [`& > ${ButtonWrapper}`]: {
      opacity: 1,
      transitionDelay: '0s',
    },
  },
});
