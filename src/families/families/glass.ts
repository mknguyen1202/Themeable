import type { DesignFamily } from "../types";
import { rgba, composeShadows } from "../utils";

export const glass: DesignFamily = {
    id: "glass",
    description: "Translucent frosted panes with subtle glow edges.",
    geometry: {
        radius: { sm: 8, md: 12, lg: 18, pill: 999 },
        shape: "rounded"
    },
    border: {
        width: {
            thin: 1,
            thick: 1
        },
        style: "solid",
        color: ({ mode }) => mode === "light" ? rgba("#fff", .35) : rgba("#fff", .22), emphasize: "fill"
    },
    surface: {
        background: ({ overlay, mode }) => mode === "light" ? rgba(overlay, .85) : rgba(overlay, .75), effect: () => `background-clip: padding-box`
    },
    elevation: {
        0: { shadow: (c) => `0 0 1px ${rgba(c, .6)}` },
        1: { shadow: (c) => composeShadows(`0 2px 8px ${c}`, `0 0 0 1px ${rgba("#fff", .10)}`) },
        2: { shadow: (c) => composeShadows(`0 6px 16px ${c}`, `0 0 0 1px ${rgba("#fff", .10)}`) },
        3: { shadow: (c) => composeShadows(`0 12px 24px ${c}`, `0 0 0 1px ${rgba("#fff", .10)}`) },
        4: { shadow: (c) => composeShadows(`0 20px 40px ${c}`, `0 0 0 1px ${rgba("#fff", .10)}`) },
        5: { shadow: (c) => composeShadows(`0 28px 60px ${c}`, `0 0 0 1px ${rgba("#fff", .10)}`) },
    },
    transparency: { blur: (level) => `blur(${8 + level * 2}px)`, opacity: (s) => s === "disabled" ? .5 : undefined },
    focus: { ringWidth: 2, ringOffset: 2, ringColor: ({ mode }) => mode === "light" ? rgba("#fff", .5) : rgba("#fff", .35) },
    motion: { transition: "backdrop-filter 220ms ease, box-shadow 220ms ease, transform 160ms ease" },
    feedback: { hoverTransform: "translateY(-1px)" },
};
