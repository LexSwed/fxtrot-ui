type Props = { children: string };

export const Code = ({ children }: Props) => {
  return (
    <code className="rounded-xs inline-block whitespace-pre-wrap bg-primary/10 p-[2px] align-middle text-[0.85em] leading-none text-primary">
      {children}
    </code>
  );
};
