import { makeTheme } from "./builders";
import { createMonochromaticLevels } from "../foundations/color";
import type { Theme } from "./types";

const levels = createMonochromaticLevels(
    210,   // Blue hue (210° = blue) - Change this number to change the color
    100,    // Saturation (0-100) - Higher = more vibrant
    "light"
);

export const solar: Theme = makeTheme("solar", "light", {
    primary: levels.primary,
    secondary: levels.secondary,
    tertiary: levels.tertiary,
});