import type { Theme } from "../themes/types";
import type { DesignFamily } from "../families/types";
import type { ResolvedFocusRing } from "./types";

export function resolveFocusRing(theme: Theme, family: DesignFamily): ResolvedFocusRing {
    const { focus } = family;
    return {
        ringColor: focus.ringColor({ mode: theme.mode }),
        ringWidthPx: focus.ringWidth,
        ringOffsetPx: focus.ringOffset,
    };
}
