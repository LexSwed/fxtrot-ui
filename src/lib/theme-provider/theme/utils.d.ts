import type { TailwindVariables } from './colors';

type ColorChannel = `${number} ${number}% ${number}%` | `${number}deg ${number}% ${number}%`;
export type ThemeColor = ColorChannel | `hsl(${ColorChannel})` | `rgb(${ColorChannel})`;

export function createThemeColors(colors: ThemeColors): Record<string, string>;
export function createTailwindColors(colors: ThemeColors): TailwindVariables;

export function extractChannel(color: ThemeColor): string | null;
