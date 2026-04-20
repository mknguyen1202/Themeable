export type Ramp12<T = string> = [T, T, T, T, T, T, T, T, T, T, T, T];
export type Elevation = 0 | 1 | 2 | 3 | 4 | 5;


export type FontWeights = {
    thin: number;
    extralight: number;
    light: number;
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
    extrabold: number;
    black: number;
};

export type FontSizes = {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    display: number;
};

export type LineHeights = {
    tight: number;
    normal: number;
    relaxed: number;
};

export type SpacingScale = {
    unit: number;
    steps: Record<string, number>
};

export type MotionDurations = {
    instant: number;
    fast: number;
    base: number;
    slow: number;
    deliberate: number
};
export type MotionEasing = {
    standard: string;
    emphasized: string;
    decel: string;
    accel: string
};


export type Radii = {
    none: number;
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    pill: number;
    circular: number
};


export type ShadowMetric = {
    y: number;
    blur: number;
    spread: number
};

export type ElevationMetrics = Record<Elevation, ShadowMetric>;