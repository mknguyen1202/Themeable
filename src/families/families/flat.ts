import type { DesignFamily } from "../types";
import { rgba } from "../utils";

export const flat: DesignFamily = {
    id: "flat",
    description: "Clean, minimal, low-elevation surfaces with subtle borders.",
    geometry: { radius: { sm: 6, md: 10, lg: 16, pill: 999 }, shape: "rounded" },
    border: { width: { thin: 1, thick: 2 }, style: "solid", color: ({ mode }) => mode === "light" ? rgba("#000", .08) : rgba("#fff", .12), emphasize: "fill" },
    surface: { background: ({ base }) => base },
    elevation: {
        0: { shadow: () => "none" },
        1: { shadow: (c) => `0 1px 2px ${c}` },
        2: { shadow: (c) => `0 2px 6px ${c}` },
        3: { shadow: (c) => `0 4px 10px ${c}` },
        4: { shadow: (c) => `0 8px 18px ${c}` },
        5: { shadow: (c) => `0 12px 28px ${c}` },
    },
    transparency: { opacity: (s) => s === "disabled" ? .45 : undefined },
    focus: { ringWidth: 2, ringOffset: 2, ringColor: ({ mode }) => mode === "light" ? rgba("#000", .12) : rgba("#fff", .18) },
    motion: { transition: "transform 160ms ease, box-shadow 160ms ease" },
    feedback: { hoverTransform: "translateY(-1px)", activeTransform: "translateY(0) scale(.99)" },
};
