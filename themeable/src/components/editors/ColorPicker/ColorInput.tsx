import React, { useState, useEffect } from "react";
import { hslToRgb, rgbToHsl, rgbToHex, hexToRgb } from "./ColorUtils";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const ColorInput: React.FC = () => {
    const [mode, setMode] = useState<'rgba' | 'hsla'>('rgba');

    const [r, setR] = useState(255);
    const [g, setG] = useState(0);
    const [b, setB] = useState(0);
    const [h, setH] = useState(0);
    const [s, setS] = useState(100);
    const [l, setL] = useState(50);
    const [a, setA] = useState(1);
    const [hex, setHex] = useState(rgbToHex(r, g, b));

    // Update HSL when RGB changes
    useEffect(() => {
        if (mode === "rgba") {
            const [newR, newG, newB] = hslToRgb(h, s, l);
            setR(newR);
            setG(newG);
            setB(newB);
            setHex(rgbToHex(newR, newG, newB));
        }
        else {
            const [newH, newS, newL] = rgbToHsl(r, g, b);
            setH(newH);
            setS(newS);
            setL(newL);
            setHex(rgbToHex(r, g, b));
        }
    }, [mode]);

    // Update RGB when HSL changes
    useEffect(() => {
        const [newR, newG, newB] = hslToRgb(h, s, l);
        setR(newR);
        setG(newG);
        setB(newB);
        setHex(rgbToHex(newR, newG, newB));
    }, [h, s, l]);

    // Update RGB and HSL when HEX changes
    const handleHexChange = (value: string) => {

        if (mode === "rgba") {

            const rgb = hexToRgb(value);
            setR(rgb[0]);
            setG(rgb[1]);
            setB(rgb[2]);
        }
        else {
            const rgb = hexToRgb(value);
            const [newH, newS, newL] = rgbToHsl(rgb[0], rgb[1], rgb[2]);
            setH(newH);
            setS(newS);
            setL(newL);
        }
        setHex(value);
    };

    const toggleMode = () => {
        setMode(prev => (prev === "rgba" ? "hsla" : "rgba"));
    };

    return (
        <div style={{ fontFamily: "sans-serif", padding: "1rem" }}>
            <button onClick={toggleMode}>
                Toggle to {mode === "rgba" ? "HSLA" : "RGBA"}
            </button>

            <div style={{ marginTop: "1rem" }}>
                {mode === "rgba" ? (
                    <>
                        <label>R: <input type="number" min={0} max={255} value={r} onChange={e => setR(clamp(+e.target.value, 0, 255))} /></label><br />
                        <label>G: <input type="number" min={0} max={255} value={g} onChange={e => setG(clamp(+e.target.value, 0, 255))} /></label><br />
                        <label>B: <input type="number" min={0} max={255} value={b} onChange={e => setB(clamp(+e.target.value, 0, 255))} /></label><br />
                    </>
                ) : (
                    <>
                        <label>H: <input type="number" min={0} max={360} value={h} onChange={e => setH(clamp(+e.target.value, 0, 360))} /></label><br />
                        <label>S: <input type="number" min={0} max={100} value={s} onChange={e => setS(clamp(+e.target.value, 0, 100))} /></label><br />
                        <label>L: <input type="number" min={0} max={100} value={l} onChange={e => setL(clamp(+e.target.value, 0, 100))} /></label><br />
                    </>
                )}
                <label>A: <input type="number" step={0.01} min={0} max={1} value={a} onChange={e => setA(clamp(+e.target.value, 0, 1))} /></label><br />
                <label>HEX: <input type="text" value={hex} onChange={e => handleHexChange(e.target.value)} /></label>
            </div>

            <div style={{ marginTop: "1rem", width: 100, height: 40, background: `rgba(${r},${g},${b},${a})`, border: "1px solid #000" }} />
        </div>
    );
};
