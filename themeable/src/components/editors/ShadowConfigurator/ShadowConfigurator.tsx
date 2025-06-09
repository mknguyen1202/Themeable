import React from 'react';
import { Button } from '../../Button/Button';
import { ShadowData, ShadowProps } from './types';

export const Shadow = ({ shadowData, onChange, onRemove, onReset }: ShadowProps) => {
    const editableFields = ['offsetX', 'offsetY', 'blurRadius', 'spreadRadius'] as const;
    type EditableField = typeof editableFields[number];

    const handleChange = (key: EditableField) => (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...shadowData, [key]: e.target.value });
    };

    return (
        <div style={{ marginBottom: '1rem', padding: '0.75rem', border: '1px solid #ccc', borderRadius: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <label>
                    <input
                        type='checkbox'
                        checked={shadowData.enabled ?? true}
                        onChange={(e) => onChange({ ...shadowData, enabled: e.target.checked })}
                    /> Enable Shadow
                </label>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
                {editableFields.map((key) => (
                    <div key={key}>
                        <label>{key}</label>
                        <input
                            type="number"
                            value={shadowData[key]}
                            onChange={handleChange(key)}
                            style={{ width: '4rem' }}
                        />
                    </div>
                ))}

                <label>Inset</label>
                <input
                    type='checkbox'
                    checked={shadowData.inset}
                    onChange={(e) => onChange({ ...shadowData, inset: e.target.checked })}
                    title='Inset Shadow'
                />

                <input
                    type='color'
                    value={shadowData.color || '#000000'}
                    onChange={(e) => onChange({ ...shadowData, color: e.target.value })}
                />

                <span style={{ color: shadowData.color }}>{shadowData.color}</span>

                <Button onClick={onReset}>Reset</Button>
                <Button intent="danger" onClick={onRemove}>Remove</Button>
            </div>
        </div>
    );
};

type ShadowConfiguratorProps = {
    shadows: ShadowData[];
    onChange: (updated: ShadowData[]) => void;
};

export const ShadowConfigurator: React.FC<ShadowConfiguratorProps> = ({ shadows, onChange }) => {
    const defaultShadow = (): ShadowData => ({
        offsetX: '0',
        offsetY: '0',
        blurRadius: '5',
        spreadRadius: '0',
        color: 'rgba(0, 0, 0, 0.5)',
        inset: false,
        enabled: true,
    });

    const handleAddShadow = () => onChange([...shadows, defaultShadow()]);

    const updateShadow = (index: number, updated: ShadowData) => {
        const newShadows = [...shadows];
        newShadows[index] = updated;
        onChange(newShadows);
    };

    const removeShadow = (index: number) => {
        const newShadows = shadows.filter((_, i) => i !== index);
        onChange(newShadows);
    };

    const resetShadow = (index: number) => {
        const newShadows = [...shadows];
        newShadows[index] = defaultShadow();
        onChange(newShadows);
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h4>Shadow Configurator</h4>
            <Button onClick={handleAddShadow}>Add Shadow</Button>
            {shadows.map((shadow, index) => (
                <Shadow
                    key={index}
                    shadowData={shadow}
                    onChange={(updated) => updateShadow(index, updated)}
                    onRemove={() => removeShadow(index)}
                    onReset={() => resetShadow(index)}
                />
            ))}
        </div>
    );
};
