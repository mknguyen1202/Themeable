import { makeTheme } from "./builders";
import { createMonochromaticLevels } from "../foundations/color";
import type { Theme } from "./types";

const levels = createMonochromaticLevels(
    220,  // Cool blue hue (like moonlight)
    75,   // Moderate saturation for dark theme
    "dark"
);

export const lunar: Theme = makeTheme("lunar", "dark", {
    bg: "#0B1220", // deep slate canvas
    fg: "#F1F5F9",
    primary: levels.primary,
    secondary: levels.secondary,
    tertiary: levels.tertiary,
});