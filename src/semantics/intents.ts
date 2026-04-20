import type { IntentRole, IntentSet, Mode, Palette } from "./types";
import { withAlpha, hexToRgb } from "../foundations/color";

/** WCAG relative luminance of an sRGB hex color */
function relativeLuminance(hex: string): number {
    const { r, g, b } = hexToRgb(hex);
    const lin = (c: number) => {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** Pick white or near-black text for maximum readability on a filled button background.
 *  Prefers white for any medium-to-dark background (luminance < 0.30) so that
 *  saturated mid-tones (e.g. Solar blue at 50% HSL lightness) get bright text.
 *  Falls back to the higher-contrast option for truly bright/pastel backgrounds. */
function contrastingFg(bgHex: string): string {
    const L = relativeLuminance(bgHex);
    const onWhite = 1.05 / (L + 0.05);
    const onBlack = (L + 0.05) / 0.05;
    // Prefer white for medium-dark backgrounds; let max-contrast decide for bright ones
    if (L < 0.30) return "#FFFFFF";
    return onWhite >= onBlack ? "#FFFFFF" : "#0F172A";
}


/**
* Build an IntentRole from a palette ramp index
*/
export function intentFromRamp(palette: Palette, mode: Mode, key: keyof Palette & keyof any, idx: number): IntentRole {
    // TS limitation: we ensure key is one of the ramp keys by runtime guard
    const ramp = (palette as any)[key] as string[] | undefined;
    if (!Array.isArray(ramp)) throw new Error(`Palette key '${String(key)}' is not a ramp`);
    const base = ramp[idx];
    const border = ramp[Math.max(0, idx - 1)];
    const fg = contrastingFg(base);
    // onSurface: a brand-toned color readable on the surface background.
    // Dark mode surfaces are very dark → use a bright ramp entry (index 2, ~83% lightness).
    // Light mode surfaces are white → use a dark ramp entry (index 7, ~33% lightness).
    const onSurface = mode === "dark" ? ramp[2] : ramp[7];
    return {
        fg,
        bg: base,
        border,
        onSurface,
        hover: withAlpha(base, 0.90),
        pressed: withAlpha(base, 0.80),
        focus: withAlpha(base, 0.45),
    };
}


export function defaultIntentSet(palette: Palette, mode: Mode): IntentSet {
    return {
        primary: intentFromRamp(palette, mode, "primary" as any, 5), // ~500–600
        secondary: intentFromRamp(palette, mode, "secondary" as any, 5),
        tertiary: intentFromRamp(palette, mode, "tertiary" as any, 5),
        success: intentFromRamp(palette, mode, "success" as any, 4),
        warning: intentFromRamp(palette, mode, "warning" as any, 4),
        danger: intentFromRamp(palette, mode, "danger" as any, 4),
        neutral: intentFromRamp(palette, mode, "neutral" as any, 4),
    };
}