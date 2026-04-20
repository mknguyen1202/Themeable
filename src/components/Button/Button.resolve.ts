import { useMemo } from "react";
import { useThemeContext } from "../../system/ThemeProvider/ThemeContext";

import type {
    ButtonProps,
    ButtonVariant,
    ButtonTone,
    ButtonSize,
} from "./Button.types";

import { BUTTON_SIZE_RECIPES } from "./Button.tokens";

import type { DensityScale, StateName } from "../../semantics/types";

import {
    resolveSurface,
    resolveInteractionState,
    resolveFocusRing,
    resolveRoleApplication,
    applyDensity,
} from "../../resolver";

export type ResolvedButtonTokens = {
    // state bookkeeping / introspection
    state: StateName;
    variant: ButtonVariant;
    tone: ButtonTone;

    // visual core
    bg: string;
    fg: string;
    borderColor: string;
    borderWidthPx: number;
    radiusPx: number;

    // box metrics
    paddingX: number;
    paddingY: number;
    gap: number;
    minHeight: number;
    fontSize: string;
    fontWeight?: number;

    // dynamic visuals / interaction feedback
    overlayColor: string;
    opacity: number;
    boxShadow: string;
    transform: string;

    // focus ring tokens
    focusRingColor: string;
    focusRingWidthPx: number;
    focusRingOffsetPx: number;
};

/**
 * Pure resolver with no React hooks.
 * Makes it easy to test or to render previews in the editor.
 */
export function resolveButtonTokens({
    theme,
    family,
    density,
    variant,
    tone,
    size,
    disabled,
    debugState,
}: {
    theme: ReturnType<typeof useThemeContext>["theme"];
    family: ReturnType<typeof useThemeContext>["family"];
    density: DensityScale;
    variant: ButtonVariant;
    tone: ButtonTone;
    size: ButtonSize;
    disabled: boolean;
    debugState?: Exclude<StateName, "idle">;
}): ResolvedButtonTokens {
    // 1. effective state (disabled overrides everything)
    const state: StateName = disabled ? "disabled" : debugState ?? "idle";

    // 2. choose "elevation" feeling per variant
    //    fab/fabExtended float higher; filled feels raised; others feel flat
    const elevationLevel: 0 | 1 | 2 | 3 | 4 | 5 =
        variant === "fab" || variant === "fabExtended" ? 3
            : variant === "filled" ? 2
                : 0;

    // 3. resolve base surface from family + theme
    const surf = resolveSurface({
        theme,
        family,
        elevationLevel,
        state,
    });

    // 4. resolve size recipe & density scaling
    const baseRecipe = BUTTON_SIZE_RECIPES[size];
    const scaled = applyDensity(
        baseRecipe,
        density.scale,
        density.components?.Button ?? 1
    );

    // 5. resolve tone/variant visual treatment (bg/fg/border)
    const roleApplied = resolveRoleApplication({
        theme,
        tone,
        variant,
        borderWidthPx: surf.borderWidthPx,
        disabled,
    });

    // 6. resolve interaction state overlay / transform / opacity hint
    const inter = resolveInteractionState({
        theme,
        family,
        state,
        // overlay tints should respect the tone fill if we have one,
        // otherwise fallback to surface background
        roleBgForOverlay: roleApplied.bg || surf.bg,
    });

    // 7. resolve focus ring visuals from family
    const ring = resolveFocusRing(theme, family);

    // 8. merge opacity rules
    let opacity = surf.baseOpacity;
    if (typeof inter.stateOpacity === "number") {
        opacity = inter.stateOpacity;
    }
    if (state === "disabled") {
        opacity = 0.45;
    }

    // 9. compute final background
    // for filled buttons: tone background
    // for outlined/ghost/text: transparent or surface background fallback
    const bg =
        roleApplied.bg && roleApplied.bg !== "transparent"
            ? roleApplied.bg
            : surf.bg;

    // 10. compute final borderColor
    const borderColor =
        roleApplied.borderColor && roleApplied.borderColor !== "transparent"
            ? roleApplied.borderColor
            : surf.borderColor;

    // 11. if disabled, drop elevation shadow to telegraph non-interactive
    const boxShadow = state === "disabled" ? "none" : surf.boxShadow;

    return {
        state,
        variant,
        tone,

        bg,
        fg: roleApplied.fg,
        borderColor,
        borderWidthPx: roleApplied.borderWidthPx,
        // fab/fabExtended/icon always use pill radius for the rounded shape
        radiusPx: (variant === "fab" || variant === "fabExtended" || variant === "icon")
            ? family.geometry.radius.pill
            : surf.borderRadiusPx,

        paddingX: scaled.paddingX,
        paddingY: scaled.paddingY,
        gap: scaled.gap,
        minHeight: scaled.minHeight,
        fontSize: scaled.fontSize,
        fontWeight: scaled.fontWeight,

        overlayColor: inter.overlayColor,
        opacity,
        boxShadow,
        transform: inter.transform,

        focusRingColor: ring.ringColor,
        focusRingWidthPx: ring.ringWidthPx,
        focusRingOffsetPx: ring.ringOffsetPx,
    };
}

/**
 * Hook exposed to the actual <Button> component.
 * Converts resolved tokens into:
 *   - cssVars: inline style object consumed by Button.module.scss
 *   - dataAttrs: data-* attributes for debugging / theme inspection / styling hooks
 */
export function useResolvedButtonTokens(props: {
    variant?: ButtonProps["variant"];
    tone?: ButtonProps["tone"];
    size?: ButtonProps["size"];
    disabled?: ButtonProps["disabled"];
    debugState?: ButtonProps["debugState"];
}) {
    const { theme, family, density } = useThemeContext();

    const {
        variant = "filled",
        tone = "primary",
        size = "md",
        disabled = false,
        debugState,
    } = props;

    return useMemo(() => {
        const resolved = resolveButtonTokens({
            theme,
            family,
            density,
            variant,
            tone,
            size,
            disabled: !!disabled,
            debugState,
        });

        // Generate CSS variables that Button.module.scss will read
        const cssVars: React.CSSProperties & Record<string, string | number> = {
            "--btn-bg": resolved.bg,
            "--btn-fg": resolved.fg,
            "--btn-border-color": resolved.borderColor,
            "--btn-border-width": `${resolved.borderWidthPx}px`,
            "--btn-radius": `${resolved.radiusPx}px`,

            "--btn-padding-x": `${resolved.paddingX}px`,
            "--btn-padding-y": `${resolved.paddingY}px`,
            "--btn-gap": `${resolved.gap}px`,
            "--btn-min-height": `${resolved.minHeight}px`,

            "--btn-font-size": resolved.fontSize,
            "--btn-font-weight": resolved.fontWeight ?? 500,

            "--btn-overlay-color": resolved.overlayColor,
            "--btn-opacity": `${resolved.opacity}`,

            "--btn-shadow": resolved.boxShadow,
            "--btn-transform": resolved.transform,

            "--btn-focus-ring-color": resolved.focusRingColor,
            "--btn-focus-ring-width": `${resolved.focusRingWidthPx}px`,
            "--btn-focus-ring-offset": `${resolved.focusRingOffsetPx}px`,
        };

        // data-* attrs = semantic breadcrumbs you can inspect in devtools or use in storybook docs
        const dataAttrs = {
            "data-variant": resolved.variant,
            "data-tone": resolved.tone,
            "data-state": resolved.state,
            "data-disabled": disabled ? "true" : undefined,
        } as Record<string, string | undefined>;

        return { cssVars, dataAttrs, resolved };
    }, [theme, family, density, variant, tone, size, disabled, debugState]);
}
