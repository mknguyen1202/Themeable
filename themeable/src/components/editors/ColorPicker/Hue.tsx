import React, { useCallback, useRef, useState, useEffect } from 'react';
import { ColorControlProps } from './types';
import { PICKER_SIZE } from './constants';

const TRACK_HEIGHT = 12;
const THUMB_WIDTH = 4;
const THUMB_HEIGHT = 20;
const THUMB_RADIUS = THUMB_HEIGHT / 2;

const Hue: React.FC<ColorControlProps> = ({ hsla, onChange }) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const updateHueFromPosition = useCallback(
        (clientX: number) => {
            const rect = trackRef.current!.getBoundingClientRect();
            const x = Math.max(0, Math.min(PICKER_SIZE, clientX - rect.left));
            const hue = Math.round((x / PICKER_SIZE) * 360);
            onChange({ ...hsla, h: hue });
        },
        [hsla, onChange]
    );

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            if (isDragging) updateHueFromPosition(e.clientX);
        };
        const stop = () => setIsDragging(false);
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', stop);
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', stop);
        };
    }, [isDragging, updateHueFromPosition]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        updateHueFromPosition(e.clientX);
    };

    const left = (hsla.h / 360) * PICKER_SIZE;

    return (
        <div style={{ width: PICKER_SIZE, position: 'relative', height: TRACK_HEIGHT + THUMB_HEIGHT }}>
            <div
                ref={trackRef}
                onMouseDown={handleMouseDown}
                style={{
                    width: '100%',
                    height: TRACK_HEIGHT,
                    borderRadius: '6px',
                    background: `linear-gradient(to right,
                        hsl(0, 100%, 50%) 0%,
                        hsl(60, 100%, 50%) 16%,
                        hsl(120, 100%, 50%) 33%,
                        hsl(180, 100%, 50%) 50%,
                        hsl(240, 100%, 50%) 66%,
                        hsl(300, 100%, 50%) 83%,
                        hsl(360, 100%, 50%) 100%)
                    `,
                    position: 'relative',
                    cursor: 'pointer',
                }}
            />
            {/* Thumb */}
            <div
                // onMouseDown={handleMouseDown}
                style={{
                    position: 'absolute',
                    left: `${left}px`,
                    top: `${TRACK_HEIGHT / 2}px`,
                    transform: 'translate(-50%, -50%)',
                    width: THUMB_WIDTH,
                    height: THUMB_HEIGHT,
                    borderRadius: THUMB_RADIUS,
                    background: `hsl(${hsla.h}, 100%, 50%)`, // or use opaqueColor for Alpha
                    border: '2px solid white',
                    boxShadow: '0 0 3px rgba(0,0,0,0.4)',
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
};

export default React.memo(Hue);
