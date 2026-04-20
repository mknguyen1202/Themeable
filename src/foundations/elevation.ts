import type { Elevation, ElevationMetrics, ShadowMetric } from "./types";


// Shadow geometry per elevation (color is theme-provided later)
const E: ElevationMetrics = {
    0: { y: 0, blur: 0, spread: 0 },
    1: { y: 1, blur: 2, spread: 0 },
    2: { y: 2, blur: 6, spread: 0 },
    3: { y: 4, blur: 10, spread: 0 },
    4: { y: 8, blur: 18, spread: 0 },
    5: { y: 12, blur: 28, spread: 0 },
};


export const elevationMetrics = E;


export function shadowCSS(level: Elevation, rgbaColor: string): string {
    const m = E[level];
    if (!m || level === 0) return "none";
    return `0 ${m.y}px ${m.blur}px ${m.spread}px ${rgbaColor}`;
}


export const zIndex = {
    base: 0,
    raised: 1,
    overlay: 10,
    dropdown: 1000,
    modal: 1100,
    toast: 1200,
    tooltip: 1300,
};