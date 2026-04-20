import type { Theme } from "../themes/types";
import { rgba } from "../families/utils";

export function resolveRoleApplication({
    theme,
    tone,
    variant,
    borderWidthPx,
    disabled,
}: {
    theme: Theme;
    tone: string; // "primary" | "danger" | etc.
    variant: | "filled"
    | "filledTonal"
    | "outlined"
    | "text"
    | "elevated"
    | "icon"
    | "segmented"
    | "fab"
    | "fabExtended"
    | "ghost"
    | "custom";
    borderWidthPx: number;
    disabled: boolean;
}) {
    const toneRole = (theme.roles.intent as any)[tone];
    console.log("toneRole", toneRole);
    if (!toneRole) {
        throw new Error(`[resolver/role] tone '${tone}' not found in theme.roles.intent`);
    }

    let bg = "transparent";
    let fg = toneRole.fg;
    let borderColor = "transparent";

    if (variant === "filled" || variant === "filledTonal" || variant === "elevated"
        || variant === "fab" || variant === "fabExtended" || variant === "icon") {
        bg = toneRole.bg;
        fg = toneRole.fg;
    } else if (variant === "outlined") {
        bg = "transparent";
        fg = toneRole.onSurface ?? toneRole.bg;
        borderColor = toneRole.bg;
    } else if (variant === "ghost") {
        bg = "transparent";
        fg = toneRole.onSurface ?? toneRole.bg;
    } else if (variant === "text") {
        bg = "transparent";
        fg = toneRole.onSurface ?? toneRole.bg;
    }

    if (disabled) {
        // dim, desaturate
        bg = rgba(bg === "transparent" ? toneRole.bg : bg, 0.5);
        fg = rgba(fg, 0.6);
        borderColor = rgba(
            borderColor === "transparent" ? toneRole.border : borderColor,
            0.4
        );
    }

    return {
        fg,
        bg,
        borderColor,
        borderWidthPx,
    };
}
