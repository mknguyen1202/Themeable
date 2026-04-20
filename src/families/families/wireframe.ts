import type { DesignFamily } from "../types";
import { rgba } from "../utils";

export const wireframe: DesignFamily = {
    id: "wireframe",
    description: "Low-fidelity outline look for prototyping & skeletons.",
    geometry: { radius: { sm: 4, md: 6, lg: 8, pill: 999 }, shape: "rounded" },
    border: { width: { thin: 1, thick: 1 }, style: "dashed", color: ({ mode }) => mode === "light" ? rgba("#000", .4) : rgba("#fff", .4), emphasize: "border" },
    surface: { background: ({ base }) => base },
    elevation: { 0: { shadow: () => "none" }, 1: { shadow: () => "none" }, 2: { shadow: () => "none" }, 3: { shadow: () => "none" }, 4: { shadow: () => "none" }, 5: { shadow: () => "none" } },
    transparency: { opacity: (s) => s === "disabled" ? .5 : 1 },
    focus: { ringWidth: 1, ringOffset: 2, ringColor: ({ mode }) => mode === "light" ? rgba("#000", .5) : rgba("#fff", .5) },
    motion: { transition: "opacity 120ms ease" },
    feedback: {},
};
