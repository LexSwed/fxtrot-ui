export const Code = ({ children }: { children: string }) => {
  return (
    <code className="rounded-xs -m-[2px] inline-block whitespace-pre-wrap bg-primary/10 align-middle font-mono text-[0.8em] leading-[1.5em] text-primary px-0.5">
      {children}
    </code>
  );
};
