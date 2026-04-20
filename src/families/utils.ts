export const rgba = (hexOrRgba: string, alpha: number) => {
    if (hexOrRgba.startsWith("rgba")) return hexOrRgba.replace(/rgba\((.*?),\s*([\d.]+)\)/, (_: any, g1: string) => `rgba(${g1}, ${alpha})`);
    const h = hexOrRgba.replace('#', '');
    const bigint = parseInt(h.length === 3 ? h.split('').map(ch => ch + ch).join('') : h, 16);
    const r = (bigint >> 16) & 255; const g = (bigint >> 8) & 255; const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
export const composeShadows = (...parts: string[]) => parts.filter(Boolean).join(", ");
