export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    s /= 100;
    l /= 100;

    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
        Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));
    return [f(0), f(8), f(4)];
}

export function rgbToHex(r: number, g: number, b: number): string {
    return `#${[r, g, b].map(x => x.toString(16).padStart(2, "0")).join("")}`;
}

export function hexToRgb(hex: string): [number, number, number] {
    const raw = hex.replace("#", "");
    const bigint = parseInt(raw, 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}
