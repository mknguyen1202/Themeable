import type { ResolvedTokens } from "./types";

/**
 * Turn cssVars into a style string you can stick on a container.
 * Example usage in ThemeProvider:
 *
 * <div style={inlineStyleFromVars(tokens.cssVars)}> ... </div>
 */
export function inlineStyleFromVars(vars: Record<string, string>): React.CSSProperties {
    const style: React.CSSProperties = {};
    for (const k in vars) {
        (style as any)[k] = vars[k];
    }
    return style;
}

/**
 * Or generate a CSS text block for :root / data-theme selectors.
 * You can inject this into a <style> tag once per theme+family combo.
 */
export function cssTextFromVars(vars: Record<string, string>, selector = ":root"): string {
    const body = Object.entries(vars)
        .map(([key, val]) => `${key}: ${val};`)
        .join("\n  ");
    return `${selector} {\n  ${body}\n}`;
}
