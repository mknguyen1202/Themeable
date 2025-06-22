// types.ts
export interface HSLAColor {
    h: number; // [0, 360]
    s: number; // [0, 100]
    l: number; // [0, 100]
    a: number; // [0, 1]
}

export interface ColorControlProps {
    hsla: HSLAColor;
    onChange: (color: HSLAColor) => void;
}



export interface ColorControlProps {
    hsla: HSLAColor;
    onChange: (newColor: HSLAColor) => void;
}
