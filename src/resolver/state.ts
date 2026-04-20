import type { Theme } from "../themes/types";
import type { DesignFamily } from "../families/types";
import type { StateName } from "../semantics/types";
import type { ResolvedInteractionState } from "./types";

/**
 * Combine theme.states + family.feedback to produce overlay color, transform,
 * and any opacity overrides for the given interactive state.
 */
export function resolveInteractionState({
    theme,
    family,
    state,
    roleBgForOverlay,
}: {
    theme: Theme;
    family: DesignFamily;
    state: StateName;
    roleBgForOverlay: string;
}): ResolvedInteractionState {
    const baseRecipe = theme.states[state] ?? {};

    let overlayColor = baseRecipe.overlay;
    if (!overlayColor && family.feedback?.overlayColor) {
        overlayColor = family.feedback.overlayColor({
            roleBg: roleBgForOverlay,
            mode: theme.mode,
        });
    }
    if (!overlayColor) overlayColor = "transparent";

    let transform = baseRecipe.transform;
    if (!transform && family.feedback) {
        if (state === "pressed" && family.feedback.activeTransform) {
            transform = family.feedback.activeTransform;
        } else if (state === "hover" && family.feedback.hoverTransform) {
            transform = family.feedback.hoverTransform;
        }
    }
    if (!transform) transform = "none";

    return {
        overlayColor,
        transform,
        stateOpacity: baseRecipe.opacity,
    };
}
