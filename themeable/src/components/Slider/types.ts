export interface Thumb {
    id: number;
    value: number;
}


export type SliderProps = {
    className?: string;
    disabled?: boolean;
    min?: number;
    max?: number;
    step?: number;
    thumbs: Thumb[];
    onThumbsChange: (thumbs: Thumb[]) => void;
};