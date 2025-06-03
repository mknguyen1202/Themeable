export type customStyle = {
    sx?: string;
};
export const compileToCss = (style: customStyle): string => {
    if (!style.sx) return '';
    // Here you can add logic to convert the sx string to actual CSS
    // For simplicity, let's assume sx is already a valid CSS string
    return style.sx;
};
