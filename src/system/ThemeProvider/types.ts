import type { Theme } from "../../themes/types";
import type { FamilyId } from "../../families";
import type { DesignFamily } from "../../families/types";

export type ThemeProviderProps = {
    /**
     * e.g. solar, lunar, aurora...
     * Required. Comes straight from /themes (already shaped as Semantics).
     */
    theme: Theme;

    /**
     * Which visual treatment to apply (flat, glass, neumorphOverlay, etc.)
     * Required.
     */
    family: FamilyId;

    /**
     * Optional override for density ("comfortable" | "cozy" | "compact").
     * If not provided, we use theme.density from /semantics/density.
     */
    densityId?: Theme["density"]["id"];

    /**
     * Normally you wrap your app or subtree with it.
     */
    children: React.ReactNode;
};

export type ThemeContextValue = {
    /** The raw Theme object (palette, roles, states, density...) */
    theme: Theme;

    /** The currently selected DesignFamily object (flat, glass, etc.) */
    family: DesignFamily;

    /**
     * Active density scale after override resolution.
     * Equivalent shape to semantics DensityScale.
     */
    density: Theme["density"];
};
