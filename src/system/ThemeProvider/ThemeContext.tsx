import React, { createContext, useContext } from "react";
import type { ThemeContextValue } from "./types";

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useThemeContext(): ThemeContextValue {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error(
            "[Themeable] useThemeContext() must be used under <ThemeProvider />"
        );
    }
    return ctx;
}

export { ThemeContext };
