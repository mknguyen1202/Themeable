import type { ResolvedDensityBox } from "./types";

/**
 * Apply density.scale (and optional component-specific multiplier)
 * to a base control size recipe.
 */
export function applyDensity(
    base: {
        paddingX: number;
        paddingY: number;
        gap: number;
        minHeight: number;
        fontSize: string;
        fontWeight?: number;
        radiusKey: string;
    },
    densityScale: number,
    componentScale: number = 1
): ResolvedDensityBox {
    const scale = densityScale * componentScale;

    return {
        paddingX: base.paddingX * scale,
        paddingY: base.paddingY * scale,
        gap: base.gap * scale,
        minHeight: base.minHeight * scale,
        fontSize: base.fontSize,
        fontWeight: base.fontWeight,
        radiusKey: base.radiusKey,
    };
}
