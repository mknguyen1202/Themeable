import type { DesignFamily } from "../types";
import { rgba, composeShadows } from "../utils";
import { lighten } from "../../foundations/color";

export const neumorphism: DesignFamily = {
    id: "neumorphism",
    description: "Soft extrusions with dual shadows and gentle gradients.",
    geometry: {
        radius: {
            sm: 12, md: 18, lg: 24, pill: 999
        }, shape: "squircular"
    },
    border: {
        width: {
            thin: .5, thick: 1
        }, style: "solid", color: ({ mode }) => mode === "light" ? rgba("#fff", .7) : rgba("#000", .3), emphasize: "shadow"
    },
    surface: {
        background: ({ base, overlay, mode }) => mode === "light" ? `linear-gradient(145deg, ${base}, ${overlay})` : `linear-gradient(145deg, ${overlay}, ${base})`,
        effect: ({ level }) => level > 2 ? `filter: saturate(1.05)` : undefined,
    },
    elevation: {
        0: { shadow: (c, { mode, surfaceBase }) => composeShadows(`inset 1px 1px 2px ${rgba(c, mode === "light" ? .7 : .5)}`, `inset -1px -1px 2px ${rgba(lighten(surfaceBase!, mode === "light" ? 10 : 6), .9)}`) },
        1: { shadow: (c, { mode, surfaceBase }) => composeShadows(`1px 1px 2px ${c}`, `-1px -1px 2px ${rgba(lighten(surfaceBase!, mode === "light" ? 12 : 8), .85)}`) },
        2: { shadow: (c, { mode, surfaceBase }) => composeShadows(`2px 3px 6px ${c}`, `-2px -2px 5px ${rgba(lighten(surfaceBase!, mode === "light" ? 12 : 8), .80)}`) },
        3: { shadow: (c, { mode, surfaceBase }) => composeShadows(`4px 6px 12px ${c}`, `-4px -4px 10px ${rgba(lighten(surfaceBase!, mode === "light" ? 12 : 8), .75)}`) },
        4: { shadow: (c, { mode, surfaceBase }) => composeShadows(`8px 10px 20px ${c}`, `-8px -8px 18px ${rgba(lighten(surfaceBase!, mode === "light" ? 12 : 8), .70)}`) },
        5: { shadow: (c, { mode, surfaceBase }) => composeShadows(`12px 16px 30px ${c}`, `-12px -12px 26px ${rgba(lighten(surfaceBase!, mode === "light" ? 12 : 8), .65)}`) },
    },
    focus: { ringWidth: 3, ringOffset: 4, ringColor: ({ mode }) => mode === "light" ? rgba("#000", .05) : rgba("#fff", .08) },
    motion: { transition: "transform 220ms ease, box-shadow 220ms ease" },
    feedback: { hoverTransform: "translateY(-2px)", activeTransform: "translateY(0)" },
};
