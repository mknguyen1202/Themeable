import React, { useState } from 'react';
import { HSLAColor } from './types';
import Hue from './Hue';
import Alpha from './Alpha';
import Saturation from './Saturation';
import ColorInputs from './ColorInputs';

export interface ColorPickerProps {
    value?: HSLAColor;
    onChange?: (color: HSLAColor) => void;
}

const defaultColor: HSLAColor = {
    h: 0,
    s: 100,
    l: 50,
    a: 1,
};

const PICKER_SIZE = 200;

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
    const [internalColor, setInternalColor] = useState<HSLAColor>(value || defaultColor);

    const color = value ?? internalColor;

    const handleChange = (newColor: HSLAColor) => {
        if (!value) {
            setInternalColor(newColor); // uncontrolled fallback
        }
        onChange?.(newColor); // always notify parent
    };

    return (
        <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-start',
            padding: '1rem',
        }}>
            {/* Left: Saturation square */}
            <Saturation hsla={color} onChange={handleChange} />

            {/* Right: Sliders + inputs */}
            <div style={{ flex: 1, minWidth: 220 }}>
                <Hue hsla={color} onChange={handleChange} />
                <Alpha hsla={color} onChange={handleChange} />
                <ColorInputs hsla={color} onChange={handleChange} />

                {/* Preview */}
                <div
                    style={{
                        marginTop: '1rem',
                        height: '32px',
                        borderRadius: '4px',
                        background: `hsla(${color.h}, ${color.s}%, ${color.l}%, ${color.a})`,
                        border: '1px solid #ccc',
                    }}
                />
            </div>
        </div>
    );
};

export default ColorPicker;
