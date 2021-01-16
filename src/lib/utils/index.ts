export const isServer = typeof document === 'undefined';


export function joinNonEmpty(...strings: Array<string | undefined>) {
  return strings.filter(Boolean).join(' ');
}

export function querySelectorAll<T extends HTMLElement>(query: string, node: T | null) {
  return Array.from((node || document).querySelectorAll(query));
}
