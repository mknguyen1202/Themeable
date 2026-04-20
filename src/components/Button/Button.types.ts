import React from "react";
import type { StateName } from "../../semantics/types";

export type ButtonVariant =
    | "filled"
    | "filledTonal"
    | "outlined"
    | "text"
    | "elevated"
    | "icon"
    | "segmented"
    | "fab"
    | "fabExtended"
    | "custom";

/* ----------------------------------
 * TONES / INTENTS (semantic color role)
 * --------------------------------- */

export type ButtonTone =
    | "primary"
    | "secondary"
    | "tertiary"
    | "success"
    | "warning"
    | "danger"
    | "neutral";

export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = {
    children?: React.ReactNode;

    /** Visual style (filled, outlined, etc.). Default: "filled" */
    variant?: ButtonVariant;

    /** Which intent palette to pull from. Default: "primary" */
    tone?: ButtonTone;

    /** Spacing / height scale. Default: "md" */
    size?: ButtonSize;

    /** Regular disabled. Also forces state="disabled" visually. */
    disabled?: boolean;

    /**
     * Force a hover/pressed/focus/etc. visual state for debugging or docs,
     * without actually hovering/pressing.
     * Normally components derive this from interaction.
     */
    debugState?: Exclude<StateName, "idle">;

    /** Optional extra className to merge onto the button element. */
    className?: string;
} & Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "color" | "disabled"
>;
