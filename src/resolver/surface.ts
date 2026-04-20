import type { Theme } from "../themes/types";
import type { DesignFamily } from "../families/types";
import type { ResolvedSurface } from "./types";
import type { StateName } from "../semantics/types";

export function resolveSurface({
    theme,
    family,
    elevationLevel,
    state,
}: {
    theme: Theme;
    family: DesignFamily;
    elevationLevel: 0 | 1 | 2 | 3 | 4 | 5;
    state: StateName;
}): ResolvedSurface {
    const { roles } = theme;

    const borderRadiusPx = family.geometry.radius.md;

    const borderWidthPx = family.border.width.thin;
    const borderStyle = family.border.style;
    const borderColor =
        typeof family.border.color === "function"
            ? family.border.color({ mode: theme.mode })
            : family.border.color;

    const surfaceBg = family.surface.background({
        level: elevationLevel,
        base: roles.surface.base,
        raised: roles.surface.raised,
        overlay: roles.surface.overlay,
        mode: theme.mode,
    });

    const shadowColor = roles.elevationColor[elevationLevel];
    const shadowFn = family.elevation[elevationLevel]?.shadow;
    const shadowCtx = { mode: theme.mode, surfaceBase: roles.surface.base, primaryColor: roles.intent.primary.bg };
    const boxShadow = shadowFn
        ? shadowFn(shadowColor, shadowCtx)
        : "none";

    const surfaceEffect = family.surface.effect?.({ level: elevationLevel, mode: theme.mode });

    let baseOpacity = 1;
    if (family.transparency?.opacity) {
        const o = family.transparency.opacity(state);
        if (typeof o === "number") baseOpacity = o;
    }

    return {
        bg: surfaceBg,
        boxShadow,
        surfaceEffect,
        borderRadiusPx,
        borderColor,
        borderStyle,
        borderWidthPx,
        baseOpacity,
    };
}
