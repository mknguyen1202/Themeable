export type ShadowData = {
    offsetX: string;
    offsetY: string;
    blurRadius: string;
    spreadRadius: string;
    color?: string;
    inset: boolean;
    enabled?: boolean;
};

export type ShadowProps = {
    shadowData: ShadowData;
    onChange: (updated: ShadowData) => void;
    onRemove: () => void;
    onReset: () => void;
};