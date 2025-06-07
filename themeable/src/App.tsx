import React, { useState, useEffect } from 'react';
import { Button } from './components/Button/Button';
import { Card } from './components/Card/Card';
import { Chip } from './components/Chip/Chip';
import PolarController from './components/PolarControl/PolarController';
import { PolarProvider, usePolarContext } from './components/PolarControl/PolarContext';
import './App.css'; // Assuming you have a corresponding SCSS file for styles

import { SketchPicker } from 'react-color'
import { s } from 'framer-motion/dist/types.d-CtuPurYT';
import { JsxElement } from 'typescript';

import { Slider } from './components/Slider/Slider';
import { Thumb } from './components/Slider/types';
import { MultiThumbSlider } from './components/Slider/MultiThumbSlider';

import { ColorPicker } from './components/editors/ColorPicker/ColorPicker';
function App() {

    const [thumbs, setThumbs] = useState<Thumb[]>([
        { id: 1, value: 30 },
        { id: 2, value: 70 },
    ]);


    return (
        <div className="App">
            <ColorPicker />
            {/* <MultiThumbSlider
                thumbs={thumbs}
                onThumbsChange={setThumbs}
                min={0}
                max={100}
                step={1}
            /> */}
            {/* <div>Thumb values: {thumbs.map(t => t.value).join(', ')}</div> */}
            {/* <PolarProvider>

                <Control />
            </PolarProvider> */}

            {/* <ColorPicker /> */}
            {/* <ButtonList /> */}
            {/* <Card>
                <h1>Card Component</h1>
                <img src="https://placehold.co/600x400" alt="Placeholder" />
                <p>User interfaces that enable people to interact smoothly with
                    data, ask better questions, and make better decisions.</p>
                <Button intent='primary'>Click Me</Button>
            </Card> */}
            {/* <Button intent='primary'>Primary Button</Button> */}
            {/* <div> */}

            {/* <Chip>
                This is a Chip component
            </Chip> */}
            {/* </div> */}
            {/* <Configurator /> */}

        </div>
    );
}


// const ColorPicker: React.FC = () => {

//     const [color, setColor] = useState('red');
//     const [hovered, setHovered] = useState(false);

//     const handleChangeComplete = (color: any) => {
//         setColor(color.hex);
//     };

//     const handleHover = () => {
//         setHovered(!hovered);
//     }

//     return (
//         <div style={{ padding: '1rem' }}>
//             {hovered && (
//                 <SketchPicker
//                     color={color}
//                     onChangeComplete={handleChangeComplete}
//                 />)}
//             <span
//                 style={{
//                     display: 'inline-block',
//                     borderRadius: '15%',
//                     marginLeft: '1rem',
//                     backgroundColor: color,

//                     width: '4rem',
//                     height: '4rem',


//                 }}
//                 onClick={handleHover}
//             >
//                 {/* Selected Color: {color} */}
//             </span>
//             <div
//                 style={{
//                     color: `${color}`,
//                 }}
//             >
//                 {color}
//             </div>
//         </div>
//     );
// }


type FillColorData = {
    fillColor: string;
}

type FillGradientData = {

}

const Configurator = () => {

    const defaultConfig: ComponentConfig = {
        fill: {
            type: 'color',
            color: '#ebebeb',
            gradientType: 'linear',
            gradientValue: 'to right, #fff, #000',
            imageUrl: '',
            backdropBlur: 0,
        },
        border: {
            color: '#000000',
            style: 'solid',
            thickness: 1,
            radius: 0,
        },
        shadows: [],
        typography: {
            fontSize: 16,
            fontWeight: 'normal',
            fontFamily: 'Arial, sans-serif',
            color: '#000000',
        },
    }

    const [config, setConfig] = useState<ComponentConfig>(defaultConfig);

    const updateFill = (fill: FillConfig) =>
        setConfig((prev) => ({ ...prev, fill }));

    const updateBorder = (border: BorderConfig) =>
        setConfig((prev) => ({ ...prev, border }));

    const updateShadows = (shadows: ShadowData[]) =>
        setConfig((prev) => ({ ...prev, shadows }));

    const updateTypo = (typography: TypoConfig) =>
        setConfig((prev) => ({ ...prev, typography }));


    return (
        <div>
            {/* <span
                style={{
                    display: 'inline-block',
                    borderRadius: '15%',
                    marginLeft: '1rem',
                    backgroundColor: "#ebebeb",
                    width: '10rem',
                    height: '10rem',
                }}
            ></span> */}
            <PreviewComponent config={config} />
            <h3>Configurator</h3>
            <div
                style={{
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'row',
                }}>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',

                        border: '1px solid #ccc',
                    }}
                >
                    <FillConfigurator fill={config.fill} onChange={updateFill} />
                    <BorderConfigurator border={config.border} onChange={updateBorder} />
                </div>
                <ShadowConfigurator shadows={config.shadows} onChange={updateShadows} />


            </div>
        </div>
    );
}







// Shadow Component -------------------------------------------------------------------------------------------------
type ShadowData = {
    offsetX: string;
    offsetY: string;
    blurRadius: string;
    spreadRadius: string;
    color?: string;
    inset: boolean;
    enabled?: boolean;
};

type ShadowProps = {
    shadowData: ShadowData;
    onChange: (updated: ShadowData) => void;
    onRemove: () => void;
    onReset: () => void;
};

const Shadow = ({ shadowData, onChange, onRemove, onReset }: ShadowProps) => {
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

const ShadowConfigurator: React.FC<ShadowConfiguratorProps> = ({ shadows, onChange }) => {
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



// -------------------------------------------------------------------------------------------------





// Fill
export type FillConfig = {
    type: 'color' | 'gradient' | 'image';
    color?: string;
    gradientType?: 'linear' | 'radial' | 'conic' | 'repeating-linear' | 'repeating-radial' | 'repeating-conic';
    gradientValue?: string; // e.g., "to right, #fff, #000"
    imageUrl?: string;
    backdropBlur?: number;
};


// Border
type BorderConfig = {
    color: string;
    style: 'none' | 'solid' | 'dashed' | 'dotted';
    thickness: number;
    radius: number;
};

// Shadow
type Shadow = {
    offsetX: number;
    offsetY: number;
    blurRadius: number;
    spreadRadius: number;
    color: string;
    inset: boolean;
};

// Typography
type TypoConfig = {
    fontSize: number;
    fontWeight: 'normal' | 'bold' | number;
    fontFamily: string;
    color: string;
};

// The whole configuration
type ComponentConfig = {
    fill: FillConfig;
    border: BorderConfig;
    shadows: ShadowData[];
    typography: TypoConfig;
};






// Background Fill Component ----------------------------------------------------------------------------
type FillConfiguratorProps = {
    fill: FillConfig;
    onChange: (updated: FillConfig) => void;
};

export const FillConfigurator: React.FC<FillConfiguratorProps> = ({ fill, onChange }) => {
    const handleChange = <K extends keyof FillConfig>(key: K, value: FillConfig[K]) => {
        onChange({ ...fill, [key]: value });
    };

    return (
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: 8 }}>
            <h4>Fill Configurator</h4>

            {/* Select fill type */}
            <label>Type:</label>
            <select
                value={fill.type}
                onChange={(e) => handleChange('type', e.target.value as FillConfig['type'])}
            >
                <option value="color">Solid Color</option>
                <option value="gradient">Gradient</option>
                <option value="image">Image</option>
            </select>

            <div style={{ marginTop: '1rem' }}>
                {fill.type === 'color' && (
                    <>
                        <label>Background Color:</label>
                        <input
                            type="color"
                            value={fill.color || '#ffffff'}
                            onChange={(e) => handleChange('color', e.target.value)}
                        />
                    </>
                )}

                {fill.type === 'gradient' && (
                    <>
                        <label>Gradient Type:</label>
                        <select
                            value={fill.gradientType || 'linear'}
                            onChange={(e) => handleChange('gradientType', e.target.value as FillConfig['gradientType'])}
                        >
                            <option value="linear">linear-gradient</option>
                            <option value="radial">radial-gradient</option>
                            <option value="conic">conic-gradient</option>
                            <option value="repeating-linear">repeating-linear-gradient</option>
                            <option value="repeating-radial">repeating-radial-gradient</option>
                            <option value="repeating-conic">repeating-conic-gradient</option>
                        </select>

                        <label>Gradient Value:</label>
                        <input
                            type="text"
                            value={fill.gradientValue || ''}
                            onChange={(e) => handleChange('gradientValue', e.target.value)}
                            placeholder="e.g. to right, #fff, #000"
                            style={{ width: '100%' }}
                        />
                    </>
                )}

                {fill.type === 'image' && (
                    <>
                        <label>Image URL:</label>
                        <input
                            type="text"
                            value={fill.imageUrl || ''}
                            onChange={(e) => handleChange('imageUrl', e.target.value)}
                            placeholder="https://example.com/texture.png"
                            style={{ width: '100%' }}
                        />
                    </>
                )}

                {/* Backdrop blur (for glassmorphism) */}
                <div style={{ marginTop: '1rem' }}>
                    <label>Backdrop Blur (px):</label>
                    <input
                        type="number"
                        value={fill.backdropBlur ?? 0}
                        min={0}
                        max={100}
                        onChange={(e) => handleChange('backdropBlur', Number(e.target.value))}
                    />
                </div>
            </div>
        </div>
    );
};

export function getFillStyle(fill: FillConfig): React.CSSProperties {
    const style: React.CSSProperties = {};

    if (fill.type === 'color') {
        style.background = fill.color;
    } else if (fill.type === 'gradient') {
        const typePrefix = fill.gradientType || 'linear';
        style.background = `${typePrefix}-gradient(${fill.gradientValue})`;
    } else if (fill.type === 'image') {
        style.backgroundImage = `url(${fill.imageUrl})`;
        style.backgroundSize = 'cover';
    }

    if (fill.backdropBlur) {
        style.backdropFilter = `blur(${fill.backdropBlur}px)`;
    }

    return style;
}



// -------------------------------------------------------------------------------------------------


// Gradient Background Component ----------------------------------------------------------------------------
const GradientFillConfigurator: React.FC = () => {
    const [gradientType, setGradientType] = useState<string>('linear');
    const [gradientDirection, setGradientDirection] = useState<string>('to right');
    const [gradientColors, setGradientColors] = useState<string[]>(['#ff7e5f', '#feb47b']);
    // State to hold the gradient CSS string
    const [gradient, setGradient] = useState<string>('linear-gradient(to right, #ff7e5f, #feb47b)');

    const backgrounGradientTypes = [
        'linear-gradient',
        'radial-gradient',
        'conic-gradient',
        'repeating-linear-gradient',
        'repeating-radial-gradient',
    ];

    const handleGradientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGradient(e.target.value);
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h4>Gradient Background</h4>
            <input
                type="text"
                value={gradient}
                onChange={handleGradientChange}
                placeholder="Enter gradient CSS"
                style={{ width: '100%', marginBottom: '1rem' }}
            />
            <div
                style={{
                    width: '100%',
                    height: '3rem',
                    background: gradient,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '1.5rem'
                }}
            >
                Gradient Preview
            </div>
        </div>
    );
};
// -------------------------------------------------------------------------------------------------













// BorderConfigurator Component ----------------------------------------------------------------------------
type BorderConfiguratorProps = {
    border?: BorderConfig;
    onChange: (border: BorderConfig) => void;
}

const BorderConfigurator: React.FC<BorderConfiguratorProps> = ({
    border,
    onChange,
}) => {
    const [borderStyle, setBorderStyle] = useState<string>('solid');
    const [borderWidth, setBorderWidth] = useState<string>('1px');
    const [borderColor, setBorderColor] = useState<string>('#000000');
    const [borderRadius, setBorderRadius] = useState<string>('0px');

    useEffect(() => {
        const updatedBorder: BorderConfig = {
            style: borderStyle as BorderConfig['style'],
            thickness: parseInt(borderWidth, 10) || 0,
            color: borderColor,
            radius: parseInt(borderRadius, 10) || 0,
        };
        onChange(updatedBorder);
    }, [borderStyle, borderWidth, borderColor, borderRadius]);


    return (
        <div style={{ padding: '1rem' }}>
            <h4>Border Configurator</h4>
            <div style={{ marginBottom: '1rem' }}>
                <label>Border Style:</label>
                <select
                    value={borderStyle}
                    onChange={(e) => setBorderStyle(e.target.value)}
                    style={{ marginLeft: '0.5rem' }}
                >
                    <option value="none">None</option>
                    <option value="solid">Solid</option>
                    <option value="dashed">Dashed</option>
                    <option value="dotted">Dotted</option>
                    <option value="double">Double</option>
                </select>
                <label style={{ marginLeft: '1rem' }}>Border Width:</label>
                <input
                    type="text"
                    value={borderWidth}
                    onChange={(e) => setBorderWidth(e.target.value)}
                    placeholder="e.g. 1px"
                    style={{ marginLeft: '0.5rem', width: '4rem' }}
                />
                <label style={{ marginLeft: '1rem' }}>Border Color:</label>
                <input
                    type="color"
                    value={borderColor}
                    onChange={(e) => setBorderColor(e.target.value)}
                    style={{ marginLeft: '0.5rem' }}
                />
                <label style={{ marginLeft: '1rem' }}>Border Radius:</label>
                <input
                    type="text"
                    value={borderRadius}
                    onChange={(e) => setBorderRadius(e.target.value)}
                    placeholder="e.g. 0px"
                    style={{ marginLeft: '0.5rem', width: '4rem' }}
                />
            </div>
        </div>
    );
}










// Preview Component ----------------------------------------------------------------------------
const PreviewComponent = ({ config }: { config: ComponentConfig }) => {
    const { fill, border, shadows, typography } = config;

    console.log(border);

    const style: React.CSSProperties = {
        background:
            fill.type === 'color'
                ? fill.color
                : fill.type === 'gradient'
                    ? `${fill.gradientType}-gradient(${fill.gradientValue})`
                    : `url(${fill.imageUrl})`,
        border: `${border.thickness}px ${border.style} ${border.color}`,
        borderRadius: border.radius,
        boxShadow: shadows
            .map((s) =>
                `${s.inset ? 'inset ' : ''}${s.offsetX}px ${s.offsetY}px ${s.blurRadius}px ${s.spreadRadius}px ${s.color}`
            )
            .join(', '),
        fontSize: typography.fontSize,
        fontWeight: typography.fontWeight,
        fontFamily: typography.fontFamily,
        color: typography.color,
        backdropFilter: fill.backdropBlur ? `blur(${fill.backdropBlur}px)` : undefined,
        padding: '1rem',
    };

    return <button style={style}>Sample Button</button>;
};











// Button List Component ----------------------------------------------------------------------------
const ButtonList: React.FC = () => {
    const [buttons, setButtons] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    const handleAddButton = () => {
        if (inputValue.trim() === '') return;
        setButtons(prev => [...prev, inputValue]);
        // setInputValue(''); // Optional: clear input after adding
    };

    return (
        <div style={{ padding: '1rem' }}>
            <input
                type="text"
                placeholder="Enter button name"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                style={{ marginRight: '0.5rem' }}
            />
            <Button onClick={handleAddButton}>Add Button</Button>
            <div style={{ marginTop: '1rem' }}>
                {buttons.map((label, index) => (
                    <button key={index} style={{ margin: '0.25rem' }}>
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
};


export default App;
