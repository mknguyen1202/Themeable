import React, { useRef, useState } from 'react';
import './GradientBar.css';

type ColorStop = {
    color: string;
    position: number;
};

type GradientBarProps = {
    stops: ColorStop[];
    onStopsChange: (stops: ColorStop[]) => void;
    onSelectStop?: (index: number) => void;
    selectedIndex?: number;
};

export const GradientBar: React.FC<GradientBarProps> = ({
    stops,
    onStopsChange,
    onSelectStop,
    selectedIndex = -1,
}) => {
    const barRef = useRef<HTMLDivElement>(null);
    const [draggingIndex, setDraggingIndex] = useState<number>(-1);

    const getGradientCSS = () => {
        const sortedStops = [...stops].sort((a, b) => a.position - b.position);
        return `linear-gradient(to right, ${sortedStops
            .map(stop => `${stop.color} ${stop.position}%`)
            .join(', ')})`;
    };

    const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!barRef.current || e.target !== barRef.current) return;

        const rect = barRef.current.getBoundingClientRect();
        const position = ((e.clientX - rect.left) / rect.width) * 100;

        const newStop: ColorStop = {
            color: getColorAtPosition(position),
            position: Math.round(position),
        };

        onStopsChange([...stops, newStop]);
        if (onSelectStop) {
            onSelectStop(stops.length);
        }
    };

    const getColorAtPosition = (position: number): string => {
        // Find surrounding stops to interpolate color
        const sortedStops = [...stops].sort((a, b) => a.position - b.position);

        const before = sortedStops.filter(s => s.position <= position).pop();
        const after = sortedStops.find(s => s.position > position);

        if (!before) return after?.color || '#ffffff';
        if (!after) return before.color;

        // Simple interpolation - just use the closer one
        return (position - before.position) < (after.position - position)
            ? before.color
            : after.color;
    };

    const handleStopMouseDown = (index: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setDraggingIndex(index);
        if (onSelectStop) {
            onSelectStop(index);
        }
    };

    const handleStopRemove = (index: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (stops.length > 2) {
            onStopsChange(stops.filter((_, i) => i !== index));
            if (onSelectStop && selectedIndex === index) {
                onSelectStop(-1);
            }
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (draggingIndex === -1 || !barRef.current) return;

        const rect = barRef.current.getBoundingClientRect();
        const position = ((e.clientX - rect.left) / rect.width) * 100;
        const clampedPosition = Math.max(0, Math.min(100, position));

        const updatedStops = [...stops];
        updatedStops[draggingIndex] = {
            ...updatedStops[draggingIndex],
            position: Math.round(clampedPosition),
        };
        onStopsChange(updatedStops);
    };

    const handleMouseUp = () => {
        setDraggingIndex(-1);
    };

    React.useEffect(() => {
        if (draggingIndex !== -1) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [draggingIndex, stops]);

    return (
        <div className="gradient-bar-container">
            <div
                ref={barRef}
                className="gradient-bar"
                style={{ background: getGradientCSS() }}
                onClick={handleBarClick}
            >
                {stops.map((stop, index) => (
                    <div
                        key={index}
                        className={`gradient-stop ${selectedIndex === index ? 'selected' : ''}`}
                        style={{
                            left: `${stop.position}%`,
                            background: stop.color,
                        }}
                        onMouseDown={(e) => handleStopMouseDown(index, e)}
                    >
                        <div className="gradient-stop-thumb" style={{ background: stop.color }}>
                            {stops.length > 2 && (
                                <button
                                    className="gradient-stop-remove"
                                    onClick={(e) => handleStopRemove(index, e)}
                                    type="button"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="gradient-bar-hint">
                Click on bar to add stop, drag to move
            </div>
        </div>
    );
};
