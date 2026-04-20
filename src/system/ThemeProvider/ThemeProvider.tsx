import React, { useMemo } from "react";
import { ThemeContext } from "./ThemeContext";
import type { ThemeProviderProps, ThemeContextValue } from "./types";

import { families } from "../../families";
import { densityPresets } from "../../semantics/density";
import { sizes as fontSizes } from "../../foundations/typography";
import { space } from "../../foundations/spacing";

/**
 * Helper: turn the high-level Theme + DesignFamily into root-level CSS vars.
 * These vars are global-ish tokens that SCSS modules can consume without
 * every component having to recompute basic stuff.
 *
 * NOTE: Component-specific tokens still get resolved inside the component
 * (e.g. Button.resolve.ts), but these are "global surface primitives":
 * text colors, base/raised surfaces, radii, etc.
 */
function computeRootCSSVars(ctx: ThemeContextValue): React.CSSProperties {
    const { theme, family, density } = ctx;
    const { roles, palette, mode } = theme;

    // family geometry
    const radiusSm = family.geometry.radius.sm;
    const radiusMd = family.geometry.radius.md;
    const radiusLg = family.geometry.radius.lg;
    const radiusPill = family.geometry.radius.pill;

    // surface roles
    const surfaceBase = roles.surface.base;
    const surfaceRaised = roles.surface.raised;
    const surfaceOverlay = roles.surface.overlay;
    // sunken = slightly indented surface (e.g. input backgrounds, avatar fill)
    const surfaceSunken = mode === "light" ? palette.neutral[1] : palette.neutral[10];

    // text roles
    const textPrimary = roles.text.primary;
    const textSecondary = roles.text.secondary;
    const textMuted = roles.text.muted;
    const textInverse = roles.text.inverse;

    // basic density multiplier
    const densityScale = density.scale;

    // We expose palette fg/bg because components sometimes need raw theme canvas
    const canvasBg = palette.bg;
    const canvasFg = palette.fg;

    // Neutral border color (used by inputs, checkboxes, radios, dividers, etc.)
    const borderPrimary = mode === "light" ? palette.neutral[3] : palette.neutral[7];

    // Intent colors (used by interactive controls: checked state, active track, etc.)
    const intentPrimary = roles.intent.primary.bg;
    const intentSecondary = roles.intent.secondary.bg;
    const intentSuccess = roles.intent.success.bg;
    const intentWarning = roles.intent.warning.bg;
    const intentDanger = roles.intent.danger.bg;
    // info = primary intent (no dedicated info ramp in default set)
    const intentInfo = roles.intent.primary.bg;

    // Focus ring color + sizing from family
    const focusRingColor = family.focus.ringColor({ mode });
    const focusRingWidth = family.focus.ringWidth;
    const focusRingOffset = family.focus.ringOffset;

    // Family border behaviour
    const borderStyle = family.border.style;
    const borderWidth = family.border.width.thin;

    // Family motion + feedback
    const motionTransition = family.motion.transition;
    const hoverTransform = family.feedback?.hoverTransform ?? "none";
    const activeTransform = family.feedback?.activeTransform ?? "none";

    // Family elevation shadows (shared across components)
    const shadowCtx = {
        mode,
        surfaceBase: roles.surface.base,
        primaryColor: roles.intent.primary.bg,
    };
    const shadowInset = family.elevation[0]?.shadow?.(roles.elevationColor[0], shadowCtx) ?? "none";
    const shadowSm = family.elevation[1]?.shadow?.(roles.elevationColor[1], shadowCtx) ?? "none";
    const shadowMd = family.elevation[2]?.shadow?.(roles.elevationColor[2], shadowCtx) ?? "none";
    const shadowLg = family.elevation[3]?.shadow?.(roles.elevationColor[3], shadowCtx) ?? "none";

    // Family-computed surface backgrounds (with gradient / glass / etc.)
    const surfaceArgs = { base: roles.surface.base, raised: roles.surface.raised, overlay: roles.surface.overlay, mode };
    const surfaceFamily = family.surface.background({ level: 1, ...surfaceArgs });
    const surfaceFamilyRaised = family.surface.background({ level: 2, ...surfaceArgs });
    const surfaceFamilyOverlay = family.surface.background({ level: 3, ...surfaceArgs });

    // Spacing tokens (density-scaled, based on 4px grid)
    const ds = densityScale;
    const spacingXs = Math.round(space(1) * ds);
    const spacingSm = Math.round(space(2) * ds);
    const spacingMd = Math.round(space(3) * ds);
    const spacingLg = Math.round(space(4) * ds);
    const spacingXl = Math.round(space(5) * ds);

    return {
        // mode + density
        "--theme-mode": mode,
        "--density-scale": densityScale.toString(),

        // surface roles
        "--surface-base": surfaceBase,
        "--surface-raised": surfaceRaised,
        "--surface-overlay": surfaceOverlay,
        "--surface-sunken": surfaceSunken,

        // text roles
        "--text-primary": textPrimary,
        "--text-secondary": textSecondary,
        "--text-muted": textMuted,
        "--text-tertiary": textMuted,   // alias — no dedicated tertiary in role set
        "--text-inverse": textInverse,

        // canvas roles
        "--canvas-bg": canvasBg,
        "--canvas-fg": canvasFg,

        // radii from the active family
        "--radius-sm": `${radiusSm}px`,
        "--radius-md": `${radiusMd}px`,
        "--radius-lg": `${radiusLg}px`,
        "--radius-pill": `${radiusPill}px`,

        // border + intent tokens (used by form controls)
        "--border-primary": borderPrimary,
        "--intent-primary": intentPrimary,
        "--intent-secondary": intentSecondary,
        "--intent-success": intentSuccess,
        "--intent-warning": intentWarning,
        "--intent-danger": intentDanger,
        "--intent-info": intentInfo,

        // focus ring
        "--focus-ring-color": focusRingColor,
        "--focus-ring-width": `${focusRingWidth}px`,
        "--focus-ring-offset": `${focusRingOffset}px`,

        // family border behaviour
        "--border-style": borderStyle,
        "--border-width": `${borderWidth}px`,
        "--border-width-thick": `${family.border.width.thick}px`,

        // family elevation shadows
        "--shadow-inset": shadowInset,
        "--shadow-sm": shadowSm,
        "--shadow-md": shadowMd,
        "--shadow-lg": shadowLg,

        // family motion + feedback
        "--motion-transition": motionTransition,
        "--hover-transform": hoverTransform,
        "--active-transform": activeTransform,

        // family-computed surface backgrounds
        "--surface-family": surfaceFamily,
        "--surface-family-raised": surfaceFamilyRaised,
        "--surface-family-overlay": surfaceFamilyOverlay,

        // spacing scale
        "--spacing-xs": `${spacingXs}px`,
        "--spacing-sm": `${spacingSm}px`,
        "--spacing-md": `${spacingMd}px`,
        "--spacing-lg": `${spacingLg}px`,
        "--spacing-xl": `${spacingXl}px`,

        // font sizes
        "--font-size-xs": `${fontSizes.xs}px`,
        "--font-size-sm": `${fontSizes.sm}px`,
        "--font-size-md": `${fontSizes.md}px`,
        "--font-size-lg": `${fontSizes.lg}px`,
        "--font-size-xl": `${fontSizes.xl}px`,
    } as React.CSSProperties;
}

export function ThemeProvider({
    theme,
    family: familyId,
    densityId,
    children,
}: ThemeProviderProps) {
    // pick the design family impl (flat, glass, etc.)
    const family = families[familyId];
    if (!family) {
        throw new Error(
            `[Themeable] Unknown family '${familyId}'. Did you forget to add it to families/index.ts?`
        );
    }

    // resolve density override
    const density =
        densityId && densityPresets[densityId]
            ? densityPresets[densityId]
            : theme.density;

    const ctxValue = useMemo<ThemeContextValue>(
        () => ({
            theme,
            family,
            density,
        }),
        [theme, family, density]
    );

    // Precompute root vars that are globally useful in CSS
    const styleVars = useMemo(() => computeRootCSSVars(ctxValue), [ctxValue]);

    /**
     * We render a wrapping <div> that:
     * - Sets global-ish CSS custom properties (surface, text, radii, etc.)
     * - Provides React context for runtime resolution in components
     *
     * Why inline style instead of a giant class? Because each subtree can
     * nest <ThemeProvider> with a different theme/family and we want those
     * vars to cascade naturally.
     */
    return (
        <ThemeContext.Provider value={ctxValue}>
            <div
                data-theme-id={theme.id}
                data-family-id={family.id}
                data-theme-mode={theme.mode}
                style={styleVars}
            >
                {children}
            </div>
        </ThemeContext.Provider>
    );
}
