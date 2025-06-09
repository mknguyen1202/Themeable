export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    s /= 100;
    l /= 100;

    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
        Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));
    return [f(0), f(8), f(4)];
}



export function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
    r /= 255;
    g /= 255;
    b /= 255;
    console.log(`Converting RGB(${r}, ${g}, ${b}) to HSL...`);
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s: number, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const delta = max - min;
        s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
        switch (max) {
            case r: h = ((g - b) / delta + (g < b ? 6 : 0)); break; // red is sector 0-120
            case g: h = ((b - r) / delta + 2); break;   // green is sector 120-240, +2 shifts into the correct 60* slice
            case b: h = ((r - g) / delta + 4); break;   // blue is sector 240-360
        }
        h *= 60;
    }

    console.log(`Converted RGB(${r}, ${g}, ${b}) to HSL(${h}, ${s * 100}%, ${l * 100}%)`);

    return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}


export function rgbToHex(r: number, g: number, b: number): string {
    return `#${[r, g, b].map(x => x.toString(16).padStart(2, "0")).join("")}`;
}

export function hexToRgb(hex: string): [number, number, number] {
    const raw = hex.replace("#", "");
    const bigint = parseInt(raw, 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}
