import { neutralRamp, rampFromEndpoints, withAlpha } from "../foundations";
import { comfortable } from "../semantics/density";
import { defaultStates } from "../semantics/states";
import { buildRoles } from "../semantics/roles";
import type { Theme } from "./types";
import type { Palette, Mode } from "../semantics";

export function buildPalette(base: Partial<Palette>): Palette {
    // Provide robust defaults + allow targeted overrides
    const primary = base.primary ?? rampFromEndpoints("#FFE6D5", "#7C2D12"); // warm orange
    const secondary = base.secondary ?? rampFromEndpoints("#E6FFF5", "#064E3B"); // mint/teal
    const tertiary = base.tertiary ?? rampFromEndpoints("#EEF2FF", "#1D1945"); // indigo
    const success = base.success ?? rampFromEndpoints("#ECFDF5", "#065F46");
    const warning = base.warning ?? rampFromEndpoints("#FFFBEB", "#78350F");
    const danger = base.danger ?? rampFromEndpoints("#FEF2F2", "#7F1D1D");

    return {
        bg: base.bg ?? "#FFFFFF",
        fg: base.fg ?? "#0F172A",
        neutral: base.neutral ?? neutralRamp,
        primary, secondary, tertiary, success, warning, danger,
        info: base.info,
        accentA: base.accentA,
        accentB: base.accentB,
    };
}

export function makeTheme(id: string, mode: Mode, paletteOverrides: Partial<Palette> = {}): Theme {

    const palette = buildPalette({ ...paletteOverrides, bg: paletteOverrides.bg ?? (mode === "light" ? "#FFFFFF" : "#0B0B0C"), fg: paletteOverrides.fg ?? (mode === "light" ? "#0F172A" : "#F8FAFC") });
    const roles = buildRoles(palette, mode);

    return {
        id,
        label: id[0].toUpperCase() + id.slice(1),
        mode,
        palette,
        roles,
        states: defaultStates,
        density: comfortable,
    };
}

// Convenience helper for translucent overlays in dark variants
export const overlay = (hex: string, a = 0.7) => withAlpha(hex, a);