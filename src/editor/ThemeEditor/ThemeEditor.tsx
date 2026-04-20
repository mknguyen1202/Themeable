import React, { useState } from 'react';
import { ScrollInput } from '../components/ScrollInput';
import { createMonochromaticLevels } from '../../foundations/color';
import './ThemeEditor.css';

type ThemeConfig = {
    id: string;
    label: string;
    mode: 'light' | 'dark';
    hue: number;
    saturation: number;
};

const defaultThemes: ThemeConfig[] = [
    { id: 'solar', label: 'Solar', mode: 'light', hue: 25, saturation: 88 },
    { id: 'lunar', label: 'Lunar', mode: 'dark', hue: 220, saturation: 75 },
    { id: 'aurora', label: 'Aurora', mode: 'dark', hue: 280, saturation: 90 },
];

export const ThemeEditor: React.FC = () => {
    const [themes, setThemes] = useState<ThemeConfig[]>(defaultThemes);
    const [selectedTheme, setSelectedTheme] = useState<ThemeConfig>(themes[0]);

    const updateTheme = (updates: Partial<ThemeConfig>) => {
        const updated = { ...selectedTheme, ...updates };
        setSelectedTheme(updated);
        setThemes(themes.map(t => t.id === updated.id ? updated : t));
    };

    const colors = createMonochromaticLevels(
        selectedTheme.hue,
        selectedTheme.saturation,
        selectedTheme.mode
    );

    const exportThemeCode = () => {
        const code = `import { makeTheme } from "./builders";
import { createMonochromaticLevels } from "../foundations/color";
import type { Theme } from "./types";

const levels = createMonochromaticLevels(
    ${selectedTheme.hue},   // Hue
    ${selectedTheme.saturation},   // Saturation
    "${selectedTheme.mode}"
);

export const ${selectedTheme.id}: Theme = makeTheme("${selectedTheme.id}", "${selectedTheme.mode}", {
    primary: levels.primary,
    secondary: levels.secondary,
    tertiary: levels.tertiary,
});`;

        navigator.clipboard.writeText(code);
        alert('Theme code copied to clipboard!');
    };

    return (
        <div className="theme-editor-compact">
            <div className="compact-header">
                <h3>Themes</h3>
                <button className="btn-export-sm" onClick={exportThemeCode}>
                    Export
                </button>
            </div>

            <div className="theme-selector">
                <select
                    value={selectedTheme.id}
                    onChange={e => {
                        const theme = themes.find(t => t.id === e.target.value);
                        if (theme) setSelectedTheme(theme);
                    }}
                    className="compact-select"
                >
                    {themes.map(theme => (
                        <option key={theme.id} value={theme.id}>
                            {theme.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="compact-form">
                <div className="form-field-compact">
                    <label>Name</label>
                    <input
                        type="text"
                        value={selectedTheme.label}
                        onChange={e => updateTheme({ label: e.target.value })}
                        className="compact-input"
                    />
                </div>

                <div className="form-field-compact">
                    <label>Mode</label>
                    <div className="btn-group-compact">
                        <button
                            className={selectedTheme.mode === 'light' ? 'active' : ''}
                            onClick={() => updateTheme({ mode: 'light' })}
                        >
                            Light
                        </button>
                        <button
                            className={selectedTheme.mode === 'dark' ? 'active' : ''}
                            onClick={() => updateTheme({ mode: 'dark' })}
                        >
                            Dark
                        </button>
                    </div>
                </div>

                <div className="form-field-compact">
                    <label>Hue</label>
                    <ScrollInput
                        value={selectedTheme.hue}
                        onChange={hue => updateTheme({ hue })}
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
                                hsl(360, 100%, 50%))`
                        }}
                    />
                </div>

                <div className="form-field-compact">
                    <label>Saturation</label>
                    <ScrollInput
                        value={selectedTheme.saturation}
                        onChange={saturation => updateTheme({ saturation })}
                        min={0}
                        max={100}
                        step={1}
                        suffix="%"
                    />
                </div>

                <div className="color-preview-compact">
                    <div className="color-swatch-compact" style={{ background: colors.primary[5] }}>
                        <span>P</span>
                    </div>
                    <div className="color-swatch-compact" style={{ background: colors.secondary[5] }}>
                        <span>S</span>
                    </div>
                    <div className="color-swatch-compact" style={{ background: colors.tertiary[5] }}>
                        <span>T</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
