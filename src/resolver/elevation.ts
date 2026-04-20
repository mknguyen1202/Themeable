// src/resolver/elevation.ts
import type { ResolutionContext } from "./types";

/**
 * resolveShadow("elevation.control.md", ctx)
 * -> "0 2px 4px rgba(0,0,0,0.2)"
 *
 * We assume ctx.theme.elevation looks like:
 * {
 *   control: {
 *     sm: "0 1px 2px rgba(...)",
 *     md: "0 2px 4px rgba(...)",
 *     lg: "...",
 *     xl: "..."
 *   },
 *   fab: {
 *     sm: "...",
 *     md: "...",
 *     lg: "...",
 *   }
 * }
 */
export function resolveShadow(
    token: string,
    ctx: ResolutionContext
): string {
    // handle "none"
    if (token === "none") return "none";

    // token like "elevation.control.md"
    const parts = token.split(".");
    // ["elevation","control","md"]
    if (parts.length >= 3 && parts[0] === "elevation") {
        const group = parts[1]; // "control" | "fab" ...
        const level = parts[2]; // "sm" | "md" | "lg" | "xl"

        const bucket = ctx.theme.elevation[group];
        if (typeof bucket === "object" && bucket[level]) {
            return bucket[level];
        }
    }

    // Could be already a full box-shadow string.
    return token;
}
