import type { DesignFamily } from "../types";
import { rgba } from "../utils";

export const brutalist: DesignFamily = {
    id: "brutalist",
    description: "Hard edges, thick borders, zero gradients.",
    geometry: { radius: { sm: 0, md: 0, lg: 0, pill: 0 }, shape: "square" },
    border: { width: { thin: 2, thick: 4 }, style: "solid", color: () => "currentColor", emphasize: "border" },
    surface: { background: ({ base }) => base },
    elevation: { 0: { shadow: () => "none" }, 1: { shadow: () => "none" }, 2: { shadow: () => "none" }, 3: { shadow: () => "none" }, 4: { shadow: () => "none" }, 5: { shadow: () => "none" } },
    focus: { ringWidth: 3, ringOffset: 2, ringColor: ({ mode }) => mode === "light" ? rgba("#000", .9) : rgba("#fff", .9) },
    motion: { transition: "none" },
    feedback: { activeTransform: "translate(0, 0)" },
};
