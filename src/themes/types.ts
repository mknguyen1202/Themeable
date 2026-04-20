import type { Semantics, Palette, Mode } from "../semantics";

export type Theme = Semantics & {
    id: string;       // e.g., "solar", "lunar", "aurora"
    label?: string;   // Human-readable name
};

export type ThemeFactory = (overrides?: Partial<{ palette: Partial<Palette>; mode: Mode }>) => Theme;
