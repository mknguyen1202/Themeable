import type { StateName } from "../semantics/types";
import type { Theme } from "../themes/types";
import type { DesignFamily } from "../families/types";

export type ResolutionContext = {
    theme: Theme;
    family: DesignFamily;
};

export type ButtonTokens = {
    radii: number;
    paddings: { x: number; y: number };
    variants: Record<string, { bg: string; fg: string; border?: string; shadow?: string; radius?: number }>;
    states: {
        hover: Record<string, { opacity: number; shadow?: string | undefined }>;
        pressed: Record<string, { opacity: number; shadow?: string | undefined }>;
        focus: { ring: string };
        disabled: { opacity: number };
    };
};

export type ResolvedTokens = {
    cssVars: Record<string, string>;
    components: { Button: ButtonTokens };
    meta: {
        themeId: string;
        familyId: string;
        mode: string;
        densityScale: number;
    };
};

/**
 * Base surface information at a given elevation level as interpreted by the design family.
 */
export type ResolvedSurface = {
    bg: string;
    boxShadow: string;
    surfaceEffect?: string;
    borderRadiusPx: number;
    borderColor: string;
    borderStyle: string;
    borderWidthPx: number;
    baseOpacity: number;
};

/**
 * Interaction state information (hover, pressed, etc.).
 */
export type ResolvedInteractionState = {
    overlayColor: string;
    transform: string;
    stateOpacity?: number;
};

/**
 * Focus ring styling.
 */
export type ResolvedFocusRing = {
    ringColor: string;
    ringWidthPx: number;
    ringOffsetPx: number;
};

/**
 * Box metrics after density scaling.
 */
export type ResolvedDensityBox = {
    paddingX: number;
    paddingY: number;
    gap: number;
    minHeight: number;
    fontSize: string;
    fontWeight?: number;
    radiusKey: string;
};

/**
 * Result of mapping intent+tone+variant to fg/bg/border visual treatment.
 */
export type ResolvedRoleApplication = {
    fg: string;
    bg: string;
    borderColor: string;
    borderWidthPx: number;
};

/**
 * Minimal common block a component-specific resolver might merge into its
 * final Resolved<Component>Tokens shape.
 *
 * We're not exporting ResolvedButtonTokens here on purpose. That's owned
 * by the component.
 */
export type CommonResolvedControlTokens = {
    state: StateName;
    bg: string;
    fg: string;
    borderColor: string;
    borderWidthPx: number;
    radiusPx: number;
    paddingX: number;
    paddingY: number;
    gap: number;
    minHeight: number;
    fontSize: string;
    fontWeight?: number;
    overlayColor: string;
    opacity: number;
    boxShadow: string;
    transform: string;
    focusRingColor: string;
    focusRingWidthPx: number;
    focusRingOffsetPx: number;
};
