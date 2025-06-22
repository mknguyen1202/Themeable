import React, { useEffect, useRef, useCallback, useState } from 'react';
import { ColorControlProps } from './types';

const SIZE = 200;

const Saturation: React.FC<ColorControlProps> = ({ hsla, onChange }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Render gradient
    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;
        const { h } = hsla;

        ctx.fillStyle = `hsl(${h}, 100%, 50%)`;
        ctx.fillRect(0, 0, SIZE, SIZE);

        const whiteGrad = ctx.createLinearGradient(0, 0, SIZE, 0);
        whiteGrad.addColorStop(0, 'white');
        whiteGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = whiteGrad;
        ctx.fillRect(0, 0, SIZE, SIZE);

        const blackGrad = ctx.createLinearGradient(0, 0, 0, SIZE);
        blackGrad.addColorStop(0, 'transparent');
        blackGrad.addColorStop(1, 'black');
        ctx.fillStyle = blackGrad;
        ctx.fillRect(0, 0, SIZE, SIZE);
    }, [hsla.h]);

    // Handle pixel -> S/L
    const updateFromPosition = useCallback(
        (clientX: number, clientY: number) => {
            const rect = canvasRef.current!.getBoundingClientRect();
            const x = Math.max(0, Math.min(SIZE, clientX - rect.left));
            const y = Math.max(0, Math.min(SIZE, clientY - rect.top));

            const isAtBottom = y >= SIZE - 1; // near bottom edge

            const saturation = isAtBottom ? 100 : (x / SIZE) * 100;

            const topL = 100 - (x / SIZE) * 50;
            const lightness = topL + (y / SIZE) * (0 - topL);

            onChange({ ...hsla, s: saturation, l: lightness });
        },
        [hsla, onChange]
    );


    // Setup global mousemove/up
    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            if (isDragging) updateFromPosition(e.clientX, e.clientY);
        };
        const stop = () => setIsDragging(false);

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', stop);
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', stop);
        };
    }, [isDragging, updateFromPosition]);

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDragging(true);
        updateFromPosition(e.clientX, e.clientY);
    };

    // Draw picker circle
    const topL = 100 - (hsla.s / 100) * 50;
    const pickerY = ((topL - hsla.l) / topL) * SIZE;
    const pickerX = (hsla.s / 100) * SIZE;

    return (
        <div style={{ position: 'relative', width: SIZE, height: SIZE }}>
            <canvas
                ref={canvasRef}
                width={SIZE}
                height={SIZE}
                onMouseDown={handleMouseDown}
                style={{ cursor: 'crosshair', borderRadius: '4px' }}
            />
            <div
                style={{
                    position: 'absolute',
                    left: `${pickerX}px`,
                    top: `${pickerY}px`,
                    transform: 'translate(-50%, -50%)',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: '2px solid white',
                    boxShadow: '0 0 2px black',
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
};

export default React.memo(Saturation);
