export const Code = ({ children }: { children: string }) => {
  return (
    <code className="rounded-xs -m-[2px] inline-block whitespace-pre-wrap bg-primary/10 p-[2px] align-middle text-[0.8em] leading-[1.1em] text-primary">
      {children}
    </code>
  );
};
