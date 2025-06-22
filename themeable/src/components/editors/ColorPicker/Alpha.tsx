import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ColorControlProps } from './types';
import { PICKER_SIZE } from './constants';

const TRACK_HEIGHT = 12;
const THUMB_WIDTH = 4;
const THUMB_HEIGHT = 20;
const THUMB_RADIUS = THUMB_HEIGHT / 2;
const Alpha: React.FC<ColorControlProps> = ({ hsla, onChange }) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const { h, s, l, a } = hsla;

    const updateAlphaFromPosition = useCallback(
        (clientX: number) => {
            const rect = trackRef.current!.getBoundingClientRect();
            const x = Math.max(0, Math.min(PICKER_SIZE, clientX - rect.left));
            const alpha = parseFloat((x / PICKER_SIZE).toFixed(2));
            onChange({ ...hsla, a: alpha });
        },
        [hsla, onChange]
    );

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            if (isDragging) updateAlphaFromPosition(e.clientX);
        };
        const stop = () => setIsDragging(false);
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', stop);
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', stop);
        };
    }, [isDragging, updateAlphaFromPosition]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        updateAlphaFromPosition(e.clientX);
    };

    const left = a * PICKER_SIZE;
    const opaqueColor = `hsla(${h}, ${s}%, ${l}%, 1)`;
    const transparentColor = `hsla(${h}, ${s}%, ${l}%, 0)`;

    return (
        <div style={{ width: PICKER_SIZE, position: 'relative', height: TRACK_HEIGHT + THUMB_HEIGHT }}>
            {/* Checkerboard base */}
            <div
                ref={trackRef}
                onMouseDown={handleMouseDown}
                style={{
                    width: '100%',
                    height: TRACK_HEIGHT,
                    borderRadius: '6px',
                    backgroundImage: `
            linear-gradient(45deg, #ccc 25%, transparent 25%),
            linear-gradient(-45deg, #ccc 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ccc 75%),
            linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
                    backgroundSize: '10px 10px',
                    backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0',
                    position: 'relative',
                    cursor: 'pointer',
                    overflow: 'hidden',
                }}
            >
                {/* Alpha gradient overlay */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(to right, ${transparentColor}, ${opaqueColor})`,
                    }}
                />
            </div>

            {/* Thumb */}
            <div
                style={{
                    position: 'absolute',
                    left: `${left}px`,
                    top: `${TRACK_HEIGHT / 2}px`,
                    transform: 'translate(-50%, -50%)',
                    width: THUMB_WIDTH,
                    height: THUMB_HEIGHT,
                    borderRadius: THUMB_RADIUS,
                    border: '2px solid white',
                    background: `hsla(${h}, ${s}%, ${l}%, ${a})`, // show fully opaque version
                    boxShadow: '0 0 3px rgba(0,0,0,0.5)',
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
};

export default React.memo(Alpha);
