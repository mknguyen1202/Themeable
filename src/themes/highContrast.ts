import { makeTheme } from "./builders";
import type { Theme } from "./types";

export const highContrast: Theme = makeTheme("highContrast", "dark", {
    bg: "#000000",
    fg: "#FFFFFF",
    primary: ["#FFFFFF", "#EDEDED", "#DBDBDB", "#C9C9C9", "#B7B7B7", "#A5A5A5", "#939393", "#818181", "#6F6F6F", "#5D5D5D", "#4B4B4B", "#393939"],
    secondary: ["#FFFFFF", "#EDEDED", "#DBDBDB", "#C9C9C9", "#B7B7B7", "#A5A5A5", "#939393", "#818181", "#6F6F6F", "#5D5D5D", "#4B4B4B", "#393939"],
    tertiary: ["#FFFFFF", "#EDEDED", "#DBDBDB", "#C9C9C9", "#B7B7B7", "#A5A5A5", "#939393", "#818181", "#6F6F6F", "#5D5D5D", "#4B4B4B", "#393939"],
});