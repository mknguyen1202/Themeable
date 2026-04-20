import type { Elevation } from "../foundations/types.js";
// export type Elevation = 0 | 1 | 2 | 3 | 4 | 5;
import type { Mode, StateName } from "../semantics/types.js";

export type DesignFamily = {
    id: string;
    description?: string;
    geometry: {
        radius: {
            sm: number;
            md: number;
            lg: number;
            pill: number
        };
        shape?: "rounded" | "square" | "squircular"
    };
    border: {
        width: {
            thin: number;
            thick: number
        };
        style: "none" | "solid" | "dashed" | "double";
        color: string | ((a: { mode: Mode }) => string);
        emphasize: "border" | "fill" | "shadow";
    };
    surface: {
        background: (a: {
            level: Elevation;
            base: string;
            raised: string;
            overlay: string;
            mode: Mode
        }) => string;
        effect?: (a: {
            level: Elevation;
            mode: Mode
        }) => string | undefined
    };
    elevation: Record<Elevation, {
        shadow: (elevationColor: string, a: { mode: Mode }) => string;
        innerShadow?: (elevationColor: string, a: { mode: Mode }) => string;
        backdrop?: (elevationColor: string, a: { mode: Mode }) => string;
        surfaceTint?: (elevationColor: string, a: { mode: Mode }) => string
    }>;
    transparency?: {
        blur?: (level: Elevation) => string | undefined;
        opacity?: (state: StateName) => number | undefined
    };
    focus: {
        ringWidth: number;
        ringOffset: number;
        ringColor: (a: { mode: Mode }) => string
    };
    motion: {
        transition: string;
        elevate?: string
    };
    feedback: {
        hoverTransform?: string;
        activeTransform?: string;
        overlayColor?: (a: {
            roleBg: string;
            mode: Mode
        }) => string
    };
};
