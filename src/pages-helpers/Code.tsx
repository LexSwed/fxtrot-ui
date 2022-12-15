export const Code = ({ children }: { children: string }) => {
  return (
    <code className="rounded-xs inline-block whitespace-pre-wrap bg-primary/10 p-[2px] align-middle text-[0.85em] leading-none text-primary">
      {children}
    </code>
  );
};
