import type { MotionDurations, MotionEasing } from "./types";


export const durations: MotionDurations = {
    instant: 0,
    fast: 120,
    base: 180,
    slow: 260,
    deliberate: 360,
};


export const easing: MotionEasing = {
    standard: "cubic-bezier(.2, 0, .2, 1)",
    emphasized: "cubic-bezier(.2, 0, 0, 1)",
    decel: "cubic-bezier(0, 0, .2, 1)",
    accel: "cubic-bezier(.4, 0, 1, 1)",
};


export const motionVars: Record<string, string | number> = {
    "--ease-std": easing.standard,
    "--ease-emph": easing.emphasized,
    "--dur-fast": `${durations.fast}ms`,
    "--dur-base": `${durations.base}ms`,
};