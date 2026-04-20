import type { Theme } from "../themes/types";
import type { DesignFamily } from "../families/types";
import type { DensityScale, StateName } from "../semantics/types";
import type { ResolvedButtonTokens } from "./types";

import { resolveSurface } from "./surface";
import { resolveInteractionState } from "./state";
import { resolveFocusRing } from "./focus";
import { resolveRoleApplication } from "./role";
import { applyDensity } from "./density";

import type { ButtonSize, ButtonTone, ButtonVariant } from "../components/Button/Button.types";
import { BUTTON_SIZE_RECIPES } from "../components/Button/Button.tokens";

/**
 * Given the current theme/family/density and Button props,
 * return the fully resolved visual tokens for THIS button instance.
 */
export function resolveButtonTokens(opts: {
    theme: Theme;
    family: DesignFamily;
    density: DensityScale;
    variant: ButtonVariant;
    tone: ButtonTone;
    size: ButtonSize;
    disabled: boolean;
    debugState?: Exclude<StateName, "idle">;
}): ResolvedButtonTokens {
    const {
        theme,
        family,
        density,
        variant,
        tone,
        size,
        disabled,
        debugState,
    } = opts;

    // 1. Decide effective state
    const state: StateName = disabled ? "disabled" : debugState ?? "idle";

    // 2. Choose elevation level for this variant
    const elevated = variant === "filled"; // simple heuristic: filled pops
    const elevationLevel: 0 | 1 | 2 | 3 | 4 | 5 = elevated ? 2 : 0;

    // 3. Resolve surface (bg, shadow, borderRadius/border/etc.) from family+theme
    const surf = resolveSurface({
        theme,
        family,
        elevationLevel,
        variant,
        state,
    });

    // 4. Get base size recipe for this size, apply density scaling
    // (In future you can take density.components?.Button into account.)
    const sizeRecipe = BUTTON_SIZE_RECIPES[size];
    const scaled = applyDensity(
        sizeRecipe,
        density.scale * (density.components?.Button ?? 1)
    );

    // 5. Resolve role application (tone/variant/disabled → fg/bg/borderColor)
    const roleApplied = resolveRoleApplication({
        theme,
        tone,
        variant,
        borderWidthPx: surf.borderWidthPx,
        disabled,
    });

    // 6. Resolve state interaction overlay/transform/opacity
    const inter = resolveInteractionState({
        theme,
        family,
        state,
        roleBgForOverlay: roleApplied.bg || surf.bg,
    });

    // 7. Focus ring from family
    const focusRing = resolveFocusRing(theme, family);

    // 8. Merge opacity rules
    let opacity = surf.baseOpacity;
    if (typeof inter.stateOpacity === "number") {
        opacity = inter.stateOpacity;
    }
    if (state === "disabled") {
        opacity = 0.45; // force disabled to look disabled
    }

    // 9. Pick final background:
    // For filled/outlined/etc., background may come from roleApplied.bg,
    // not from surf.bg. surf.bg is often surface.base which you'd use for "ghost".
    // We'll say:
    // - if roleApplied.bg is transparent, fall back to surf.bg
    // - else use roleApplied.bg
    const bg =
        roleApplied.bg && roleApplied.bg !== "transparent"
            ? roleApplied.bg
            : surf.bg;

    // 10. Border color from role if provided, else from surface/family
    const borderColor =
        roleApplied.borderColor && roleApplied.borderColor !== "transparent"
            ? roleApplied.borderColor
            : surf.borderColor;

    // 11. Shadow should drop if disabled to avoid "interactive" feel
    const boxShadow = state === "disabled" ? "none" : surf.boxShadow;

    return {
        // visual core
        bg,
        fg: roleApplied.fg,
        borderColor,
        borderWidthPx: roleApplied.borderWidthPx,
        radiusPx: surf.borderRadiusPx,

        // box metrics
        paddingX: scaled.paddingX,
        paddingY: scaled.paddingY,
        gap: scaled.gap,
        minHeight: scaled.minHeight,
        fontSize: scaled.fontSize,
        fontWeight: scaled.fontWeight,

        // interactive
        overlayColor: inter.overlayColor,
        opacity,
        boxShadow,
        transform: inter.transform,

        // focus ring
        focusRingColor: focusRing.ringColor,
        focusRingWidthPx: focusRing.ringWidthPx,
        focusRingOffsetPx: focusRing.ringOffsetPx,

        // bookkeeping
        state,
        variant,
        tone,
    };
}
