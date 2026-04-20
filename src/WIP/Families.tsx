/*
 * Themeable — style families catalog
 * Drop this file in src/themeable/families.ts
 *
 * Families define the optical grammar (how surfaces render) and are
 * independent from color themes (Solar/Lunar/Aurora...). Combine with
 * resolveTokens(theme, family) downstream.
 */

// --- Types ---------------------------------------------------------------
export type Elevation = 0 | 1 | 2 | 3 | 4 | 5;

export type DesignFamily = {
    /** Stable identifier to store in user prefs, URLs, etc. */
    id: string;
    /** Short human‑readable description */
    description?: string;

    // Geometry & structure
    geometry: {
        radius: { sm: number; md: number; lg: number; pill: number };
        /** Additional shape hints; components may opt‑in */
        shape?: "rounded" | "square" | "squircular";
    };

    border: {
        width: { thin: number; thick: number };
        style: "none" | "solid" | "dashed" | "double";
        /** color can be a string or a function depending on theme mode */
        color: string | ((args: { mode: "light" | "dark" }) => string);
        emphasize: "border" | "fill" | "shadow";
    };

    surface: {
        /**
         * Resolve a background for a component surface, given the semantic
         * surface colors from the theme. Components pass level and theme mode.
         */
        background: (args: {
            level: Elevation;
            base: string; // theme.roles.surface.base
            raised: string; // theme.roles.surface.raised
            overlay: string; // theme.roles.surface.overlay
            mode: "light" | "dark";
        }) => string;
        /** Optional extra visual effect — e.g., gradient gloss or texture */
        effect?: (args: { level: Elevation; mode: "light" | "dark" }) => string | undefined;
    };

    elevation: Record<Elevation, {
        /**
         * Given a theme-provided elevation color (usually an rgba black/white),
         * return CSS for the cast shadow. Multiple comma-separated shadows allowed.
         */
        shadow: (elevationColor: string, args: { mode: "light" | "dark" }) => string;
        /** Optional inner shadow for pressed/concave optics */
        innerShadow?: (elevationColor: string, args: { mode: "light" | "dark" }) => string;
        /** Optional backdrop layer (glass/frost) */
        backdrop?: (elevationColor: string, args: { mode: "light" | "dark" }) => string;
        /** Optional surface tint on dark mode to lift */
        surfaceTint?: (elevationColor: string, args: { mode: "light" | "dark" }) => string;
    }>;

    transparency?: {
        blur?: (level: Elevation) => string | undefined; // e.g., "blur(12px)"
        opacity?: (state: "idle" | "hover" | "pressed" | "disabled") => number | undefined;
    };

    focus: { ringWidth: number; ringOffset: number; ringColor: (args: { mode: "light" | "dark" }) => string };

    motion: {
        transition: string; // e.g., "transform 180ms var(--ease-std), box-shadow 180ms var(--ease-std)"
        elevate?: string;   // e.g., specific timing for elevation changes
    };

    feedback: {
        hoverTransform?: string;   // e.g., "translateY(-1px)"
        activeTransform?: string;  // e.g., "translateY(0) scale(.98)"
        overlayColor?: (args: { roleBg: string; mode: "light" | "dark" }) => string; // pressed overlay
    };
};

// --- Utilities -----------------------------------------------------------
const rgba = (hexOrRgba: string, alpha: number) => {
    if (hexOrRgba.startsWith("rgba")) return hexOrRgba.replace(/rgba\((.*?),\s*([\d.]+)\)/, (_, g1) => `rgba(${g1}, ${alpha})`);
    const h = hexOrRgba.replace('#', '');
    const bigint = parseInt(h.length === 3 ? h.split('').map(ch => ch + ch).join('') : h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const composeShadows = (...parts: string[]) => parts.filter(Boolean).join(", ");

// --- Families ------------------------------------------------------------

/** 1) Flat / Minimalist */
export const flat: DesignFamily = {
    id: "flat",
    description: "Clean, minimal, low-elevation surfaces with subtle borders.",
    geometry: { radius: { sm: 6, md: 10, lg: 16, pill: 999 }, shape: "rounded" },
    border: {
        width: { thin: 1, thick: 2 },
        style: "solid",
        color: ({ mode }) => mode === "light" ? rgba("#000", 0.08) : rgba("#fff", 0.12),
        emphasize: "fill",
    },
    surface: {
        background: ({ base }) => base,
    },
    elevation: {
        0: { shadow: () => "none" },
        1: { shadow: (c) => `0 1px 2px ${c}` },
        2: { shadow: (c) => `0 2px 6px ${c}` },
        3: { shadow: (c) => `0 4px 10px ${c}` },
        4: { shadow: (c) => `0 8px 18px ${c}` },
        5: { shadow: (c) => `0 12px 28px ${c}` },
    },
    transparency: { opacity: (s) => s === "disabled" ? 0.45 : undefined },
    focus: { ringWidth: 2, ringOffset: 2, ringColor: ({ mode }) => mode === "light" ? rgba("#000", .12) : rgba("#fff", .18) },
    motion: { transition: "transform 160ms ease, box-shadow 160ms ease" },
    feedback: { hoverTransform: "translateY(-1px)", activeTransform: "translateY(0) scale(.99)" },
};

/** 2) Material / Elevation-forward */
export const material: DesignFamily = {
    id: "material",
    description: "Systematic elevations with overlays, inspired by Material Design.",
    geometry: { radius: { sm: 4, md: 8, lg: 12, pill: 999 }, shape: "rounded" },
    border: {
        width: { thin: 1, thick: 2 },
        style: "solid",
        color: ({ mode }) => mode === "light" ? rgba("#000", 0.06) : rgba("#fff", 0.10),
        emphasize: "shadow",
    },
    surface: {
        background: ({ base, mode, level }) => {
            // Dark mode: progressively tint raised surfaces
            if (mode === "dark" && level > 0) return `linear-gradient(0deg, ${rgba(base, 0.04 * level)}, ${rgba(base, 0.04 * level)})`;
            return base;
        },
        effect: ({ level, mode }) => (mode === "dark" && level > 0 ? `box-shadow: inset 0 0 0 1px ${rgba("#fff", 0.04 * level)}` : undefined),
    },
    elevation: {
        0: { shadow: () => "none" },
        1: { shadow: (c) => composeShadows(`0 1px 2px ${c}`, `0 1px 3px ${rgba(c, .66)}`) },
        2: { shadow: (c) => composeShadows(`0 2px 4px ${c}`, `0 3px 6px ${rgba(c, .66)}`) },
        3: { shadow: (c) => composeShadows(`0 4px 8px ${c}`, `0 6px 12px ${rgba(c, .66)}`) },
        4: { shadow: (c) => composeShadows(`0 8px 16px ${c}`, `0 12px 22px ${rgba(c, .66)}`) },
        5: { shadow: (c) => composeShadows(`0 12px 24px ${c}`, `0 18px 30px ${rgba(c, .66)}`) },
    },
    focus: { ringWidth: 3, ringOffset: 2, ringColor: ({ mode }) => mode === "light" ? rgba("#000", .10) : rgba("#fff", .16) },
    motion: { transition: "box-shadow 180ms cubic-bezier(.2,0,.2,1), transform 180ms cubic-bezier(.2,0,.2,1)" },
    feedback: { hoverTransform: "translateY(-1px)", activeTransform: "translateY(0) scale(.98)" },
};

/** 3) Neumorphism / Soft UI (overlay variant) */
export const neumorphOverlay: DesignFamily = {
    id: "neumorphOverlay",
    description: "Soft extrusions with dual shadows and gentle gradients.",
    geometry: { radius: { sm: 12, md: 18, lg: 24, pill: 999 }, shape: "squircular" },
    border: { width: { thin: .5, thick: 1 }, style: "solid", color: ({ mode }) => mode === "light" ? rgba("#fff", .7) : rgba("#000", .3), emphasize: "shadow" },
    surface: {
        background: ({ base, overlay, mode }) => mode === "light"
            ? `linear-gradient(145deg, ${base}, ${overlay})`
            : `linear-gradient(145deg, ${overlay}, ${base})`,
        effect: ({ level }) => level > 2 ? `filter: saturate(1.05)` : undefined,
    },
    elevation: {
        0: { shadow: (c, { mode }) => composeShadows(`inset 1px 1px 2px ${rgba(c, mode === "light" ? .7 : .5)}`, `inset -1px -1px 2px ${rgba("#fff", .7)}`) },
        1: { shadow: (c) => composeShadows(`1px 1px 2px ${c}`, `-1px -1px 2px ${rgba("#fff", .65)}`) },
        2: { shadow: (c) => composeShadows(`2px 3px 6px ${c}`, `-2px -2px 5px ${rgba("#fff", .6)}`) },
        3: { shadow: (c) => composeShadows(`4px 6px 12px ${c}`, `-4px -4px 10px ${rgba("#fff", .55)}`) },
        4: { shadow: (c) => composeShadows(`8px 10px 20px ${c}`, `-8px -8px 18px ${rgba("#fff", .5)}`) },
        5: { shadow: (c) => composeShadows(`12px 16px 30px ${c}`, `-12px -12px 26px ${rgba("#fff", .45)}`) },
    },
    focus: { ringWidth: 3, ringOffset: 4, ringColor: ({ mode }) => mode === "light" ? rgba("#000", .05) : rgba("#fff", .08) },
    motion: { transition: "transform 220ms ease, box-shadow 220ms ease" },
    feedback: { hoverTransform: "translateY(-2px)", activeTransform: "translateY(0)" },
};

/** 4) Glassmorphism / Frosted */
export const glass: DesignFamily = {
    id: "glass",
    description: "Translucent frosted panes with subtle glow edges.",
    geometry: { radius: { sm: 8, md: 12, lg: 18, pill: 999 }, shape: "rounded" },
    border: { width: { thin: 1, thick: 1 }, style: "solid", color: ({ mode }) => mode === "light" ? rgba("#fff", .35) : rgba("#fff", .22), emphasize: "fill" },
    surface: {
        background: ({ overlay, mode }) => mode === "light" ? rgba(overlay, .85) : rgba(overlay, .75),
        effect: () => `background-clip: padding-box`,
    },
    elevation: {
        0: { shadow: (c) => `0 0 1px ${rgba(c, .6)}` },
        1: { shadow: (c) => composeShadows(`0 2px 8px ${c}`, `0 0 0 1px ${rgba("#fff", .10)}`) },
        2: { shadow: (c) => composeShadows(`0 6px 16px ${c}`, `0 0 0 1px ${rgba("#fff", .10)}`) },
        3: { shadow: (c) => composeShadows(`0 12px 24px ${c}`, `0 0 0 1px ${rgba("#fff", .10)}`) },
        4: { shadow: (c) => composeShadows(`0 20px 40px ${c}`, `0 0 0 1px ${rgba("#fff", .10)}`) },
        5: { shadow: (c) => composeShadows(`0 28px 60px ${c}`, `0 0 0 1px ${rgba("#fff", .10)}`) },
    },
    transparency: {
        blur: (level) => `blur(${8 + level * 2}px)`,
        opacity: (state) => state === "disabled" ? 0.5 : undefined,
    },
    focus: { ringWidth: 2, ringOffset: 2, ringColor: ({ mode }) => mode === "light" ? rgba("#fff", .5) : rgba("#fff", .35) },
    motion: { transition: "backdrop-filter 220ms ease, box-shadow 220ms ease, transform 160ms ease" },
    feedback: { hoverTransform: "translateY(-1px)" },
};

/** 5) Brutalist */
export const brutalist: DesignFamily = {
    id: "brutalist",
    description: "Hard edges, thick borders, zero gradients.",
    geometry: { radius: { sm: 0, md: 0, lg: 0, pill: 0 }, shape: "square" },
    border: { width: { thin: 2, thick: 4 }, style: "solid", color: ({ mode }) => mode === "light" ? "#000" : "#fff", emphasize: "border" },
    surface: {
        background: ({ base }) => base,
    },
    elevation: {
        0: { shadow: () => "none" },
        1: { shadow: () => "none" },
        2: { shadow: () => "none" },
        3: { shadow: () => "none" },
        4: { shadow: () => "none" },
        5: { shadow: () => "none" },
    },
    focus: { ringWidth: 0, ringOffset: 0, ringColor: () => "transparent" },
    motion: { transition: "none" },
    feedback: { activeTransform: "translate(0, 0)" },
};

/** 6) Aurora / Neon (glassy + glow) */
export const auroraNeon: DesignFamily = {
    id: "auroraNeon",
    description: "Vibrant gradients, soft glass, colored glow edges.",
    geometry: { radius: { sm: 10, md: 14, lg: 22, pill: 999 }, shape: "rounded" },
    border: { width: { thin: 1, thick: 1 }, style: "solid", color: ({ mode }) => mode === "light" ? rgba("#fff", .4) : rgba("#fff", .28), emphasize: "fill" },
    surface: {
        background: ({ base }) => `linear-gradient(90deg, ${rgba(base, .9)}, ${rgba(base, .7)})`,
        effect: () => `mix-blend-mode: overlay`,
    },
    elevation: {
        0: { shadow: (c) => `0 0 0 1px ${rgba(c, .6)}` },
        1: { shadow: (c) => composeShadows(`0 2px 12px ${rgba(c, .9)}`, `0 0 16px ${rgba("#7cf", .35)}`) },
        2: { shadow: (c) => composeShadows(`0 6px 20px ${rgba(c, .9)}`, `0 0 24px ${rgba("#f7c", .35)}`) },
        3: { shadow: (c) => composeShadows(`0 10px 28px ${rgba(c, .9)}`, `0 0 32px ${rgba("#9f7", .35)}`) },
        4: { shadow: (c) => composeShadows(`0 16px 40px ${rgba(c, .9)}`, `0 0 40px ${rgba("#7cf", .4)}`) },
        5: { shadow: (c) => composeShadows(`0 24px 56px ${rgba(c, .9)}`, `0 0 56px ${rgba("#f7c", .45)}`) },
    },
    transparency: { blur: (level) => `blur(${10 + level * 2}px)` },
    focus: { ringWidth: 2, ringOffset: 2, ringColor: () => rgba("#fff", .6) },
    motion: { transition: "transform 180ms ease, box-shadow 220ms ease, backdrop-filter 220ms ease" },
    feedback: { hoverTransform: "translateY(-1px)", activeTransform: "translateY(0) scale(.985)" },
};

/** 7) Wireframe / Outline */
export const wireframe: DesignFamily = {
    id: "wireframe",
    description: "Low‑fidelity outline look for prototyping & skeletons.",
    geometry: { radius: { sm: 4, md: 6, lg: 8, pill: 999 }, shape: "rounded" },
    border: { width: { thin: 1, thick: 1 }, style: "dashed", color: ({ mode }) => mode === "light" ? rgba("#000", .4) : rgba("#fff", .4), emphasize: "border" },
    surface: { background: ({ base }) => rgba(base, .0) },
    elevation: { 0: { shadow: () => "none" }, 1: { shadow: () => "none" }, 2: { shadow: () => "none" }, 3: { shadow: () => "none" }, 4: { shadow: () => "none" }, 5: { shadow: () => "none" } },
    transparency: { opacity: (s) => s === "disabled" ? .5 : 1 },
    focus: { ringWidth: 1, ringOffset: 2, ringColor: ({ mode }) => mode === "light" ? rgba("#000", .5) : rgba("#fff", .5) },
    motion: { transition: "opacity 120ms ease" },
    feedback: {},
};

// Convenience export of all families
export const families = {
    flat,
    material,
    neumorphOverlay,
    glass,
    brutalist,
    auroraNeon,
    wireframe,
};

export type FamilyId = keyof typeof families;
