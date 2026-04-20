import type { Elevation, Ramp12 } from "../foundations/types";


export type Mode = "light" | "dark";


// --- Roles --------------------------------------------------------------
export type SurfaceRoles = {
    /** Base page background */
    base: string;
    /** Slightly lifted containers (cards, sheets) */
    raised: string;
    /** Semi‑transparent overlay color for modals, glass, etc. */
    overlay: string;
};


export type TextRoles = {
    primary: string;
    secondary: string;
    muted: string;
    inverse: string; // for dark-on-light or light-on-dark contrast
};


export type IntentRole = {
    fg: string;        // foreground (text/icon) on intent background
    bg: string;        // background fill for intent
    border: string;    // outline color for outlined variants
    /** Brand-toned color for use as text/icon ON the surface (outlined, text variants).
     *  Lighter in dark mode, darker in light mode to ensure contrast. */
    onSurface: string;
    hover?: string;    // optional hover bg tint
    pressed?: string;  // optional pressed bg tint
    focus?: string;    // optional focus ring color
};


export type IntentSet = {
    primary: IntentRole;
    secondary: IntentRole;
    tertiary: IntentRole;

    success: IntentRole;
    warning: IntentRole;
    danger: IntentRole;

    neutral: IntentRole;
    info?: IntentRole;
};


export type ElevationColors = Record<Elevation, string>; // rgba blacks/whites for shadows


export type RoleTokens = {
    surface: SurfaceRoles;
    text: TextRoles;
    intent: IntentSet;
    elevationColor: ElevationColors;
};


// --- Palette (semantic ramps used by themes) ---------------------------
export type Palette = {
    bg: string; // canvas background (used for CSS var injection convenience)
    fg: string; // base foreground

    primary: Ramp12<string>;
    secondary: Ramp12<string>;
    tertiary: Ramp12<string>;

    success: Ramp12<string>;
    warning: Ramp12<string>;
    danger: Ramp12<string>;

    neutral: Ramp12<string>;
    info?: Ramp12<string>;
    accentA?: Ramp12<string>;
    accentB?: Ramp12<string>;
};


// --- States -------------------------------------------------------------
export type StateName = "idle" | "hover" | "pressed" | "focus" | "disabled" | "selected" | "checked" | "invalid";


export type StateRecipe = {
    /**
    * Overlay color painted on top of bg (families may choose blend methods)
    * Typically an rgba derived from role colors (e.g., primary 10%)
    */
    overlay?: string;
    /** Opacity applied to the base element */
    opacity?: number;
    /** Optional transform hint for interactive motion */
    transform?: string;
    /** Optional ring (focus) */
    focusRing?: { width: number; offset: number; color: string };
};

export type StateMap = Partial<Record<StateName, StateRecipe>>;


// --- Density ------------------------------------------------------------
export type DensityId = "comfortable" | "cozy" | "compact";


export type DensityScale = {
    id: DensityId;
    /** global multiplier applied to paddings/margins (1.0 = baseline) */
    scale: number;
    /** component-specific multipliers, optionally override per component */
    components?: Record<string, number>; // e.g., { Button: 0.9, Input: 0.95 }
};


// --- Semantic Package (what themes must provide) -----------------------
export type Semantics = {
    mode: Mode;
    palette: Palette;
    roles: RoleTokens;
    states: StateMap; // default system state overlays
    density: DensityScale; // default density mode
};