import type { ButtonSize } from "./Button.types";

/**
 * Raw (pre-density) sizing recipe per Button size.
 * We'll scale these numbers by density.scale in Button.resolve.ts.
 */
export type ButtonSizeRecipe = {
    paddingX: number;
    paddingY: number;
    gap: number;
    fontSize: string; // use rem/px string so it can drop straight into CSS
    radiusKey: "sm" | "md" | "lg" | "pill";
    minHeight: number;
    fontWeight?: number;
};

export const BUTTON_SIZE_RECIPES: Record<ButtonSize, ButtonSizeRecipe> = {
    sm: {
        paddingX: 12,
        paddingY: 6,
        gap: 6,
        fontSize: "0.8125rem", // ~13px
        radiusKey: "sm",
        minHeight: 28,
        fontWeight: 500,
    },
    md: {
        paddingX: 16,
        paddingY: 8,
        gap: 8,
        fontSize: "0.875rem", // ~14px
        radiusKey: "md",
        minHeight: 32,
        fontWeight: 500,
    },
    lg: {
        paddingX: 20,
        paddingY: 12,
        gap: 8,
        fontSize: "1rem", // 16px
        radiusKey: "lg",
        minHeight: 40,
        fontWeight: 600,
    },
};
