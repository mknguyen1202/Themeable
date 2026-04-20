import React, { useState } from 'react';
import { harmonizedRamp } from '../../foundations/color';
import type { Ramp12 } from '../../foundations/types';
import './ColorEditor.css';

type ColorMode = 'single' | 'gradient' | 'ramp';
type GradientType = 'linear' | 'radial';

export const ColorEditor: React.FC = () => {
    const [colorMode, setColorMode] = useState<ColorMode>('single');
    const [singleColor, setSingleColor] = useState('#667eea');

    // Gradient editor
    const [gradientType, setGradientType] = useState<GradientType>('linear');
    const [gradientAngle, setGradientAngle] = useState(135);
    const [gradientStops, setGradientStops] = useState([
        { color: '#667eea', position: 0 },
        { color: '#764ba2', position: 100 },
    ]);

    // Ramp editor
    const [rampHue, setRampHue] = useState(240);
    const [rampSaturation, setRampSaturation] = useState(85);
    const [rampMode, setRampMode] = useState<'light' | 'dark'>('light');
    const [ramp, setRamp] = useState<Ramp12<string>>(
        harmonizedRamp(240, 85, 'light')
    );

    const updateRamp = (hue: number, sat: number, mode: 'light' | 'dark') => {
        setRampHue(hue);
        setRampSaturation(sat);
        setRampMode(mode);
        setRamp(harmonizedRamp(hue, sat, mode));
    };

    const addGradientStop = () => {
        const newPosition = gradientStops.length > 0
            ? gradientStops[gradientStops.length - 1].position + 10
            : 50;
        setGradientStops([
            ...gradientStops,
            { color: '#ffffff', position: Math.min(100, newPosition) }
        ]);
    };

    const updateGradientStop = (index: number, updates: Partial<typeof gradientStops[0]>) => {
        const updated = [...gradientStops];
        updated[index] = { ...updated[index], ...updates };
        setGradientStops(updated);
    };

    const removeGradientStop = (index: number) => {
        if (gradientStops.length > 2) {
            setGradientStops(gradientStops.filter((_, i) => i !== index));
        }
    };

    const getGradientCSS = () => {
        const stops = gradientStops
            .sort((a, b) => a.position - b.position)
            .map(stop => `${stop.color} ${stop.position}%`)
            .join(', ');

        if (gradientType === 'linear') {
            return `linear-gradient(${gradientAngle}deg, ${stops})`;
        } else {
            return `radial-gradient(circle, ${stops})`;
        }
    };

    const exportColor = () => {
        let code = '';

        if (colorMode === 'single') {
            code = `const color = "${singleColor}";`;
        } else if (colorMode === 'gradient') {
            code = `const gradient = "${getGradientCSS()}";`;
        } else if (colorMode === 'ramp') {
            code = `import { harmonizedRamp } from './foundations/color';

const colorRamp = harmonizedRamp(
  ${rampHue},  // hue
  ${rampSaturation},  // saturation
  "${rampMode}"  // mode
);

// Result: [${ramp.map(c => `"${c}"`).join(', ')}]`;
        }

        navigator.clipboard.writeText(code);
        alert('Color code copied to clipboard!');
    };

    return (
        <div className="color-editor">
            <div className="color-sidebar">
                <div className="color-sidebar-header">
                    <h2>Color Tools</h2>
                </div>

                <div className="color-modes">
                    <button
                        className={`mode-btn ${colorMode === 'single' ? 'active' : ''}`}
                        onClick={() => setColorMode('single')}
                    >
                        🎨 Single Color
                    </button>
                    <button
                        className={`mode-btn ${colorMode === 'gradient' ? 'active' : ''}`}
                        onClick={() => setColorMode('gradient')}
                    >
                        🌈 Gradient
                    </button>
                    <button
                        className={`mode-btn ${colorMode === 'ramp' ? 'active' : ''}`}
                        onClick={() => setColorMode('ramp')}
                    >
                        📊 Color Ramp
                    </button>
                </div>
            </div>

            <div className="color-main">
                <div className="color-header">
                    <h2>
                        {colorMode === 'single' && 'Single Color Picker'}
                        {colorMode === 'gradient' && 'Gradient Editor'}
                        {colorMode === 'ramp' && 'Color Ramp Generator'}
                    </h2>
                    <button className="btn-export" onClick={exportColor}>
                        Export Code
                    </button>
                </div>

                {/* Single Color Mode */}
                {colorMode === 'single' && (
                    <div className="color-content">
                        <div className="single-color-picker">
                            <div className="color-display" style={{ background: singleColor }}>
                                <div className="color-value">{singleColor}</div>
                            </div>
                            <div className="color-controls">
                                <div className="form-group">
                                    <label>Color</label>
                                    <div className="color-input-row">
                                        <input
                                            type="color"
                                            value={singleColor}
                                            onChange={e => setSingleColor(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            value={singleColor}
                                            onChange={e => setSingleColor(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Gradient Mode */}
                {colorMode === 'gradient' && (
                    <div className="color-content">
                        <div className="gradient-preview" style={{ background: getGradientCSS() }}>
                            <div className="gradient-css">{getGradientCSS()}</div>
                        </div>

                        <div className="gradient-controls">
                            <div className="form-group">
                                <label>Gradient Type</label>
                                <div className="btn-group">
                                    <button
                                        className={gradientType === 'linear' ? 'active' : ''}
                                        onClick={() => setGradientType('linear')}
                                    >
                                        Linear
                                    </button>
                                    <button
                                        className={gradientType === 'radial' ? 'active' : ''}
                                        onClick={() => setGradientType('radial')}
                                    >
                                        Radial
                                    </button>
                                </div>
                            </div>

                            {gradientType === 'linear' && (
                                <div className="form-group">
                                    <label>Angle: {gradientAngle}°</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="360"
                                        value={gradientAngle}
                                        onChange={e => setGradientAngle(Number(e.target.value))}
                                    />
                                </div>
                            )}

                            <div className="gradient-stops">
                                <div className="stops-header">
                                    <h3>Color Stops</h3>
                                    <button className="btn-add" onClick={addGradientStop}>
                                        + Add Stop
                                    </button>
                                </div>
                                {gradientStops.map((stop, index) => (
                                    <div key={index} className="stop-item">
                                        <input
                                            type="color"
                                            value={stop.color}
                                            onChange={e => updateGradientStop(index, { color: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            value={stop.color}
                                            onChange={e => updateGradientStop(index, { color: e.target.value })}
                                        />
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={stop.position}
                                            onChange={e => updateGradientStop(index, { position: Number(e.target.value) })}
                                        />
                                        <span>%</span>
                                        {gradientStops.length > 2 && (
                                            <button
                                                className="btn-remove"
                                                onClick={() => removeGradientStop(index)}
                                            >
                                                ×
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Color Ramp Mode */}
                {colorMode === 'ramp' && (
                    <div className="color-content">
                        <div className="ramp-controls">
                            <div className="form-group">
                                <label>Hue: {rampHue}°</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="360"
                                    value={rampHue}
                                    onChange={e => updateRamp(Number(e.target.value), rampSaturation, rampMode)}
                                    style={{
                                        background: `linear-gradient(to right, 
                      hsl(0, 100%, 50%), 
                      hsl(60, 100%, 50%), 
                      hsl(120, 100%, 50%), 
                      hsl(180, 100%, 50%), 
                      hsl(240, 100%, 50%), 
                      hsl(300, 100%, 50%), 
                      hsl(360, 100%, 50%))`
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <label>Saturation: {rampSaturation}%</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={rampSaturation}
                                    onChange={e => updateRamp(rampHue, Number(e.target.value), rampMode)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Mode</label>
                                <div className="btn-group">
                                    <button
                                        className={rampMode === 'light' ? 'active' : ''}
                                        onClick={() => updateRamp(rampHue, rampSaturation, 'light')}
                                    >
                                        ☀️ Light
                                    </button>
                                    <button
                                        className={rampMode === 'dark' ? 'active' : ''}
                                        onClick={() => updateRamp(rampHue, rampSaturation, 'dark')}
                                    >
                                        🌙 Dark
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="ramp-preview">
                            <h3>12-Step Color Ramp</h3>
                            <div className="ramp-grid">
                                {ramp.map((color, index) => (
                                    <div key={index} className="ramp-swatch">
                                        <div
                                            className="ramp-color"
                                            style={{ background: color }}
                                        />
                                        <div className="ramp-index">{index}</div>
                                        <div className="ramp-value">{color}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
