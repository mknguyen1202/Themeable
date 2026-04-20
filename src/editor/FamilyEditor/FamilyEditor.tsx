import React, { useState } from 'react';
import { families } from '../../families';
import './FamilyEditor.css';

type FamilyConfig = {
    id: string;
    description?: string;
    radiusSm: number;
    radiusMd: number;
    radiusLg: number;
    radiusPill: number;
    borderWidth: number;
    borderStyle: 'none' | 'solid' | 'dashed' | 'double';
    borderColor: string;
    emphasize: 'border' | 'fill' | 'shadow';
    focusRingWidth: number;
    focusRingOffset: number;
    transition: string;
};

export const FamilyEditor: React.FC = () => {
    const familyKeys = Object.keys(families) as Array<keyof typeof families>;
    const [selectedFamilyId, setSelectedFamilyId] = useState<string>(familyKeys[0]);
    const selectedFamily = families[selectedFamilyId as keyof typeof families];

    const [config, setConfig] = useState<FamilyConfig>({
        id: selectedFamilyId,
        description: selectedFamily.description,
        radiusSm: selectedFamily.geometry.radius.sm,
        radiusMd: selectedFamily.geometry.radius.md,
        radiusLg: selectedFamily.geometry.radius.lg,
        radiusPill: selectedFamily.geometry.radius.pill,
        borderWidth: selectedFamily.border.width.thin,
        borderStyle: selectedFamily.border.style,
        borderColor: typeof selectedFamily.border.color === 'string'
            ? selectedFamily.border.color
            : selectedFamily.border.color({ mode: 'light' }),
        emphasize: selectedFamily.border.emphasize,
        focusRingWidth: selectedFamily.focus.ringWidth,
        focusRingOffset: selectedFamily.focus.ringOffset,
        transition: selectedFamily.motion.transition,
    });

    const handleFamilySelect = (familyId: string) => {
        setSelectedFamilyId(familyId);
        const family = families[familyId as keyof typeof families];
        setConfig({
            id: familyId,
            description: family.description,
            radiusSm: family.geometry.radius.sm,
            radiusMd: family.geometry.radius.md,
            radiusLg: family.geometry.radius.lg,
            radiusPill: family.geometry.radius.pill,
            borderWidth: family.border.width.thin,
            borderStyle: family.border.style,
            borderColor: typeof family.border.color === 'string'
                ? family.border.color
                : family.border.color({ mode: 'light' }),
            emphasize: family.border.emphasize,
            focusRingWidth: family.focus.ringWidth,
            focusRingOffset: family.focus.ringOffset,
            transition: family.motion.transition,
        });
    };

    const updateConfig = (updates: Partial<FamilyConfig>) => {
        setConfig({ ...config, ...updates });
    };

    const exportFamilyCode = () => {
        const code = `export const ${config.id}: DesignFamily = {
  id: "${config.id}",
  description: "${config.description || ''}",
  geometry: {
    radius: {
      sm: ${config.radiusSm},
      md: ${config.radiusMd},
      lg: ${config.radiusLg},
      pill: ${config.radiusPill}
    },
    shape: "rounded"
  },
  border: {
    width: {
      thin: ${config.borderWidth},
      thick: ${config.borderWidth * 2}
    },
    style: "${config.borderStyle}",
    color: "${config.borderColor}",
    emphasize: "${config.emphasize}"
  },
  surface: {
    background: (a) => a.base,
    effect: undefined
  },
  elevation: {
    // ... elevation configuration
  },
  focus: {
    ringWidth: ${config.focusRingWidth},
    ringOffset: ${config.focusRingOffset},
    ringColor: (a) => a.mode === "light" ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.3)"
  },
  motion: {
    transition: "${config.transition}"
  },
  feedback: {
    hoverTransform: "translateY(-1px)",
    activeTransform: "translateY(0px)"
  }
};`;

        navigator.clipboard.writeText(code);
        alert('Family code copied to clipboard!');
    };

    return (
        <div className="family-editor">
            <div className="family-sidebar">
                <div className="family-sidebar-header">
                    <h2>Design Families</h2>
                    <button className="btn-create" title="Coming soon">
                        + New
                    </button>
                </div>

                <div className="family-list">
                    {familyKeys.map(familyId => {
                        const family = families[familyId];
                        return (
                            <div
                                key={familyId}
                                className={`family-item ${selectedFamilyId === familyId ? 'active' : ''}`}
                                onClick={() => handleFamilySelect(familyId)}
                            >
                                <div className="family-item-name">{familyId}</div>
                                <div className="family-item-desc">{family.description || 'No description'}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="family-main">
                <div className="family-header">
                    <div>
                        <h2>{config.id}</h2>
                        <div className="family-desc">{config.description}</div>
                    </div>
                    <div className="family-actions">
                        <button className="btn-export" onClick={exportFamilyCode}>
                            Export Code
                        </button>
                    </div>
                </div>

                <div className="family-form">
                    <section className="form-section">
                        <h3>Description</h3>
                        <div className="form-group">
                            <label>Description</label>
                            <input
                                type="text"
                                value={config.description || ''}
                                onChange={e => updateConfig({ description: e.target.value })}
                                placeholder="Describe the family style..."
                            />
                        </div>
                    </section>

                    <section className="form-section">
                        <h3>Geometry</h3>
                        <div className="form-group">
                            <label>Small Radius: {config.radiusSm}px</label>
                            <input
                                type="range"
                                min="0"
                                max="20"
                                value={config.radiusSm}
                                onChange={e => updateConfig({ radiusSm: Number(e.target.value) })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Medium Radius: {config.radiusMd}px</label>
                            <input
                                type="range"
                                min="0"
                                max="30"
                                value={config.radiusMd}
                                onChange={e => updateConfig({ radiusMd: Number(e.target.value) })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Large Radius: {config.radiusLg}px</label>
                            <input
                                type="range"
                                min="0"
                                max="50"
                                value={config.radiusLg}
                                onChange={e => updateConfig({ radiusLg: Number(e.target.value) })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Pill Radius: {config.radiusPill}px</label>
                            <input
                                type="range"
                                min="50"
                                max="999"
                                value={config.radiusPill}
                                onChange={e => updateConfig({ radiusPill: Number(e.target.value) })}
                            />
                        </div>
                    </section>

                    <section className="form-section">
                        <h3>Border</h3>
                        <div className="form-group">
                            <label>Border Width: {config.borderWidth}px</label>
                            <input
                                type="range"
                                min="0"
                                max="8"
                                step="0.5"
                                value={config.borderWidth}
                                onChange={e => updateConfig({ borderWidth: Number(e.target.value) })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Border Style</label>
                            <select
                                value={config.borderStyle}
                                onChange={e => updateConfig({ borderStyle: e.target.value as any })}
                            >
                                <option value="none">None</option>
                                <option value="solid">Solid</option>
                                <option value="dashed">Dashed</option>
                                <option value="double">Double</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Border Color</label>
                            <input
                                type="color"
                                value={config.borderColor}
                                onChange={e => updateConfig({ borderColor: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Emphasize</label>
                            <div className="radio-group">
                                {(['border', 'fill', 'shadow'] as const).map(option => (
                                    <label key={option} className="radio-label">
                                        <input
                                            type="radio"
                                            name="emphasize"
                                            value={option}
                                            checked={config.emphasize === option}
                                            onChange={e => updateConfig({ emphasize: e.target.value as any })}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="form-section">
                        <h3>Focus Ring</h3>
                        <div className="form-group">
                            <label>Ring Width: {config.focusRingWidth}px</label>
                            <input
                                type="range"
                                min="0"
                                max="8"
                                step="0.5"
                                value={config.focusRingWidth}
                                onChange={e => updateConfig({ focusRingWidth: Number(e.target.value) })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Ring Offset: {config.focusRingOffset}px</label>
                            <input
                                type="range"
                                min="0"
                                max="8"
                                step="0.5"
                                value={config.focusRingOffset}
                                onChange={e => updateConfig({ focusRingOffset: Number(e.target.value) })}
                            />
                        </div>
                    </section>

                    <section className="form-section">
                        <h3>Motion</h3>
                        <div className="form-group">
                            <label>Transition</label>
                            <input
                                type="text"
                                value={config.transition}
                                onChange={e => updateConfig({ transition: e.target.value })}
                                placeholder="e.g., all 0.2s ease"
                            />
                        </div>
                    </section>
                </div>

                <div className="family-preview">
                    <h3>Preview</h3>
                    <div className="preview-box" style={{
                        borderRadius: `${config.radiusMd}px`,
                        border: `${config.borderWidth}px ${config.borderStyle} ${config.borderColor}`,
                        transition: config.transition,
                    }}>
                        <div className="preview-content">
                            Sample Element
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
