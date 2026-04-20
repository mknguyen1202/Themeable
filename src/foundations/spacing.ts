import type { SpacingScale } from "./types";


export const spacing: SpacingScale = {
    unit: 4, // 4px baseline grid
    steps: {
        0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 7: 28, 8: 32,
        9: 36, 10: 40, 12: 48, 14: 56, 16: 64, 20: 80, 24: 96, 28: 112, 32: 128
    } as unknown as Record<string, number>
};
export const space = (n: number) => (spacing.steps as any)[n] ?? n * spacing.unit;