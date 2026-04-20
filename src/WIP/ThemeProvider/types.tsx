// ------------------------------
// Types
// ------------------------------

export type Primitive = string | number | boolean | null;
export type JSONValue = Primitive | JSONObject | JSONArray;
export interface JSONObject { [k: string]: JSONValue }
export interface JSONArray extends Array<JSONValue> { }

/** Token reference node: { "$ref": "path.to.token" } */
export type RefNode = { $ref: string } & JSONObject;

/**
 * A minimal shape for the top-level tokens. It's intentionally broad so you
 * can extend with project-specific keys without TS fighting you.
 */
export interface ThemeableTokens extends JSONObject {
    $schema?: string;
    meta?: JSONObject;
    modes?: {
        theme?: string;
        colorScheme?: 'light' | 'dark';
        contrast?: 'standard' | 'high' | string;
        density?: 'compact' | 'cozy' | 'comfortable' | string;
        rtl?: boolean;
        reducedMotion?: boolean;
    };
    aliases?: JSONObject;
    color?: JSONObject;
    opacity?: JSONObject;
    blend?: JSONObject;
    elevation?: JSONObject;
    shadow?: JSONObject;
    radius?: JSONObject;
    border?: JSONObject;
    space?: JSONObject;
    size?: JSONObject;
    typography?: JSONObject;
    motion?: JSONObject;
    focus?: JSONObject;
    density?: JSONObject;
    z?: JSONObject;
    gradient?: JSONObject;
    backdrop?: JSONObject;
    states?: { shared?: string[] } & JSONObject;
    families?: JSONObject;
    cssProps?: Record<string, string>;
    components?: Record<string, JSONObject>;
    modeOverrides?: Record<string, ThemeableTokensOverride>;
}

export type ThemeableTokensOverride = Partial<ThemeableTokens> & JSONObject;

export type ThemeMode = string; // 'solar' | 'lunar' etc. (from tokens.modeOverrides keys)
export type ContrastMode = 'standard' | 'high' | string;
export type DensityMode = 'compact' | 'cozy' | 'comfortable' | string;


export interface ThemeRuntimeModes {
    mode: ThemeMode; // e.g., 'lunar' | 'solar'
    colorScheme?: 'light' | 'dark'; // derived from modeOverrides or forced
    contrast?: ContrastMode;
    density?: DensityMode;
    rtl?: boolean;
    reducedMotion?: boolean;
}


export interface ThemeContextValue {
    tokens: ThemeableTokens;
    theme: ResolvedTheme; // resolved output (includes flat, vars)
    runtime: ThemeRuntimeModes;
    setMode: (mode: ThemeMode) => void;
    setDensity: (density: DensityMode) => void;
    setContrast: (contrast: ContrastMode) => void;
    setRTL: (rtl: boolean) => void;
    setReducedMotion: (rm: boolean) => void;
}