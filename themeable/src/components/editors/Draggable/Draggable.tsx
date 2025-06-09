import React, { useRef, useState, useEffect } from "react";

const canvasSize = 200;

export const Draggable: React.FC = () => {
    const pickerRef = useRef<HTMLCanvasElement>(null);
    const [hue, setHue] = useState(0);
    const [pickerPos, setPickerPos] = useState<{ x: number; y: number }>({
        x: canvasSize - 1,
        y: 0,
    });
    const [isDragging, setIsDragging] = useState(false);

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
        setPickerPos({ x, y });
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        handlePickerInteraction(e.clientX, e.clientY);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) handlePickerInteraction(e.clientX, e.clientY);
        };

        const handleMouseUp = () => setIsDragging(false);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);

    useEffect(() => {
        drawPicker();
    }, [hue, pickerPos]);

    return (
        <div className="draggable">
            <canvas
                ref={pickerRef}
                width={canvasSize}
                height={canvasSize}
                style={{ cursor: "crosshair", borderRadius: 4 }}
                onMouseDown={handleMouseDown}
            />
        </div>
    );
};
