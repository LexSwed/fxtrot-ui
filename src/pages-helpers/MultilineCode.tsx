import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import { clsx } from 'clsx';
import theme from 'prism-react-renderer/themes/nightOwl';
import { CopyButton } from './CopyButton';

type Props = {
  code: string;
  language: string;
};

export const MultilineCode = ({ code, language }: Props) => {
  return (
    <Highlight {...defaultProps} theme={theme} code={code} language={language as Language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <section className="group/code-wrapper relative">
          <pre className={clsx('my-[1em] overflow-scroll rounded-sm p-4 text-start', className)} style={style}>
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });
              return (
                <line {...lineProps} className={clsx('table-row', lineProps.className)} key={i}>
                  <span className="pr-[1em] table-cell select-none text-end opacity-50">{i + 1}</span>
                  <span className="table-cell text-sm">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </span>
                </line>
              );
            })}
          </pre>
          <div className="absolute top-2 right-1 opacity-0 transition-opacity delay-500 duration-240 group-hover/code-wrapper:opacity-100 group-hover/code-wrapper:delay-[0]">
            <CopyButton text={code} color="#fff" />
          </div>
        </section>
      )}
    </Highlight>
  );
};
