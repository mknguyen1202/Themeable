import type { DesignFamily } from "../types";
import { rgba, composeShadows } from "../utils";

export const material: DesignFamily = {
    id: "material",
    description: "Systematic elevations with overlays, inspired by Material Design.",
    geometry: { radius: { sm: 4, md: 8, lg: 12, pill: 999 }, shape: "rounded" },
    border: { width: { thin: 1, thick: 2 }, style: "solid", color: ({ mode }) => mode === "light" ? rgba("#000", .06) : rgba("#fff", .10), emphasize: "shadow" },
    surface: {
        background: ({ base, mode, level }) => (mode === "dark" && level > 0) ? `linear-gradient(0deg, ${rgba(base, .04 * level)}, ${rgba(base, .04 * level)})` : base,
        effect: ({ level, mode }) => mode === "dark" && level > 0 ? `box-shadow: inset 0 0 0 1px ${rgba("#fff", .04 * level)}` : undefined,
    },
    elevation: {
        0: { shadow: () => "none" },
        1: { shadow: (c) => composeShadows(`0 1px 2px ${c}`, `0 1px 3px ${rgba(c, .66)}`) },
        2: { shadow: (c) => composeShadows(`0 2px 4px ${c}`, `0 3px 6px ${rgba(c, .66)}`) },
        3: { shadow: (c) => composeShadows(`0 4px 8px ${c}`, `0 6px 12px ${rgba(c, .66)}`) },
        4: { shadow: (c) => composeShadows(`0 8px 16px ${c}`, `0 12px 22px ${rgba(c, .66)}`) },
        5: { shadow: (c) => composeShadows(`0 12px 24px ${c}`, `0 18px 30px ${rgba(c, .66)}`) },
    },
    focus: { ringWidth: 3, ringOffset: 2, ringColor: ({ mode }) => mode === "light" ? rgba("#000", .10) : rgba("#fff", .16) },
    motion: { transition: "box-shadow 180ms cubic-bezier(.2,0,.2,1), transform 180ms cubic-bezier(.2,0,.2,1)" },
    feedback: { hoverTransform: "translateY(-1px)", activeTransform: "translateY(0) scale(.98)" },
};
