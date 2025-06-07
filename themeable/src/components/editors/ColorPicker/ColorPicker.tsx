import React, { useRef, useState, useEffect } from "react";
import { hslToRgb, rgbToHex, hexToRgb } from "./ColorUtils";

const canvasSize = 200;

export const ColorPicker: React.FC = () => {
    const [hue, setHue] = useState(0);
    const [saturation, setSaturation] = useState(100);
    const [lightness, setLightness] = useState(50);
    const [alpha, setAlpha] = useState(1);
    const [showHSL, setShowHSL] = useState(false);

    const pickerRef = useRef<HTMLCanvasElement>(null);
    const hueRef = useRef<HTMLCanvasElement>(null);
    const opacityRef = useRef<HTMLCanvasElement>(null);

    const [pickerPos, setPickerPos] = useState<{ x: number; y: number }>({ x: canvasSize - 1, y: 0 });


    // RGB Values
    const [r, g, b] = hslToRgb(hue, saturation, lightness);
    const hex = rgbToHex(r, g, b);


    const drawHueStrip = () => {
        const ctx = hueRef.current?.getContext("2d");
        if (!ctx) return;

        const gradient = ctx.createLinearGradient(0, 0, canvasSize, 0);
        for (let i = 0; i <= 360; i += 10) {
            gradient.addColorStop(i / 360, `hsl(${i}, 100%, 50%)`);
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvasSize, 20);
    };

    const drawOpacityStrip = () => {
        const ctx = opacityRef.current?.getContext("2d");
        if (!ctx) return;

        const width = canvasSize;
        const height = 20;
        const squareSize = 5;

        // Draw checkerboard background
        for (let y = 0; y < height; y += squareSize) {
            for (let x = 0; x < width; x += squareSize) {
                ctx.fillStyle = (x / squareSize + y / squareSize) % 2 === 0 ? "#ccc" : "#fff";
                ctx.fillRect(x, y, squareSize, squareSize);
            }
        }

        // Draw transparency gradient on top
        const rgba = `rgba(${r}, ${g}, ${b}, `;
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, `${rgba}0)`);
        gradient.addColorStop(1, `${rgba}1)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
    };


    const drawPicker = () => {
        const ctx = pickerRef.current?.getContext("2d");
        if (!ctx) return;

        const width = canvasSize;
        const height = canvasSize;

        const gradient1 = ctx.createLinearGradient(0, 0, width, 0);
        gradient1.addColorStop(0, "white");
        gradient1.addColorStop(1, `hsl(${hue}, 100%, 50%)`);
        ctx.fillStyle = gradient1;
        ctx.fillRect(0, 0, width, height);

        const gradient2 = ctx.createLinearGradient(0, 0, 0, height);
        gradient2.addColorStop(0, "transparent");
        gradient2.addColorStop(1, "black");
        ctx.fillStyle = gradient2;
        ctx.fillRect(0, 0, width, height);

        ctx.beginPath();
        ctx.arc(pickerPos.x, pickerPos.y, 5, 0, 2 * Math.PI);
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(pickerPos.x, pickerPos.y, 3, 0, 2 * Math.PI);
        ctx.strokeStyle = "#fff";
        ctx.stroke();

    };

    useEffect(() => {
        drawHueStrip();
        drawOpacityStrip();
        drawPicker();
    }, [hue, r, g, b]);

    const handleHueClick = (e: React.MouseEvent) => {
        const rect = hueRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const newHue = (x / canvasSize) * 360;
        setHue(newHue);
    };

    const handleOpacityClick = (e: React.MouseEvent) => {
        const rect = opacityRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const newAlpha = x / canvasSize;
        setAlpha(newAlpha);
    };

    const handlePickerClick = (e: React.MouseEvent) => {
        const rect = pickerRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const sat = (x / canvasSize) * 100;
        const light = 100 - (y / canvasSize) * 100;

        setSaturation(sat);
        setLightness(light);
        setPickerPos({ x, y });
    };


    return (
        <div style={{ fontFamily: "sans-serif", maxWidth: 250 }}>
            <canvas
                ref={pickerRef}
                width={canvasSize}
                height={canvasSize}
                onClick={handlePickerClick}
                style={{ cursor: "crosshair", border: "1px solid #ccc" }}
            />
            <canvas
                ref={hueRef}
                width={canvasSize}
                height={20}
                onClick={handleHueClick}
                style={{ marginTop: 10, cursor: "pointer", border: "1px solid #ccc" }}
            />
            <canvas
                ref={opacityRef}
                width={canvasSize}
                height={20}
                onClick={handleOpacityClick}
                style={{ marginTop: 10, cursor: "pointer", border: "1px solid #ccc" }}
            />

            <div style={{ marginTop: 10 }}>
                <label>Hex:</label>
                <input
                    type="text"
                    value={hex.toUpperCase()}
                    onChange={(e) => {
                        try {
                            const [r, g, b] = hexToRgb(e.target.value);
                            // naive conversion back to HSL; better with full conversion lib
                            setSaturation(100);
                            setLightness(50);
                        } catch { }
                    }}
                    style={{ width: "100%", padding: "4px", marginTop: 4 }}
                />
            </div>

            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <button onClick={() => setShowHSL(!showHSL)}>
                    Toggle {showHSL ? "RGBA" : "HSLA"}
                </button>

                {showHSL ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <label>
                            H
                            <input
                                type="number"
                                value={Math.round(hue)}
                                min={0}
                                max={360}
                                onChange={(e) => setHue(Number(e.target.value))}
                                style={{ width: 50, marginLeft: 4 }}
                            />
                        </label>
                        <label>
                            S
                            <input
                                type="number"
                                value={Math.round(saturation)}
                                min={0}
                                max={100}
                                onChange={(e) => setSaturation(Number(e.target.value))}
                                style={{ width: 50, marginLeft: 4 }}
                            />
                        </label>
                        <label>
                            L
                            <input
                                type="number"
                                value={Math.round(lightness)}
                                min={0}
                                max={100}
                                onChange={(e) => setLightness(Number(e.target.value))}
                                style={{ width: 50, marginLeft: 4 }}
                            />
                        </label>
                        <label>
                            A
                            <input
                                type="number"
                                step={0.01}
                                value={alpha.toFixed(2)}
                                min={0}
                                max={1}
                                onChange={(e) => setAlpha(Number(e.target.value))}
                                style={{ width: 50, marginLeft: 4 }}
                            />
                        </label>
                        <button
                            onClick={() =>
                                navigator.clipboard.writeText(
                                    `hsla(${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(lightness)}%, ${alpha.toFixed(2)})`
                                )
                            }
                        >
                            Copy
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <label>
                            R
                            <input
                                type="number"
                                value={r}
                                min={0}
                                max={255}
                                onChange={() => { }}
                                style={{ width: 50, marginLeft: 4 }}
                            />
                        </label>
                        <label>
                            G
                            <input
                                type="number"
                                value={g}
                                min={0}
                                max={255}
                                onChange={() => { }}
                                style={{ width: 50, marginLeft: 4 }}
                            />
                        </label>
                        <label>
                            B
                            <input
                                type="number"
                                value={b}
                                min={0}
                                max={255}
                                onChange={() => { }}
                                style={{ width: 50, marginLeft: 4 }}
                            />
                        </label>
                        <label>
                            A
                            <input
                                type="number"
                                step={0.01}
                                value={alpha.toFixed(2)}
                                min={0}
                                max={1}
                                onChange={(e) => setAlpha(Number(e.target.value))}
                                style={{ width: 50, marginLeft: 4 }}
                            />
                        </label>
                        <button
                            onClick={() =>
                                navigator.clipboard.writeText(
                                    `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`
                                )
                            }
                        >
                            Copy
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
};
