import type { DensityScale } from "./types";


export const comfortable: DensityScale = {
    id: "comfortable",
    scale: 1.0,
};


export const cozy: DensityScale = {
    id: "cozy",
    scale: 0.92,
    components: { Button: 0.9, Input: 0.94, Chip: 0.88 },
};


export const compact: DensityScale = {
    id: "compact",
    scale: 0.84,
    components: { Button: 0.8, Input: 0.86, Chip: 0.82, TableRow: 0.76 },
};


export const densityPresets = { comfortable, cozy, compact } as const;
export type DensityPresetId = keyof typeof densityPresets;