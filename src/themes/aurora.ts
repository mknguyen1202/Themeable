import { makeTheme } from "./builders";
import { createMonochromaticLevels } from "../foundations/color";
import type { Theme } from "./types";

// A saturated, lively dark theme meant for aurora/glassy families
const levels = createMonochromaticLevels(
    280,  // Vibrant purple/magenta hue (aurora borealis)
    90,   // Very high saturation for vivid aurora effect
    "dark"
);

export const aurora: Theme = makeTheme("aurora", "dark", {
    bg: "#0B0B0C",
    fg: "#F8FAFC",
    primary: levels.primary,
    secondary: levels.secondary,
    tertiary: levels.tertiary,
});