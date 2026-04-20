import React, { useState } from 'react';
import type { ButtonVariant, ButtonTone } from '../../components/Button/Button.types';
import './VariantEditor.css';

const VARIANTS: ButtonVariant[] = [
    'filled', 'filledTonal', 'outlined', 'text', 'elevated', 'icon', 'segmented', 'fab', 'fabExtended'
];

const TONES: ButtonTone[] = [
    'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'neutral'
];

const defaultStyles = {
    background: '#667eea',
    color: '#ffffff',
    border: '2px solid #667eea',
    hoverBackground: '#5568d3',
    hoverColor: '#ffffff',
    pressedBackground: '#4451b8',
    pressedColor: '#ffffff',
    disabledBackground: '#cccccc',
    disabledColor: '#666666',
};

export const VariantEditor: React.FC = () => {
    const [selectedVariant, setSelectedVariant] = useState<ButtonVariant>('filled');
    const [selectedTone, setSelectedTone] = useState<ButtonTone>('primary');
    const [customStyles, setCustomStyles] = useState(defaultStyles);
    const [previewState, setPreviewState] = useState<'idle' | 'hover' | 'pressed' | 'disabled'>('idle');

    const updateStyle = (key: keyof typeof customStyles, value: string) => {
        setCustomStyles({ ...customStyles, [key]: value });
    };

    const getPreviewStyle = () => {
        const base = {
            background: customStyles.background,
            color: customStyles.color,
            border: customStyles.border,
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
        };

        switch (previewState) {
            case 'hover':
                return { ...base, background: customStyles.hoverBackground, color: customStyles.hoverColor };
            case 'pressed':
                return { ...base, background: customStyles.pressedBackground, color: customStyles.pressedColor };
            case 'disabled':
                return { ...base, background: customStyles.disabledBackground, color: customStyles.disabledColor, cursor: 'not-allowed' };
            default:
                return base;
        }
    };

    const exportVariantCode = () => {
        const code = `// Custom ${selectedVariant} variant with ${selectedTone} tone
const customButtonStyles = {
  background: "${customStyles.background}",
  color: "${customStyles.color}",
  border: "${customStyles.border}",
  
  "&:hover": {
    background: "${customStyles.hoverBackground}",
    color: "${customStyles.hoverColor}",
  },
  
  "&:active": {
    background: "${customStyles.pressedBackground}",
    color: "${customStyles.pressedColor}",
  },
  
  "&:disabled": {
    background: "${customStyles.disabledBackground}",
    color: "${customStyles.disabledColor}",
    cursor: "not-allowed",
  }
};`;

        navigator.clipboard.writeText(code);
        alert('Variant styles copied to clipboard!');
    };

    return (
        <div className="variant-editor">
            <div className="variant-sidebar">
                <div className="variant-sidebar-header">
                    <h2>Variants</h2>
                </div>

                <div className="variant-section">
                    <h3>Variant Type</h3>
                    <div className="variant-grid">
                        {VARIANTS.map(variant => (
                            <button
                                key={variant}
                                className={`variant-btn ${selectedVariant === variant ? 'active' : ''}`}
                                onClick={() => setSelectedVariant(variant)}
                            >
                                {variant}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="variant-section">
                    <h3>Tone</h3>
                    <div className="tone-grid">
                        {TONES.map(tone => (
                            <button
                                key={tone}
                                className={`tone-btn ${selectedTone === tone ? 'active' : ''}`}
                                onClick={() => setSelectedTone(tone)}
                            >
                                {tone}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="variant-main">
                <div className="variant-header">
                    <div>
                        <h2>{selectedVariant}</h2>
                        <div className="variant-meta">Tone: {selectedTone}</div>
                    </div>
                    <div className="variant-actions">
                        <button className="btn-export" onClick={exportVariantCode}>
                            Export Styles
                        </button>
                    </div>
                </div>

                <div className="variant-form">
                    <section className="form-section">
                        <h3>Default State</h3>
                        <div className="color-row">
                            <div className="form-group">
                                <label>Background</label>
                                <div className="color-input-group">
                                    <input
                                        type="color"
                                        value={customStyles.background}
                                        onChange={e => updateStyle('background', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        value={customStyles.background}
                                        onChange={e => updateStyle('background', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Text Color</label>
                                <div className="color-input-group">
                                    <input
                                        type="color"
                                        value={customStyles.color}
                                        onChange={e => updateStyle('color', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        value={customStyles.color}
                                        onChange={e => updateStyle('color', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Border</label>
                            <input
                                type="text"
                                value={customStyles.border}
                                onChange={e => updateStyle('border', e.target.value)}
                                placeholder="e.g., 2px solid #667eea"
                            />
                        </div>
                    </section>

                    <section className="form-section">
                        <h3>Hover State</h3>
                        <div className="color-row">
                            <div className="form-group">
                                <label>Background</label>
                                <div className="color-input-group">
                                    <input
                                        type="color"
                                        value={customStyles.hoverBackground}
                                        onChange={e => updateStyle('hoverBackground', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        value={customStyles.hoverBackground}
                                        onChange={e => updateStyle('hoverBackground', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Text Color</label>
                                <div className="color-input-group">
                                    <input
                                        type="color"
                                        value={customStyles.hoverColor}
                                        onChange={e => updateStyle('hoverColor', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        value={customStyles.hoverColor}
                                        onChange={e => updateStyle('hoverColor', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="form-section">
                        <h3>Pressed State</h3>
                        <div className="color-row">
                            <div className="form-group">
                                <label>Background</label>
                                <div className="color-input-group">
                                    <input
                                        type="color"
                                        value={customStyles.pressedBackground}
                                        onChange={e => updateStyle('pressedBackground', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        value={customStyles.pressedBackground}
                                        onChange={e => updateStyle('pressedBackground', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Text Color</label>
                                <div className="color-input-group">
                                    <input
                                        type="color"
                                        value={customStyles.pressedColor}
                                        onChange={e => updateStyle('pressedColor', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        value={customStyles.pressedColor}
                                        onChange={e => updateStyle('pressedColor', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="form-section">
                        <h3>Disabled State</h3>
                        <div className="color-row">
                            <div className="form-group">
                                <label>Background</label>
                                <div className="color-input-group">
                                    <input
                                        type="color"
                                        value={customStyles.disabledBackground}
                                        onChange={e => updateStyle('disabledBackground', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        value={customStyles.disabledBackground}
                                        onChange={e => updateStyle('disabledBackground', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Text Color</label>
                                <div className="color-input-group">
                                    <input
                                        type="color"
                                        value={customStyles.disabledColor}
                                        onChange={e => updateStyle('disabledColor', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        value={customStyles.disabledColor}
                                        onChange={e => updateStyle('disabledColor', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="variant-preview">
                    <h3>Preview</h3>
                    <div className="preview-controls">
                        {(['idle', 'hover', 'pressed', 'disabled'] as const).map(state => (
                            <button
                                key={state}
                                className={`state-btn ${previewState === state ? 'active' : ''}`}
                                onClick={() => setPreviewState(state)}
                            >
                                {state}
                            </button>
                        ))}
                    </div>
                    <div className="preview-container">
                        <button style={getPreviewStyle()}>
                            {selectedVariant} Button
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
