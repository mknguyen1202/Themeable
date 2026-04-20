import React, { useState } from 'react';
import { ScrollInput } from '../components/ScrollInput';
import { GradientBar } from '../components/GradientBar';
import { harmonizedRamp } from '../../foundations/color';
import type { Ramp12 } from '../../foundations/types';
import './ColorPanel.css';

type ColorTool = 'single' | 'gradient' | 'ramp';
type GradientType = 'linear' | 'radial';
type ColorStop = { color: string; position: number };

export const ColorPanel: React.FC = () => {
    const [activeTool, setActiveTool] = useState<ColorTool>('single');

    // Single color
    const [singleColor, setSingleColor] = useState('#667eea');

    // Gradient
    const [gradientType, setGradientType] = useState<GradientType>('linear');
    const [gradientAngle, setGradientAngle] = useState(135);
    const [gradientStops, setGradientStops] = useState<ColorStop[]>([
        { color: '#667eea', position: 0 },
        { color: '#764ba2', position: 100 },
    ]);
    const [selectedStopIndex, setSelectedStopIndex] = useState(-1);

    // Ramp
    const [rampHue, setRampHue] = useState(240);
    const [rampSaturation, setRampSaturation] = useState(85);
    const [rampMode, setRampMode] = useState<'light' | 'dark'>('light');
    const [ramp, setRamp] = useState<Ramp12<string>>(harmonizedRamp(240, 85, 'light'));

    const updateRamp = (hue: number, sat: number, mode: 'light' | 'dark') => {
        setRampHue(hue);
        setRampSaturation(sat);
        setRampMode(mode);
        setRamp(harmonizedRamp(hue, sat, mode));
    };

    const getGradientCSS = () => {
        const stops = [...gradientStops]
            .sort((a, b) => a.position - b.position)
            .map(stop => `${stop.color} ${stop.position}%`)
            .join(', ');

        return gradientType === 'linear'
            ? `linear-gradient(${gradientAngle}deg, ${stops})`
            : `radial-gradient(circle, ${stops})`;
    };

    const updateSelectedStop = (updates: Partial<ColorStop>) => {
        if (selectedStopIndex === -1) return;
        const updated = [...gradientStops];
        updated[selectedStopIndex] = { ...updated[selectedStopIndex], ...updates };
        setGradientStops(updated);
    };

    const exportCode = () => {
        let code = '';

        if (activeTool === 'single') {
            code = `const color = "${singleColor}";`;
        } else if (activeTool === 'gradient') {
            code = `const gradient = "${getGradientCSS()}";`;
        } else if (activeTool === 'ramp') {
            code = `import { harmonizedRamp } from './foundations/color';

const colorRamp = harmonizedRamp(${rampHue}, ${rampSaturation}, "${rampMode}");
// Result: [${ramp.map(c => `"${c}"`).join(', ')}]`;
        }

        navigator.clipboard.writeText(code);
        alert('Color code copied!');
    };

    return (
        <div className="color-panel">
            <div className="color-panel-header">
                <h3>Colors</h3>
                <button className="btn-export-sm" onClick={exportCode}>
                    Export
                </button>
            </div>

            {/* Tool Selector */}
            <div className="color-tools">
                <button
                    className={`tool-btn ${activeTool === 'single' ? 'active' : ''}`}
                    onClick={() => setActiveTool('single')}
                >
                    Single
                </button>
                <button
                    className={`tool-btn ${activeTool === 'gradient' ? 'active' : ''}`}
                    onClick={() => setActiveTool('gradient')}
                >
                    Gradient
                </button>
                <button
                    className={`tool-btn ${activeTool === 'ramp' ? 'active' : ''}`}
                    onClick={() => setActiveTool('ramp')}
                >
                    Ramp
                </button>
            </div>

            {/* Single Color */}
            {activeTool === 'single' && (
                <div className="color-section">
                    <div className="color-preview-large" style={{ background: singleColor }}>
                        <div className="color-value-display">{singleColor}</div>
                    </div>
                    <div className="color-input-group">
                        <input
                            type="color"
                            value={singleColor}
                            onChange={e => setSingleColor(e.target.value)}
                            className="color-picker-input"
                        />
                        <input
                            type="text"
                            value={singleColor}
                            onChange={e => setSingleColor(e.target.value)}
                            className="color-text-input"
                            placeholder="#000000"
                        />
                    </div>
                </div>
            )}

            {/* Gradient */}
            {activeTool === 'gradient' && (
                <div className="color-section">
                    <div className="color-preview-large" style={{ background: getGradientCSS() }} />

                    <div className="form-field">
                        <label>Type</label>
                        <div className="btn-group-sm">
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
                        <div className="form-field">
                            <label>Angle</label>
                            <ScrollInput
                                value={gradientAngle}
                                onChange={setGradientAngle}
                                min={0}
                                max={360}
                                step={1}
                                suffix="°"
                            />
                        </div>
                    )}

                    <div className="form-field">
                        <label>Stops</label>
                        <GradientBar
                            stops={gradientStops}
                            onStopsChange={setGradientStops}
                            onSelectStop={setSelectedStopIndex}
                            selectedIndex={selectedStopIndex}
                        />
                    </div>

                    {selectedStopIndex !== -1 && (
                        <div className="form-field">
                            <label>Selected Stop</label>
                            <div className="color-input-group">
                                <input
                                    type="color"
                                    value={gradientStops[selectedStopIndex].color}
                                    onChange={e => updateSelectedStop({ color: e.target.value })}
                                    className="color-picker-input"
                                />
                                <input
                                    type="text"
                                    value={gradientStops[selectedStopIndex].color}
                                    onChange={e => updateSelectedStop({ color: e.target.value })}
                                    className="color-text-input"
                                />
                            </div>
                            <ScrollInput
                                value={gradientStops[selectedStopIndex].position}
                                onChange={pos => updateSelectedStop({ position: pos })}
                                min={0}
                                max={100}
                                step={1}
                                suffix="%"
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Color Ramp */}
            {activeTool === 'ramp' && (
                <div className="color-section">
                    <div className="form-field">
                        <label>Hue</label>
                        <ScrollInput
                            value={rampHue}
                            onChange={val => updateRamp(val, rampSaturation, rampMode)}
                            min={0}
                            max={360}
                            step={1}
                            suffix="°"
                        />
                        <div
                            className="hue-bar"
                            style={{
                                background: `linear-gradient(to right, 
                  hsl(0, 100%, 50%), 
                  hsl(60, 100%, 50%), 
                  hsl(120, 100%, 50%), 
                  hsl(180, 100%, 50%), 
                  hsl(240, 100%, 50%), 
                  hsl(300, 100%, 50%), 
                  hsl(360, 100%, 50%))`,
                            }}
                        />
                    </div>

                    <div className="form-field">
                        <label>Saturation</label>
                        <ScrollInput
                            value={rampSaturation}
                            onChange={val => updateRamp(rampHue, val, rampMode)}
                            min={0}
                            max={100}
                            step={1}
                            suffix="%"
                        />
                    </div>

                    <div className="form-field">
                        <label>Mode</label>
                        <div className="btn-group-sm">
                            <button
                                className={rampMode === 'light' ? 'active' : ''}
                                onClick={() => updateRamp(rampHue, rampSaturation, 'light')}
                            >
                                Light
                            </button>
                            <button
                                className={rampMode === 'dark' ? 'active' : ''}
                                onClick={() => updateRamp(rampHue, rampSaturation, 'dark')}
                            >
                                Dark
                            </button>
                        </div>
                    </div>

                    <div className="ramp-grid-compact">
                        {ramp.map((color, index) => (
                            <div key={index} className="ramp-swatch-compact" title={color}>
                                <div className="ramp-color-compact" style={{ background: color }} />
                                <div className="ramp-index-compact">{index}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
