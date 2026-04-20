import type { Ramp12 } from "./types";

// Basic color helpers kept minimal (no deps)
export type RGB = { r: number; g: number; b: number };
export type HSL = { h: number; s: number; l: number };

export const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));

export function hexToRgb(hex: string): RGB {
    const h = hex.replace('#', '');
    const v = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
    const num = parseInt(v, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

export function rgbToHex({ r, g, b }: RGB): string {
    const to = (x: number) => x.toString(16).padStart(2, '0');
    return `#${to(r)}${to(g)}${to(b)}`.toUpperCase();
}

export function rgbToHsl({ r, g, b }: RGB): HSL {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
}

export function hslToRgb({ h, s, l }: HSL): RGB {
    h /= 360; s /= 100; l /= 100;
    if (s === 0) {
        const v = Math.round(l * 255); return { r: v, g: v, b: v };
    }
    const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1; if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };
    const q = l < .5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const r = hue2rgb(p, q, h + 1 / 3), g = hue2rgb(p, q, h), b = hue2rgb(p, q, h - 1 / 3);
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

export const withAlpha = (hex: string, alpha: number) => {
    const { r, g, b } = hexToRgb(hex); return `rgba(${r}, ${g}, ${b}, ${clamp(alpha, 0, 1)})`;
};

export const lighten = (hex: string, amt: number) => {
    const hsl = rgbToHsl(hexToRgb(hex));
    hsl.l = Math.max(0, Math.min(100, hsl.l + amt));
    return rgbToHex(hslToRgb(hsl));
};
export const darken = (hex: string, amt: number) => lighten(hex, -amt);

export function relativeLuminance(hex: string): number {
    const { r, g, b } = hexToRgb(hex);
    const conv = (u: number) => {
        const c = u / 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const L = 0.2126 * conv(r) + 0.7152 * conv(g) + 0.0722 * conv(b);
    return L;
}

export function contrastRatio(foreground: string, background: string): number {
    const L1 = relativeLuminance(foreground); const L2 = relativeLuminance(background);
    const [a, b] = L1 > L2 ? [L1, L2] : [L2, L1];
    return (a + 0.05) / (b + 0.05);
}

// Generate a 12-step ramp from two endpoints in HSL
export function rampFromEndpoints(start: string, end: string): Ramp12<string> {
    const a = rgbToHsl(hexToRgb(start));
    const b = rgbToHsl(hexToRgb(end));
    const lerp = (x: number, y: number, t: number) => x + (y - x) * t;
    const out: string[] = [];
    for (let i = 0; i < 12; i++) {
        const t = i / 11;
        const h = lerp(a.h, b.h, t);
        const s = lerp(a.s, b.s, t);
        const l = lerp(a.l, b.l, t);
        out.push(rgbToHex(hslToRgb({ h, s, l })));
    }
    return out as Ramp12<string>;
}

/**
 * Generate a 12-step color ramp from a hue with fixed lightness values.
 * This ensures all ramps have matching perceived brightness at each step.
 * 
 * @param hue - Base hue (0-360)
 * @param saturation - Base saturation percentage (0-100) 
 * @param mode - "light" or "dark" to determine lightness progression
 * @returns 12-step color ramp with harmonized lightness
 */
export function harmonizedRamp(
    hue: number,
    saturation: number = 85,
    mode: "light" | "dark" = "light"
): Ramp12<string> {
    // Lightness values that work well for both light and dark themes
    // These create good contrast while maintaining visual harmony
    const lightnessSteps: Ramp12<number> = mode === "light"
        ? [97, 92, 85, 75, 62, 50, 42, 35, 28, 22, 16, 12]  // light theme: light to dark
        : [95, 90, 83, 72, 60, 48, 40, 33, 27, 21, 16, 12]; // dark theme: slightly adjusted

    const out: string[] = [];
    for (let i = 0; i < 12; i++) {
        // Slightly reduce saturation for very light/dark steps to avoid harsh colors
        let adjustedSat = saturation;
        if (i === 0) adjustedSat = saturation * 0.3;
        else if (i === 1) adjustedSat = saturation * 0.5;
        else if (i === 11) adjustedSat = saturation * 0.8;

        const color = hslToRgb({
            h: hue,
            s: adjustedSat,
            l: lightnessSteps[i]
        });
        out.push(rgbToHex(color));
    }
    return out as Ramp12<string>;
}

/**
 * Generate harmonized primary/secondary/tertiary ramps with matching lightness.
 * Use this to ensure your semantic colors have consistent perceived brightness.
 * 
 * @param primaryHue - Hue for primary (e.g., 25 for orange)
 * @param secondaryHue - Hue for secondary (e.g., 160 for teal/green)
 * @param tertiaryHue - Hue for tertiary (e.g., 240 for blue/indigo)
 * @param saturation - Base saturation for all colors (default 85)
 * @param mode - "light" or "dark" theme
 */
export function createHarmonizedPalette(
    primaryHue: number,
    secondaryHue: number,
    tertiaryHue: number,
    saturation: number = 85,
    mode: "light" | "dark" = "light"
): {
    primary: Ramp12<string>;
    secondary: Ramp12<string>;
    tertiary: Ramp12<string>;
} {
    return {
        primary: harmonizedRamp(primaryHue, saturation, mode),
        secondary: harmonizedRamp(secondaryHue, saturation, mode),
        tertiary: harmonizedRamp(tertiaryHue, saturation, mode),
    };
}

/**
 * Generate primary/secondary/tertiary ramps from the SAME hue with different shades.
 * This creates a monochromatic hierarchy where:
 * - Primary: Full saturation, standard lightness (strongest/most prominent)
 * - Secondary: Lighter shade (softer, less emphasis)
 * - Tertiary: Even lighter shade (subtle, background-ish)
 * 
 * @param hue - Base hue (0-360) used for all three levels
 * @param saturation - Base saturation for primary (default 85)
 * @param mode - "light" or "dark" theme
 * @returns Object with primary, secondary, tertiary ramps in same hue family
 */
export function createMonochromaticLevels(
    hue: number,
    saturation: number = 85,
    mode: "light" | "dark" = "light"
): {
    primary: Ramp12<string>;
    secondary: Ramp12<string>;
    tertiary: Ramp12<string>;
} {
    // Standard lightness progression
    const baseLightness: Ramp12<number> = mode === "light"
        ? [97, 92, 85, 75, 62, 50, 42, 35, 28, 22, 16, 12]
        : [95, 90, 83, 72, 60, 48, 40, 33, 27, 21, 16, 12];

    // Secondary: shift lightness UP (lighter/softer)
    const secondaryLightness: Ramp12<number> = baseLightness.map((l, i) => {
        if (mode === "light") {
            // In light mode, make secondary lighter (add lightness)
            return Math.min(98, l + (i < 6 ? 8 : 6));
        } else {
            // In dark mode, also make it lighter (less dark)
            return Math.min(96, l + (i < 6 ? 8 : 5));
        }
    }) as Ramp12<number>;

    // Tertiary: shift lightness UP even more (most subtle)
    const tertiaryLightness: Ramp12<number> = baseLightness.map((l, i) => {
        if (mode === "light") {
            return Math.min(99, l + (i < 6 ? 15 : 12));
        } else {
            return Math.min(97, l + (i < 6 ? 15 : 10));
        }
    }) as Ramp12<number>;

    // Generate ramps with adjusted lightness
    const generateRamp = (lightnessSteps: Ramp12<number>, satMod: number = 1): Ramp12<string> => {
        const out: string[] = [];
        for (let i = 0; i < 12; i++) {
            let adjustedSat = saturation * satMod;
            // Reduce saturation at extremes
            if (i === 0) adjustedSat *= 0.3;
            else if (i === 1) adjustedSat *= 0.5;
            else if (i === 11) adjustedSat *= 0.8;

            const color = hslToRgb({
                h: hue,
                s: adjustedSat,
                l: lightnessSteps[i]
            });
            out.push(rgbToHex(color));
        }
        return out as Ramp12<string>;
    };

    return {
        primary: generateRamp(baseLightness, 1.0),      // Full saturation
        secondary: generateRamp(secondaryLightness, 0.85), // Slightly less saturated
        tertiary: generateRamp(tertiaryLightness, 0.70),  // Even less saturated
    };
}

// Reference neutral ramp (perceptual-ish). Feel free to swap with your own.
export const neutralRamp: Ramp12<string> = [
    "#F8FAFC", "#F1F5F9", "#E2E8F0", "#CBD5E1", "#94A3B8", "#64748B",
    "#475569", "#334155", "#1E293B", "#0F172A", "#0B1220", "#070C18"
];
