import type { FontWeights, FontSizes, LineHeights } from "./types";


export const fontStack = {
    sans: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\"",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace",
};


export const weights: FontWeights = {
    thin: 100, extralight: 200, light: 300, regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900
};


// Modular scale (minor third ~1.2) around 16px
const ms = (step: number, base = 16, ratio = 1.2) => Math.round((base * Math.pow(ratio, step)));


export const sizes: FontSizes = {
    xs: ms(-2), // ~11
    sm: ms(-1), // ~13
    md: ms(0), // 16
    lg: ms(1), // 19
    xl: ms(2), // 23
    xxl: ms(3), // ~27–28
    display: ms(5), // ~40–41
};


export const lineHeights: LineHeights = { tight: 1.25, normal: 1.5, relaxed: 1.7 };


// Convenience CSS var map for injection if needed
export const typographyVars: Record<string, string | number> = {
    "--font-sans": fontStack.sans,
    "--font-mono": fontStack.mono,
    "--font-weight-regular": weights.regular,
    "--font-size-md": `${sizes.md}px`,
    "--line-height-normal": lineHeights.normal,
};