import { withAlpha } from "../foundations/color";
import type { StateMap } from "./types";


/**
* Default system state overlays; families may still modify via optics.
* These are conservative values that should work across light/dark.
*/
export const defaultStates: StateMap = {
    hover: { overlay: withAlpha("#000000", 0.04) },
    pressed: { overlay: withAlpha("#000000", 0.08), transform: "translateY(0) scale(.99)" },
    focus: { focusRing: { width: 3, offset: 2, color: withAlpha("#1D4ED8", 0.45) } },
    disabled: { opacity: 0.45 },
    selected: { overlay: withAlpha("#3B82F6", 0.12) },
    checked: { overlay: withAlpha("#10B981", 0.12) },
    invalid: { overlay: withAlpha("#EF4444", 0.10) },
};


// Helpers to derive state overlays from an intent color
export const overlayFromRole = (hex: string) => ({
    hover: { overlay: withAlpha(hex, 0.10) },
    pressed: { overlay: withAlpha(hex, 0.18) },
    focus: { focusRing: { width: 3, offset: 2, color: withAlpha(hex, 0.45) } },
});