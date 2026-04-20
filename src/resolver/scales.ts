// src/resolver/scales.ts
import type { ResolutionContext } from "./types";

/**
 * resolveSpace("space.md", ctx) -> "12px"
 * resolveSpace("control.height.md", ctx) -> "32px"
 *
 * We allow dotted paths: "space.md", "control.height.md", etc.
 * We'll try to look in theme.space first, then theme.height/minWidth.
 */
export function resolveSpace(token: string, ctx: ResolutionContext): string {
    // Most of your spec keys look like "space.sm" etc.
    // We'll split on "." and just try maps we know.
    const keyParts = token.split(".");

    // Examples:
    // "space.sm"            -> theme.space["sm"]
    // "control.height.md"   -> theme.height["md"]
    // "control.minWidth.md" -> theme.minWidth["md"]

    if (keyParts[0] === "space") {
        const scale = keyParts[1];
        return ctx.theme.space[scale];
    }

    if (keyParts[0] === "control" && keyParts[1] === "height") {
        const scale = keyParts[2];
        return ctx.theme.height[scale];
    }

    if (keyParts[0] === "control" && keyParts[1] === "minWidth") {
        const scale = keyParts[2];
        return ctx.theme.minWidth[scale];
    }

    // fallback: just return the token itself
    // (useful if user gave a raw "8px" etc.)
    return token;
}

/**
 * resolveRadius("control.radius.md", ctx) -> "8px"
 */
export function resolveRadius(token: string, ctx: ResolutionContext): string {
    // token like "control.radius.md"
    const parts = token.split(".");
    // e.g. ["control","radius","md"]
    if (parts.length >= 3) {
        const scale = parts[2];
        if (ctx.theme.radius[`${parts[0]}.${parts[1]}.${scale}`]) {
            // you could also flatten keys inside theme.radius like:
            // "control.radius.md": "8px"
            return ctx.theme.radius[`${parts[0]}.${parts[1]}.${scale}`];
        }
        // or maybe theme.radius.md
        if (ctx.theme.radius[scale]) {
            return ctx.theme.radius[scale];
        }
    }

    // or if it's a simple key like "radius.md"
    if (ctx.theme.radius[token]) {
        return ctx.theme.radius[token];
    }

    return token;
}

/**
 * resolveBorderWidth("control.borderWidth.md", ctx) -> "1px"
 */
export function resolveBorderWidth(
    token: string,
    ctx: ResolutionContext
): string {
    // similar idea to resolveRadius
    if (ctx.theme.borderWidth[token]) {
        return ctx.theme.borderWidth[token];
    }

    const parts = token.split(".");
    // try "control.borderWidth.md"
    if (parts.length >= 3) {
        const maybeKey = `${parts[0]}.${parts[1]}.${parts[2]}`;
        if (ctx.theme.borderWidth[maybeKey]) {
            return ctx.theme.borderWidth[maybeKey];
        }
        // or just the last part like "md"
        const last = parts[parts.length - 1];
        if (ctx.theme.borderWidth[last]) {
            return ctx.theme.borderWidth[last];
        }
    }

    // fallback raw
    return token;
}

/**
 * resolveTypography("text.label-md", ctx) -> { fontSize, fontWeight, lineHeight }
 */
export function resolveTypography(
    token: string,
    ctx: ResolutionContext
): {
    fontSize: string;
    fontWeight: string | number;
    lineHeight: string;
} {
    const typo = ctx.theme.typography[token];
    if (typo) {
        return {
            fontSize: typo.fontSize,
            fontWeight: typo.fontWeight,
            lineHeight: typo.lineHeight
        };
    }

    // Fallback: guess something so component won't crash.
    return {
        fontSize: "14px",
        fontWeight: 500,
        lineHeight: "20px"
    };
}
