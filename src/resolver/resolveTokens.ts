import type { Elevation } from "../foundations/types.js";
import type { Theme } from "../themes";
import type { DesignFamily } from "../families/types";
import type { ResolvedTokens, ButtonTokens } from "./types";
import { space } from "../foundations/spacing";

// Helper: get box-shadow string for a given elevation using both theme & family
function resolveShadow(theme: Theme, family: DesignFamily, level: Elevation): string | undefined {
    const entry = family.elevation[level];
    if (!entry) return undefined;

    const color = theme.roles.elevationColor[level];
    return entry.shadow(color, { mode: theme.mode });
}

// Helper: pick intent role and convert into a variant style
function buildVariantFromIntent(theme: Theme, family: DesignFamily, intentKey: keyof Theme["roles"]["intent"], opts?: {
    elevation?: Elevation;
    outlined?: boolean;
    transparent?: boolean;
    gradientFromPaletteIndex?: [keyof Theme["palette"], number, number]; // e.g. ["primary",4,6]
    isFab?: boolean;
}): {
    bg: string;
    fg: string;
    border?: string;
    shadow?: string;
    radius?: number;
} {
    const intent = theme.roles.intent[intentKey];
    if (!intent) {
        throw new Error(`Intent key '${intentKey}' not found in theme roles`);
    }
    const level = opts?.elevation ?? 0;

    // Base fill/background
    let bg = intent.bg;
    if (opts?.transparent) {
        // transparent/text variant uses no fill; component will rely on fg color
        bg = "transparent";
    }

    // Gradient override
    if (opts?.gradientFromPaletteIndex) {
        const [paletteKey, iA, iB] = opts.gradientFromPaletteIndex;
        const ramp = (theme.palette as any)[paletteKey] as string[];
        const from = ramp[iA];
        const to = ramp[iB];
        bg = `linear-gradient(90deg, ${from}, ${to})`;
    }

    // Outlined override
    const border = opts?.outlined
        ? `1px ${family.border.style} ${intent.border}`
        : undefined;

    // Shadow / elevation
    const shadow = level > 0 ? resolveShadow(theme, family, level) : undefined;

    const radius = opts?.isFab
        ? family.geometry.radius.pill
        : family.geometry.radius.md;

    return {
        bg,
        fg: intent.fg,
        border,
        shadow,
        radius,
    };
}

// Builds the focus ring CSS string for focus state
function buildFocusRing(theme: Theme, family: DesignFamily): string {
    // We combine ringOffset and ringWidth into a single box-shadow inset ring.
    // (Components can apply this to :focus-visible.)
    const ringColor = family.focus.ringColor({ mode: theme.mode });
    const offset = family.focus.ringOffset;
    const width = family.focus.ringWidth;
    // Using inset box-shadow to emulate outline-ring
    return `0 0 0 ${offset}px transparent, 0 0 0 ${offset + width}px ${ringColor} inset`;
}

// Build Button tokens
function buildButtonTokens(theme: Theme, family: DesignFamily): ButtonTokens {
    // density multiplier for Button paddings (fall back to global)
    const densityScale =
        theme.density.components?.Button ?? theme.density.scale ?? 1;

    const padY = space(2) * densityScale; // baseline 8px-ish
    const padX = space(3) * densityScale; // baseline 12px-ish

    const filled = buildVariantFromIntent(theme, family, "primary", { elevation: 2 });
    const outlined = buildVariantFromIntent(theme, family, "primary", { outlined: true, transparent: true, elevation: 0 });
    const text = buildVariantFromIntent(theme, family, "primary", { transparent: true, elevation: 0 });
    const tonal = buildVariantFromIntent(theme, family, "tertiary", { elevation: 0 });
    const elevated = buildVariantFromIntent(theme, family, "primary", { elevation: 3 });
    const gradient = buildVariantFromIntent(theme, family, "primary", { gradientFromPaletteIndex: ["primary", 4, 6], elevation: 2 });
    const fab = buildVariantFromIntent(theme, family, "primary", { elevation: 4, isFab: true });

    // Hover / pressed opacity come from family.feedback and family.transparency if present
    const hoverOpacity = family.transparency?.opacity?.("hover") ?? 0.92;
    const pressedOpacity = family.transparency?.opacity?.("pressed") ?? 0.85;
    const disabledOpacity = family.transparency?.opacity?.("disabled") ?? 0.45;

    // Hover/pressed shadows: bump elevation if available
    const hoverShadowFilled = resolveShadow(theme, family, 3);
    const pressedShadowFilled = resolveShadow(theme, family, 1);

    return {
        radii: family.geometry.radius.md,
        paddings: { x: padX, y: padY },

        variants: {
            filled,
            outlined,
            text,
            tonal,
            elevated,
            gradient,
            fab,
        },

        states: {
            hover: {
                filled: { opacity: hoverOpacity, shadow: hoverShadowFilled },
                elevated: { opacity: hoverOpacity, shadow: hoverShadowFilled },
                gradient: { opacity: hoverOpacity, shadow: hoverShadowFilled },
                fab: { opacity: hoverOpacity, shadow: hoverShadowFilled },
            },
            pressed: {
                filled: { opacity: pressedOpacity, shadow: pressedShadowFilled },
                elevated: { opacity: pressedOpacity, shadow: pressedShadowFilled },
                gradient: { opacity: pressedOpacity, shadow: pressedShadowFilled },
                fab: { opacity: pressedOpacity, shadow: pressedShadowFilled },
            },
            focus: {
                ring: buildFocusRing(theme, family),
            },
            disabled: {
                opacity: disabledOpacity,
            },
        },
    };
}

// Global CSS vars: expose palette, text roles, spacing, motion, radius, etc.
// These vars let plain CSS/SCSS consume tokens without React context.
function buildCssVars(theme: Theme, family: DesignFamily): Record<string, string> {
    const vars: Record<string, string> = {};

    // Core colors
    vars["--th-bg"] = theme.palette.bg;
    vars["--th-fg"] = theme.palette.fg;
    vars["--th-text-primary"] = theme.roles.text.primary;
    vars["--th-text-secondary"] = theme.roles.text.secondary;
    vars["--th-text-muted"] = theme.roles.text.muted;
    vars["--th-text-inverse"] = theme.roles.text.inverse;

    // Surface roles
    vars["--th-surface-base"] = theme.roles.surface.base;
    vars["--th-surface-raised"] = theme.roles.surface.raised;
    vars["--th-surface-overlay"] = theme.roles.surface.overlay;

    // Primary intent colors (for quick utility styling)
    vars["--th-primary-bg"] = theme.roles.intent.primary.bg;
    vars["--th-primary-fg"] = theme.roles.intent.primary.fg;
    vars["--th-primary-border"] = theme.roles.intent.primary.border;

    // Radii from family
    vars["--th-radius-sm"] = `${family.geometry.radius.sm}px`;
    vars["--th-radius-md"] = `${family.geometry.radius.md}px`;
    vars["--th-radius-lg"] = `${family.geometry.radius.lg}px`;
    vars["--th-radius-pill"] = `${family.geometry.radius.pill}px`;

    // Focus ring defaults from family
    vars["--th-focus-ring-width"] = `${family.focus.ringWidth}px`;
    vars["--th-focus-ring-offset"] = `${family.focus.ringOffset}px`;
    vars["--th-focus-ring-color"] = family.focus.ringColor({ mode: theme.mode });

    // Motion tokens (duration/ease) pulled from theme.motion in future; for now
    // we'll derive from theme.motion if you later pipe foundations.motion in Theme.
    // We'll make safe fallbacks:
    vars["--th-transition-default"] = family.motion.transition;

    return vars;
}

export function resolveTokens(theme: Theme, family: DesignFamily): ResolvedTokens {
    const Button = buildButtonTokens(theme, family);

    const cssVars = buildCssVars(theme, family);

    return {
        cssVars,
        components: {
            Button,
        },
        meta: {
            themeId: theme.id,
            familyId: family.id,
            mode: theme.mode,
            densityScale: theme.density.components?.Button ?? theme.density.scale ?? 1,
        },
    };
}
