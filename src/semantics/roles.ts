import type { Mode, Palette, RoleTokens } from "./types";
import { withAlpha } from "../foundations/color";
import { defaultIntentSet } from "./intents";


export function buildRoles(palette: Palette, mode: Mode): RoleTokens {
    const surfaceBase = mode === "light" ? palette.bg : palette.neutral[9];
    const surfaceRaised = mode === "light" ? palette.bg : palette.neutral[8];
    const surfaceOverlay = withAlpha(mode === "light" ? "#FFFFFF" : "#1E293B", mode === "light" ? 0.70 : 0.60);


    const textPrimary = mode === "light" ? "#0F172A" : "#F8FAFC";
    const textSecondary = mode === "light" ? "#334155" : "#CBD5E1";
    const textMuted = mode === "light" ? "#64748B" : "#94A3B8";
    const textInverse = mode === "light" ? "#FFFFFF" : "#0B0B0C";


    const elevationColor = {
        0: withAlpha("#000000", mode === "light" ? 0.08 : 0.32),
        1: withAlpha("#000000", mode === "light" ? 0.12 : 0.40),
        2: withAlpha("#000000", mode === "light" ? 0.16 : 0.50),
        3: withAlpha("#000000", mode === "light" ? 0.20 : 0.58),
        4: withAlpha("#000000", mode === "light" ? 0.26 : 0.66),
        5: withAlpha("#000000", mode === "light" ? 0.34 : 0.74),
    } as const;


    return {
        surface: { base: surfaceBase, raised: surfaceRaised, overlay: surfaceOverlay },
        text: { primary: textPrimary, secondary: textSecondary, muted: textMuted, inverse: textInverse },
        intent: defaultIntentSet(palette, mode),
        elevationColor: elevationColor as any,
    };
}