import Highlight, { defaultProps, type Language } from 'prism-react-renderer';
import { clsx } from 'clsx';
import theme from 'prism-react-renderer/themes/nightOwl';
import { DiReact } from 'react-icons/di';
import { Icon, Row, Text, ThemeProvider, type Theme } from '@fxtrot/ui';
import { CopyButton } from './CopyButton';

type Props = {
  code: string;
  language: string;
  lineNumber?: boolean;
  fileName?: string;
};

export const MultilineCode = ({ code, language, fileName, lineNumber = true }: Props) => {
  return (
    <ThemeProvider theme={codeTheme}>
      <Highlight {...defaultProps} theme={theme} code={code} language={language as Language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <section className="group/code-wrapper relative overflow-hidden rounded-sm my-1">
            {fileName ? (
              <Row style={style} main="start" className="sticky top-0">
                <Row cross="center" gap="sm" className="border-t-2 border-t-primary bg-surface p-2">
                  <Icon as={DiReact} />
                  <Text textStyle="mono-md">{fileName}</Text>
                </Row>
              </Row>
            ) : null}
            <pre className={clsx('overflow-auto p-3 text-start font-mono', className)} style={style}>
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i });
                return (
                  <line {...lineProps} className={clsx('table-row text-sm', lineProps.className)}>
                    {lineNumber && <span className="table-cell select-none text-end opacity-50 pr-4">{i + 1}</span>}
                    <span className="table-cell">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </span>
                  </line>
                );
              })}
            </pre>
            <div className="duration-240 absolute right-0 top-0 text-inverse-on-surface opacity-0 transition-opacity delay-500 group-focus-within/code-wrapper:opacity-100 group-focus-within/code-wrapper:delay-[0s] group-hover/code-wrapper:opacity-100 group-hover/code-wrapper:delay-[0s]">
              <CopyButton text={code} />
            </div>
          </section>
        )}
      </Highlight>
    </ThemeProvider>
  );
};

export default MultilineCode;

const codeTheme: Theme = {
  colors: {
    'primary': 'hsl(221deg 100% 75%)',
    'background': 'hsl(207deg 95% 8%)',
    'on-background': 'hsl(217deg 34% 88%)',
    'surface': 'hsl(207deg 45% 10%)',
    'on-surface': 'hsl(217deg 34% 88%)',
    'outline': 'hsl(217deg 5% 40%)',
  },
};
