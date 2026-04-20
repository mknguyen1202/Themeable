// src/resolver/color.ts
import type { ResolutionContext } from "./types";

/**
 * Parse something like "role.primary.bg/solid"
 * -> { tone: "primary", channel: "bg", variant: "solid" }
 *
 * Or "role.disabled.fg" -> { tone: "disabled", channel: "fg", variant: undefined }
 */
function parseRoleToken(token: string): {
    tone: string;
    channel: "bg" | "fg" | "border" | string;
    variant?: string;
} | null {
    // Examples:
    // "role.primary.bg/solid"
    // "role.primary.fg/onSolid"
    // "role.disabled.fg"
    // "role.neutral.border/strong"

    if (!token.startsWith("role.")) return null;

    // strip "role."
    const withoutPrefix = token.slice("role.".length); // "primary.bg/solid"
    // split tone from the rest: "primary", "bg/solid"
    const firstDot = withoutPrefix.indexOf(".");
    if (firstDot === -1) return null;

    const tone = withoutPrefix.slice(0, firstDot); // "primary"
    const rest = withoutPrefix.slice(firstDot + 1); // "bg/solid"

    // now split channel + optional variant "bg/solid"
    const [channel, variantMaybe] = rest.split("/");

    return {
        tone,
        channel: channel as any,
        variant: variantMaybe
    };
}

/**
 * resolveRoleColor("role.primary.bg/solid", ctx)
 * => "#3478f6" (actual color string)
 */
export function resolveRoleColor(
    token: string,
    ctx: ResolutionContext
): string {
    // Non-role tokens (e.g. raw "#fff" or "transparent")
    // just pass through
    if (!token.startsWith("role.")) {
        return token;
    }

    const parsed = parseRoleToken(token);
    if (!parsed) {
        return token;
    }

    const { tone, channel, variant } = parsed;

    // Find the role bucket first
    const roleBucket = ctx.theme.roles[tone];
    if (!roleBucket) {
        // try disabledRoleKey fallback
        if (tone === "disabled" || ctx.theme.disabledRoleKey === tone) {
            const disabledBucket = ctx.theme.roles[ctx.theme.disabledRoleKey ?? "disabled"];
            if (!disabledBucket) return token;
            return lookupChannel(disabledBucket, channel, variant) ?? token;
        }
        return token;
    }

    const result = lookupChannel(roleBucket, channel, variant);
    return result ?? token;
}

/**
 * channel "bg" | "fg" | "border"
 *
 * If we have variant:
 *   roleBucket.bg[variant]
 * otherwise:
 *   roleBucket.bg.default ?? roleBucket.bg.solid ?? ...
 */
function lookupChannel(
    roleBucket: {
        bg?: Record<string, string>;
        fg?: Record<string, string>;
        border?: Record<string, string>;
    },
    channel: string,
    variant?: string
): string | undefined {
    switch (channel) {
        case "bg":
            return pickVariant(roleBucket.bg, variant);
        case "fg":
            return pickVariant(roleBucket.fg, variant);
        case "border":
            return pickVariant(roleBucket.border, variant);
        default:
            // If you invent future channels like "outline", etc.
            const anyChannel = (roleBucket as any)[channel];
            return pickVariant(anyChannel, variant);
    }
}

function pickVariant(
    bucket: Record<string, string> | undefined,
    variant?: string
): string | undefined {
    if (!bucket) return undefined;
    if (variant && bucket[variant]) return bucket[variant];

    // try common fallbacks:
    if (bucket.default) return bucket.default;
    if (bucket.solid) return bucket.solid;
    if (bucket.soft) return bucket.soft;

    // last-ditch "take first value"
    const firstKey = Object.keys(bucket)[0];
    return firstKey ? bucket[firstKey] : undefined;
}
