import type { DesignFamily } from "../types";
import { rgba, composeShadows } from "../utils";

export const auroraNeon: DesignFamily = {
    id: "auroraNeon",
    description: "Vibrant gradients, soft glass, colored glow edges.",
    geometry: {
        radius: {
            sm: 10, md: 14, lg: 22, pill: 999
        }, shape: "rounded"
    },
    border: {
        width: {
            thin: 1,
            thick: 1
        },
        style: "solid",
        color: ({ mode }) => mode === "light" ? rgba("#fff", .4) : rgba("#fff", .28), emphasize: "fill"
    },
    surface: { background: ({ base }) => `linear-gradient(90deg, ${rgba(base, .9)}, ${rgba(base, .7)})`, effect: () => `mix-blend-mode: overlay` },
    elevation: {
        0: { shadow: (c, { primaryColor }) => `0 0 0 1px ${rgba(primaryColor!, .4)}` },
        1: { shadow: (c, { primaryColor }) => composeShadows(`0 2px 12px ${rgba(c, .9)}`, `0 0 16px ${rgba(primaryColor!, .35)}`) },
        2: { shadow: (c, { primaryColor }) => composeShadows(`0 6px 20px ${rgba(c, .9)}`, `0 0 24px ${rgba(primaryColor!, .40)}`) },
        3: { shadow: (c, { primaryColor }) => composeShadows(`0 10px 28px ${rgba(c, .9)}`, `0 0 32px ${rgba(primaryColor!, .45)}`) },
        4: { shadow: (c, { primaryColor }) => composeShadows(`0 16px 40px ${rgba(c, .9)}`, `0 0 40px ${rgba(primaryColor!, .50)}`) },
        5: { shadow: (c, { primaryColor }) => composeShadows(`0 24px 56px ${rgba(c, .9)}`, `0 0 56px ${rgba(primaryColor!, .55)}`) },
    },
    transparency: { blur: (level) => `blur(${10 + level * 2}px)` },
    focus: { ringWidth: 2, ringOffset: 2, ringColor: () => rgba("#fff", .6) },
    motion: { transition: "transform 180ms ease, box-shadow 220ms ease, backdrop-filter 220ms ease" },
    feedback: { hoverTransform: "translateY(-1px)", activeTransform: "translateY(0) scale(.985)" },
};
