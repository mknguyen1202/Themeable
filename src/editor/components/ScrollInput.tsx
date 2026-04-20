import React, { useRef } from 'react';
import './ScrollInput.css';

type ScrollInputProps = {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    suffix?: string;
    className?: string;
};

export const ScrollInput: React.FC<ScrollInputProps> = ({
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    suffix = '',
    className = '',
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const clamp = (val: number) => Math.min(max, Math.max(min, val));

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -step : step;
        onChange(clamp(value + delta));
    };

    const handleIncrement = () => {
        onChange(clamp(value + step));
    };

    const handleDecrement = () => {
        onChange(clamp(value - step));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        if (!isNaN(val)) {
            onChange(clamp(val));
        }
    };

    return (
        <div className={`scroll-input ${className}`}>
            <input
                ref={inputRef}
                type="number"
                value={value}
                onChange={handleInputChange}
                onWheel={handleWheel}
                min={min}
                max={max}
                step={step}
                className="scroll-input-field"
            />
            {suffix && <span className="scroll-input-suffix">{suffix}</span>}
            <div className="scroll-input-controls">
                <button
                    className="scroll-input-btn scroll-input-btn-up"
                    onClick={handleIncrement}
                    type="button"
                >
                    ▲
                </button>
                <button
                    className="scroll-input-btn scroll-input-btn-down"
                    onClick={handleDecrement}
                    type="button"
                >
                    ▼
                </button>
            </div>
        </div>
    );
};
