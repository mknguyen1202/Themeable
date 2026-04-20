// src/themeable/ThemeProvider.tsx
import React, { createContext, useContext, useMemo } from "react";
import type { Theme } from "./themes";
import type { DesignFamily } from "./families/types";
import { resolveTokens } from "./resolver/resolveTokens";
import type { ResolvedTokens } from "./resolver/types";

type ThemeCtx = {
    tokens: ResolvedTokens;
};

const ThemeContext = createContext<ThemeCtx | null>(null);

export function ThemeProvider({
    theme,
    family,
    children,
}: {
    theme: Theme;
    family: DesignFamily;
    children: React.ReactNode;
}) {
    const tokens = useMemo(() => resolveTokens(theme, family), [theme, family]);

    // inline style vars at the provider boundary
    const style: React.CSSProperties = {};
    for (const k in tokens.cssVars) {
        (style as any)[k] = tokens.cssVars[k];
    }

    return (
        <ThemeContext.Provider value={{ tokens }}>
            <div style={style} data-theme={tokens.meta.themeId} data-family={tokens.meta.familyId}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export function useThemeTokens() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useThemeTokens must be used inside <ThemeProvider>");
    return ctx.tokens;
}
