import { contrastRatio } from "../foundations/color";


export type WCAGLevel = "AA" | "AAA";


export function meetsContrast(fg: string, bg: string, level: WCAGLevel = "AA", isLargeText = false): boolean {
    const ratio = contrastRatio(fg, bg);
    if (level === "AAA") return isLargeText ? ratio >= 4.5 : ratio >= 7;
    return isLargeText ? ratio >= 3 : ratio >= 4.5;
}


export function assertContrast(fg: string, bg: string, context: string) {
    if (!meetsContrast(fg, bg)) {
        // eslint-disable-next-line no-console
        console.warn(`[Themeable:a11y] Low contrast for ${context}: fg ${fg} on bg ${bg}. Consider adjusting ramps or roles.`);
    }
}