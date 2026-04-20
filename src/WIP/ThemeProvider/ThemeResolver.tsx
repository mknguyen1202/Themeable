/*
 * Themeable Token Types + Resolver → CSS Variables
 * -------------------------------------------------
 * - Strong TS types for the core token shapes (loose enough for extension)
 * - Runtime-safe resolver with $ref resolution, modeOverrides merge, and cycle detection
 * - Utilities to emit CSS variables (string), CSSStyleSheet, and JS object maps
 * - Helpers for retrieving component/variant/state recipes
 */

// ------------------------------
// TypeScript Types
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

// ------------------------------
// Utility: path helpers
// ------------------------------

/** Get a nested value by a dot-path. Returns undefined if not found. */
export function getPath(obj: JSONValue, path: string): JSONValue | undefined {
    const parts = path.split('.');
    let cur: any = obj;
    for (const p of parts) {
        if (cur && typeof cur === 'object' && p in cur) cur = (cur as any)[p];
        else return undefined;
    }
    return cur as JSONValue;
}

/** Set a nested value by dot-path, constructing objects as needed. */
export function setPath(obj: any, path: string, value: JSONValue) {
    const parts = path.split('.');
    let cur = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        const p = parts[i];
        if (!(p in cur) || typeof cur[p] !== 'object' || cur[p] === null) cur[p] = {};
        cur = cur[p];
    }
    cur[parts[parts.length - 1]] = value as any;
}

/** Convert a token path to a CSS custom property name. */
export function pathToVar(path: string, prefix = 't'): string {
    return `--${prefix}-` + path.replace(/[^a-zA-Z0-9]+/g, '-').replace(/(^-|-$)/g, '').toLowerCase();
}

/** Kebab-case a key for CSS output */
export function toKebab(key: string): string {
    return key.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
}

// ------------------------------
// Deep merge (immutable)
// ------------------------------

export function deepMerge<T extends JSONValue>(a: T, b: Partial<T>): T {
    if (Array.isArray(a) && Array.isArray(b)) return ([...a, ...b] as unknown) as T;
    if (isObj(a) && isObj(b)) {
        const out: any = { ...a };
        for (const k of Object.keys(b)) {
            const av = (a as any)[k];
            const bv = (b as any)[k];
            if (av !== undefined && isObj(av) && isObj(bv)) out[k] = deepMerge(av, bv);
            else out[k] = clone(bv);
        }
        return out;
    }
    return clone((b as unknown) as T) ?? clone(a);
}

function isObj(x: any): x is JSONObject { return !!x && typeof x === 'object' && !Array.isArray(x); }
function clone<T>(x: T): T { return isObj(x) ? (JSON.parse(JSON.stringify(x)) as T) : (Array.isArray(x) ? (x.slice() as any) : x); }

// ------------------------------
// Resolver: apply mode + resolve $ref
// ------------------------------

export interface ResolveOptions {
    /** Which modeOverride key to apply, e.g., 'solar' | 'lunar'. */
    mode?: string;
    /** Custom CSS variable prefix (default: 't'). */
    cssVarPrefix?: string;
    /** If true, leave $ref nodes unresolved but converted to var() references when possible. */
    lazyRefsToVars?: boolean;
}

export interface ResolvedTheme {
    /** Fully merged tokens after mode override application (still contains $ref). */
    merged: ThemeableTokens;
    /** Deep-resolved tokens with all $ref replaced with final values. */
    resolved: ThemeableTokens;
    /** Flat map of path → final primitive for emission. */
    flat: Record<string, Primitive>;
    /** Map of path → CSS variable name (e.g., --t-color-bg-surface) */
    vars: Record<string, string>;
}

/** Public entry: merge mode overrides then resolve refs into concrete values. */
export function resolveTokens(base: ThemeableTokens, opts: ResolveOptions = {}): ResolvedTheme {
    const { mode } = opts;
    const merged = mode && base.modeOverrides?.[mode] ? (deepMerge(base, base.modeOverrides[mode]) as ThemeableTokens) : clone(base);

    // Resolve $ref with cycle detection
    const visited = new Set<string>();
    const memo = new Map<JSONValue, JSONValue>();

    function resolveNode(node: JSONValue, path: string): JSONValue {
        if (memo.has(node as any)) return memo.get(node as any)!;
        if (isObj(node) && '$ref' in node) {
            const refPath = String((node as any)['$ref']);
            if (visited.has(refPath)) throw new Error(`Circular $ref detected at ${path} → ${refPath}`);
            visited.add(refPath);
            const target = getPath(merged, refPath);
            if (target === undefined) throw new Error(`Unresolvable $ref: ${refPath} (from ${path})`);
            const value = resolveNode(target, refPath);
            visited.delete(refPath);
            memo.set(node as any, value);
            return value;
        }
        if (Array.isArray(node)) {
            const arr = node.map((v, i) => resolveNode(v, `${path}[${i}]`));
            memo.set(node as any, arr);
            return arr as JSONArray;
        }
        if (isObj(node)) {
            const out: JSONObject = {};
            for (const [k, v] of Object.entries(node)) out[k] = resolveNode(v, path ? `${path}.${k}` : k);
            memo.set(node as any, out);
            return out;
        }
        return node; // primitive
    }

    const resolved = resolveNode(merged, '') as ThemeableTokens;

    // Flatten to path → primitive (skip objects/arrays) for variable emission
    const flat: Record<string, Primitive> = {};
    (function walk(n: JSONValue, p: string) {
        if (Array.isArray(n)) return; // do not emit arrays as vars
        if (isObj(n)) {
            for (const [k, v] of Object.entries(n)) walk(v, p ? `${p}.${k}` : k);
            return;
        }
        if (typeof n === 'string' || typeof n === 'number' || typeof n === 'boolean' || n === null) flat[p] = n as Primitive;
    })(resolved, '');

    const vars: Record<string, string> = {};
    for (const path of Object.keys(flat)) vars[path] = pathToVar(path, opts.cssVarPrefix ?? 't');

    return { merged, resolved, flat, vars };
}

// ------------------------------
// Emitters: CSS variables, stylesheet, object map
// ------------------------------

/** Create a CSS string of custom properties for :root or a scope. */
export function toCSSVariables(theme: ResolvedTheme, scope = ':root'): string {
    const lines: string[] = [`${scope} {`];
    for (const [path, value] of Object.entries(theme.flat)) {
        // stringify primitives; leave null as empty string
        const text = value === null ? '' : String(value);
        lines.push(`  ${theme.vars[path]}: ${text};`);
    }
    lines.push('}');
    return lines.join('\n');
}

/** Attach a <style> tag to document with variables. Returns the element. */
export function attachStyleTag(theme: ResolvedTheme, scope = ':root', id = 'themeable-vars'): HTMLStyleElement {
    const css = toCSSVariables(theme, scope);
    const el = document.getElementById(id) as HTMLStyleElement | null;
    if (el) { el.textContent = css; return el; }
    const style = document.createElement('style');
    style.id = id;
    style.textContent = css;
    document.head.appendChild(style);
    return style;
}

/** Build a JS object mapping CSS var names → values, useful for inline styles. */
export function toCSSVarObject(theme: ResolvedTheme): Record<string, string> {
    const out: Record<string, string> = {};
    for (const [path, value] of Object.entries(theme.flat)) out[theme.vars[path]] = String(value ?? '');
    return out;
}

// ------------------------------
// Component helpers
// ------------------------------

export interface ComponentQuery {
    component: string;
    variant?: string;
    tone?: string;
    state?: string;
}

/** Get a component subtree from resolved tokens. */
export function getComponent(theme: ResolvedTheme, name: string): JSONObject | undefined {
    const comp = getPath(theme.resolved as any, `components.${name}`);
    return (isObj(comp) ? (comp as JSONObject) : undefined);
}

/**
 * Get a computed style recipe for a component slot by composing base + variant + tone + state
 * and converting known CSS logical keys into actual CSS properties using cssProps map.
 */
export function getComponentStyle(theme: ResolvedTheme, q: ComponentQuery, slot: string): Record<string, string | number> {
    const comp = getComponent(theme, q.component);
    if (!comp) return {};
    const cssProps = (theme.resolved.cssProps || {}) as Record<string, string>;

    const base = (comp.style?.base?.[slot] ?? {}) as JSONObject;
    const byVariant = q.variant ? ((comp.style?.byVariant?.[q.variant]?.[slot] ?? {}) as JSONObject) : {};
    const byTone = q.tone ? ((comp.style?.byTone?.[q.tone]?.[slot] ?? {}) as JSONObject) : {};
    const byState = q.state ? ((comp.style?.byState?.[q.state]?.[slot] ?? {}) as JSONObject) : {};

    const composed = [base, byVariant, byTone, byState].reduce((acc, cur) => deepMerge(acc, cur), {} as JSONObject);

    // Map logical keys → real CSS properties
    const out: Record<string, string | number> = {};
    for (const [k, v] of Object.entries(composed)) {
        const cssKey = cssProps[k] ?? toKebab(k);
        out[cssKey] = v as any;
    }
    return out;
}

// ------------------------------
// Example usage (keep for docs; tree-shaken in prod)
// ------------------------------

/**
 * Example: apply a given mode and emit variables to :root
 *
 * import tokens from './themeable.tokens.json';
 * const theme = resolveTokens(tokens, { mode: 'solar', cssVarPrefix: 't' });
 * attachStyleTag(theme, ':root');
 *
 * // Get a Button container style for hover state
 * const btnHover = getComponentStyle(theme, { component: 'Button', variant: 'filled', state: 'hover' }, 'container');
 * // -> { 'background-color': '#3B6CFB', 'box-shadow': '...', ... }
 */
