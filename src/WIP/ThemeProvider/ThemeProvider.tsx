/*
 * Themeable React <ThemeProvider>
 * - Consumes theme tokens (themeable.tokens.json) + resolver (themeable.resolver.ts)
 * - Applies mode overrides (e.g., 'solar' | 'lunar'), emits CSS variables
 * - Syncs with system color scheme if desired
 * - Supports density, rtl, reducedMotion, high-contrast attributes
 * - SSR-friendly helpers included (ThemeScript, getInitialCSS)
 */

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ThemeableTokens, ResolvedTheme } from './themeable.resolver';
import { resolveTokens, attachStyleTag, toCSSVariables } from './themeable.resolver';

// ------------------------------
// Types
// ------------------------------

export type ThemeMode = string; // 'solar' | 'lunar' etc. (from tokens.modeOverrides keys)
export type ContrastMode = 'standard' | 'high' | string;
export type DensityMode = 'compact' | 'cozy' | 'comfortable' | string;

export interface ThemeRuntimeModes {
    mode: ThemeMode;              // e.g., 'lunar' | 'solar'
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

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>');
    return ctx;
}

// ------------------------------
// Utilities
// ------------------------------

function getSystemColorScheme(): 'light' | 'dark' {
    if (typeof window === 'undefined' || !window.matchMedia) return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setRootAttrs(el: HTMLElement, attrs: Record<string, string | boolean | undefined>) {
    Object.entries(attrs).forEach(([k, v]) => {
        if (v === undefined) return;
        const attrName = `data-${k}`;
        if (typeof v === 'boolean') {
            if (v) el.setAttribute(attrName, '');
            else el.removeAttribute(attrName);
            return;
        }
        el.setAttribute(attrName, String(v));
    });
}

// ------------------------------
// Provider
// ------------------------------

export interface ThemeProviderProps {
    tokens: ThemeableTokens;            // your JSON tokens
    initialMode?: ThemeMode;            // default mode key in tokens.modeOverrides (e.g., 'lunar')
    followSystem?: boolean;             // if true, sync colorScheme with system
    cssVarPrefix?: string;              // default 't'
    scopeSelector?: string;             // element selector to scope vars; default ':root'
    styleTagId?: string;                // id for <style> tag
    /** Optionally override density/contrast/rtl/reducedMotion at start */
    defaults?: Partial<ThemeRuntimeModes>;
    children?: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    tokens,
    initialMode,
    followSystem = true,
    cssVarPrefix = 't',
    scopeSelector = ':root',
    styleTagId = 'themeable-vars',
    defaults,
    children,
}) => {
    // Determine initial mode: explicit → tokens.modes.theme → first override key → 'lunar'
    const defaultMode: ThemeMode = useMemo(() => {
        if (initialMode) return initialMode;
        if (tokens?.modes?.theme) return tokens.modes.theme as ThemeMode;
        const keys = Object.keys(tokens.modeOverrides ?? {});
        return (keys[0] ?? 'lunar') as ThemeMode;
    }, [initialMode, tokens]);

    const [mode, setMode] = useState<ThemeMode>(defaultMode);
    const [density, setDensity] = useState<DensityMode>(defaults?.density ?? (tokens?.modes?.density ?? 'cozy'));
    const [contrast, setContrast] = useState<ContrastMode>(defaults?.contrast ?? (tokens?.modes?.contrast ?? 'standard'));
    const [rtl, setRTL] = useState<boolean>(defaults?.rtl ?? !!tokens?.modes?.rtl);
    const [reducedMotion, setReducedMotion] = useState<boolean>(defaults?.reducedMotion ?? !!tokens?.modes?.reducedMotion);

    // colorScheme derived from mode override (if present), otherwise from system when followSystem
    const colorScheme: 'light' | 'dark' | undefined = useMemo(() => {
        const override = tokens.modeOverrides?.[mode]?.modes?.colorScheme as 'light' | 'dark' | undefined;
        if (override) return override;
        return followSystem ? getSystemColorScheme() : tokens.modes?.colorScheme as any;
    }, [tokens, mode, followSystem]);

    // Resolve tokens when mode/density/contrast/etc change
    const theme: ResolvedTheme = useMemo(() => resolveTokens(tokens, { mode, cssVarPrefix }), [tokens, mode, cssVarPrefix]);

    // Apply CSS variables
    useEffect(() => {
        attachStyleTag(theme, scopeSelector, styleTagId);
    }, [theme, scopeSelector, styleTagId]);

    // Root attributes for selectors (e.g., [data-contrast="high"], [data-density="compact"]) & dir
    useEffect(() => {
        const root = document.documentElement;
        setRootAttrs(root, {
            theme: mode,
            colorScheme,
            contrast,
            density,
            rtl,
            reducedMotion,
        });
        document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    }, [mode, colorScheme, contrast, density, rtl, reducedMotion]);

    // Listen to system color scheme if followSystem
    useEffect(() => {
        if (!followSystem || typeof window === 'undefined' || !window.matchMedia) return;
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = () => {
            // Setting data-color-scheme only; tokens are already mode-controlled.
            setRootAttrs(document.documentElement, { colorScheme: mq.matches ? 'dark' : 'light' });
        };
        mq.addEventListener?.('change', handler);
        return () => mq.removeEventListener?.('change', handler);
    }, [followSystem]);

    const value = useMemo<ThemeContextValue>(() => ({
        tokens,
        theme,
        runtime: { mode, colorScheme: colorScheme as any, contrast, density, rtl, reducedMotion },
        setMode,
        setDensity,
        setContrast,
        setRTL,
        setReducedMotion,
    }), [tokens, theme, mode, colorScheme, contrast, density, rtl, reducedMotion]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// ------------------------------
// SSR Helpers
// ------------------------------

/** Render CSS variables string for SSR <style> tag. */
export function getInitialCSS(tokens: ThemeableTokens, mode: ThemeMode, cssVarPrefix = 't', scopeSelector = ':root') {
    const theme = resolveTokens(tokens, { mode, cssVarPrefix });
    return toCSSVariables(theme, scopeSelector);
}

/** Inline script to set html[data-*] attrs before React hydration to prevent FOUC. */
export const ThemeScript: React.FC<{ mode: ThemeMode; rtl?: boolean } & { attrId?: string }> = ({ mode, rtl, attrId = 'themeable-attrs' }) => {
    const code = `(() => { try { var d=document.documentElement; d.setAttribute('data-theme','${mode}'); d.setAttribute('data-colorScheme', (window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light'); ${rtl ? `d.dir='rtl';` : ''} } catch(e){} })();`;
    return <script id={attrId} dangerouslySetInnerHTML={{ __html: code }} />;
};

// ------------------------------
// Convenience Components
// ------------------------------

export const ThemeSwitcher: React.FC<{ modes?: ThemeMode[] }> = ({ modes }) => {
    const { runtime, setMode } = useTheme();
    const list = modes ?? Object.keys((useTheme().tokens.modeOverrides ?? {}));
    return (
        <div style={{ display: 'flex', gap: 8 }}>
            {list.map((m) => (
                <button
                    key={m}
                    onClick={() => setMode(m)}
                    style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid var(--t-color-border-strong)', background: runtime.mode === m ? 'var(--t-gradient-primarylinear)' : 'transparent', color: runtime.mode === m ? 'var(--t-color-fg-onaccent)' : 'var(--t-color-fg-primary)' }}
                >
                    {m}
                </button>
            ))}
        </div>
    );
};

// ------------------------------
// Example: Hooked styles for Button
// ------------------------------

/**
 * Example React hook: build an inline style for a given component/slot
 * using the resolver (variant/tone/state composition + cssProps mapping).
 */
export function useComponentStyle(component: string, slot: string, opts?: { variant?: string; tone?: string; state?: string }) {
    const { theme } = useTheme();
    const { getComponentStyle } = require('./themeable.resolver') as typeof import('./themeable.resolver');
    return useMemo(() => getComponentStyle(theme, { component, variant: opts?.variant, tone: opts?.tone, state: opts?.state }, slot), [theme, component, slot, opts?.variant, opts?.tone, opts?.state]);
}

// ------------------------------
// Usage Example (for docs)
// ------------------------------
/**
import tokens from './themeable.tokens.json';

export default function App() {
  return (
    <ThemeProvider tokens={tokens} initialMode="lunar" followSystem cssVarPrefix="t">
      <Toolbar />
      <ThemeSwitcher />
      <MyButton />
    </ThemeProvider>
  );
}

function MyButton() {
  const style = useComponentStyle('Button', 'container', { variant: 'filled', state: 'hover' });
  return <button style={style}>Hello</button>;
}
*/
