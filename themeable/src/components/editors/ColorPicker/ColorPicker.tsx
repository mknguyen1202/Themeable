import React, { useRef, useState, useEffect } from "react";
import { hslToRgb, rgbToHex, hexToRgb } from "./ColorUtils";

const canvasSize = 200;
const HUE_HEIGHT = 32; // or 30–36, based on thumb height


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
    const [isDragging, setIsDragging] = useState(false);

    const [isHueDragging, setIsHueDragging] = useState(false);
    const [isOpacityDragging, setIsOpacityDragging] = useState(false);


    // RGB Values
    const [r, g, b] = hslToRgb(hue, saturation, lightness);
    const hex = rgbToHex(r, g, b);


    const drawHueStrip = () => {
        const ctx = hueRef.current?.getContext("2d");
        if (!ctx) return;

        const width = canvasSize;
        const height = HUE_HEIGHT; // Use updated height
        const thumbWidth = 8;
        const thumbHeight = 24;
        const radius = thumbWidth / 2;
        const thumbX = (hue / 360) * width;
        const centerX = Math.min(Math.max(thumbX, radius), width - radius);
        const centerY = height / 2;

        // 1. Draw hue gradient bar in the center area (shorter than canvas)
        const stripY = (height - 16) / 2; // centered gradient strip
        ctx.clearRect(0, 0, width, height);
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        for (let i = 0; i <= 360; i += 10) {
            gradient.addColorStop(i / 360, `hsl(${i}, 100%, 50%)`);
        }
        ctx.fillStyle = gradient;
        ctx.fillRect(0, stripY, width, 16);

        // 2. Draw pill-shaped thumb
        ctx.beginPath();
        ctx.moveTo(centerX - radius, centerY - thumbHeight / 2 + radius);
        ctx.arcTo(centerX - radius, centerY + thumbHeight / 2, centerX, centerY + thumbHeight / 2, radius);
        ctx.arcTo(centerX + radius, centerY + thumbHeight / 2, centerX + radius, centerY, radius);
        ctx.arcTo(centerX + radius, centerY - thumbHeight / 2, centerX, centerY - thumbHeight / 2, radius);
        ctx.arcTo(centerX - radius, centerY - thumbHeight / 2, centerX - radius, centerY, radius);
        ctx.closePath();

        // Fill thumb with current hue color
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.fill();

        // First: white outer border (drawn with a wider stroke)
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#fff";
        ctx.stroke();

        // Second: black inner border (drawn on top, narrower)
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000";
        ctx.stroke();



    };

    const handleHueInteraction = (clientX: number) => {
        const rect = hueRef.current!.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, canvasSize));
        const newHue = (x / canvasSize) * 360;
        setHue(newHue);
    };
    const handleHueMouseDown = (e: React.MouseEvent) => {
        setIsHueDragging(true);
        handleHueInteraction(e.clientX);
    };

    const handleHueMouseMove = (e: React.MouseEvent) => {
        if (!isHueDragging) return;
        handleHueInteraction(e.clientX);
    };

    const handleHueMouseUp = () => setIsHueDragging(false);








    const drawOpacityStrip = () => {
        const ctx = opacityRef.current?.getContext("2d");
        if (!ctx) return;

        const width = canvasSize;
        const height = 32;
        const stripHeight = 16;
        const stripY = (height - stripHeight) / 2;
        const squareSize = 5;

        ctx.clearRect(0, 0, width, height);

        // 1. Draw checkerboard pattern ONLY within the gradient strip area
        for (let y = stripY; y < stripY / 2 + stripHeight; y += squareSize) {
            for (let x = 0; x < width; x += squareSize) {
                ctx.fillStyle = (Math.floor(x / squareSize) + Math.floor(y / squareSize)) % 2 === 0 ? "#ccc" : "#fff";
                ctx.fillRect(x, y, squareSize, squareSize);
            }
        }

        // 2. Draw the opacity gradient strip (on top of checkerboard)
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 1)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, stripY, width, stripHeight);

        // 3. Draw the capsule-style thumb (same as before)
        const thumbWidth = 8;
        const thumbHeight = 24;
        const radius = thumbWidth / 2;
        const centerY = height / 2;
        const thumbX = alpha * width;
        const centerX = Math.min(Math.max(thumbX, radius), width - radius);

        ctx.beginPath();
        ctx.moveTo(centerX - radius, centerY - thumbHeight / 2 + radius);
        ctx.arcTo(centerX - radius, centerY + thumbHeight / 2, centerX, centerY + thumbHeight / 2, radius);
        ctx.arcTo(centerX + radius, centerY + thumbHeight / 2, centerX + radius, centerY, radius);
        ctx.arcTo(centerX + radius, centerY - thumbHeight / 2, centerX, centerY - thumbHeight / 2, radius);
        ctx.arcTo(centerX - radius, centerY - thumbHeight / 2, centerX - radius, centerY, radius);
        ctx.closePath();

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();

        // White outer border
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#fff";
        ctx.stroke();

        // Black inner border
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000";
        ctx.stroke();
    };

    const handleOpacityInteraction = (clientX: number) => {
        const rect = opacityRef.current!.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, canvasSize));
        setAlpha(x / canvasSize);
    };

    const handleOpacityMouseDown = (e: React.MouseEvent) => {
        setIsOpacityDragging(true);
        handleOpacityInteraction(e.clientX);
    };

    const handleOpacityMouseMove = (e: React.MouseEvent) => {
        if (!isOpacityDragging) return;
        handleOpacityInteraction(e.clientX);
    };

    const handleOpacityMouseUp = () => {
        setIsOpacityDragging(false);
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
        ctx.arc(pickerPos.x, pickerPos.y, 10, 0, 2 * Math.PI);
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(pickerPos.x, pickerPos.y, 8, 0, 2 * Math.PI);
        ctx.strokeStyle = "#fff";
        ctx.stroke();

    };

    const handlePickerInteraction = (clientX: number, clientY: number) => {
        const rect = pickerRef.current!.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, canvasSize));
        const y = Math.max(0, Math.min(clientY - rect.top, canvasSize));

        const sat = (x / canvasSize) * 100;
        const light = 100 - (y / canvasSize) * 100;

        setSaturation(sat);
        setLightness(light);
        setPickerPos({ x, y });
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        handlePickerInteraction(e.clientX, e.clientY);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        handlePickerInteraction(e.clientX, e.clientY);
    };

    const handleMouseUp = () => setIsDragging(false);








    useEffect(() => {
        drawHueStrip();
        drawOpacityStrip();
        drawPicker();
    }, [hue, r, g, b, alpha]);

    useEffect(() => {
        const stopDragging = () => setIsDragging(false);
        window.addEventListener("mouseup", stopDragging);
        return () => window.removeEventListener("mouseup", stopDragging);
    }, []);

    useEffect(() => {
        const stopDragging = () => setIsHueDragging(false);
        window.addEventListener("mouseup", stopDragging);
        return () => window.removeEventListener("mouseup", stopDragging);
    }, []);

    useEffect(() => {
        const stopDragging = () => setIsOpacityDragging(false);
        window.addEventListener("mouseup", stopDragging);
        return () => window.removeEventListener("mouseup", stopDragging);
    }, []);



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
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{ cursor: "crosshair", border: "1px solid #ccc" }}
            />

            <canvas
                ref={hueRef}
                width={canvasSize}
                height={HUE_HEIGHT}
                onMouseDown={handleHueMouseDown}
                onMouseMove={handleHueMouseMove}
                onMouseUp={handleHueMouseUp}
                onMouseLeave={handleHueMouseUp}
                style={{ marginTop: 10, cursor: "pointer" }}
            />

            <canvas
                ref={opacityRef}
                width={canvasSize}
                height={32}
                onMouseDown={handleOpacityMouseDown}
                onMouseMove={handleOpacityMouseMove}
                onMouseUp={handleOpacityMouseUp}
                onMouseLeave={handleOpacityMouseUp}
                style={{
                    marginTop: 10,
                    cursor: "pointer"
                }}
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
