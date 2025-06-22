import React, { useCallback, useState, useEffect } from 'react';
import { ColorControlProps } from './types';
import { hslToRgb, rgbToHsl, rgbToHex, hexToRgb } from './ColorUtils';

const clamp = (val: number, min: number, max: number): number => val;
// Math.max(min, Math.min(max, val));

const inputGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    alignItems: 'flex-start',
};

const rowStyle: React.CSSProperties = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '0.5rem',
    flexWrap: 'wrap',
};

const inputStyle: React.CSSProperties = {
    width: '2.5rem',
    padding: '4px',
};

const ColorInputs: React.FC<ColorControlProps> = ({ hsla, onChange }) => {
    const [r, g, b] = hslToRgb(hsla.h, hsla.s, hsla.l);
    const [hex, setHex] = useState(rgbToHex(r, g, b).toUpperCase());

    useEffect(() => {
        setHex(rgbToHex(r, g, b).toUpperCase());
    }, [r, g, b]);

    const updateHsl = useCallback(
        (key: keyof typeof hsla, raw: number) => {
            const value = clamp(raw, key === 'h' ? 0 : 0, key === 'h' ? 360 : 100);
            onChange({ ...hsla, [key]: value });
        },
        [hsla, onChange]
    );

    const updateRgb = useCallback(
        (channel: 'r' | 'g' | 'b', raw: number) => {
            const value = clamp(raw, 0, 255);
            const rgb = { r, g, b, [channel]: value };
            const [h, s, l] = rgbToHsl(rgb.r, rgb.g, rgb.b);
            onChange({ ...hsla, h, s, l });
        },
        [r, g, b, hsla, onChange]
    );

    const handleAlpha = (raw: number) => {
        const a = clamp(raw, 0, 1);
        onChange({ ...hsla, a });
    };

    const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.trim().toUpperCase();
        setHex(raw);

        const rgb = hexToRgb(raw);
        if (rgb) {
            const [h, s, l] = rgbToHsl(...rgb);
            onChange({ ...hsla, h, s, l });
        }
    };

    const numberInput = (
        label: string,
        value: number,
        min: number,
        max: number,
        onChange: (val: number) => void,
        step: number = 1
    ) => (
        <div style={inputGroupStyle}>
            <span
                style={{ fontSize: '0.8rem', color: '#666', marginBottom: '2px', fontWeight: 'bold' }}
            >{label}</span>
            <input
                type="number"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => {
                    const v = e.target.value;
                    if (v === '') return;
                    const n = Number(v);
                    if (!isNaN(n)) onChange(n);
                }}
                style={inputStyle}
            />
        </div>
    );

    return (
        <div style={{ marginTop: '1rem' }}>
            {/* RGB Row */}
            <div style={rowStyle}>
                {numberInput('R', r, 0, 255, (v) => updateRgb('r', v))}
                {numberInput('G', g, 0, 255, (v) => updateRgb('g', v))}
                {numberInput('B', b, 0, 255, (v) => updateRgb('b', v))}
            </div>

            {/* HSL Row */}
            <div style={rowStyle}>
                {numberInput('H', Math.round(hsla.h), 0, 360, (v) => updateHsl('h', v))}
                {numberInput('S', Math.round(hsla.s), 0, 100, (v) => updateHsl('s', v))}
                {numberInput('L', Math.round(hsla.l), 0, 100, (v) => updateHsl('l', v))}
            </div>

            {/* HEX + A Row */}
            <div style={rowStyle}>
                <div style={inputGroupStyle}>
                    <span>HEX</span>
                    <input
                        type="text"
                        value={hex}
                        onChange={handleHexChange}
                        style={{
                            ...inputStyle,
                            width: '6rem',
                            textTransform: 'uppercase',
                            borderColor: /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(hex) ? '#ccc' : 'red',
                        }}
                    />
                </div>
                {numberInput('A', hsla.a, 0, 1, handleAlpha, 0.01)}
            </div>
        </div>
    );
};

export default React.memo(ColorInputs);
