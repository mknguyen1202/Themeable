import { forwardRef, useState } from 'react';
import { sliderTokens } from './Slider.tokens';
import type { SliderProps } from './Slider.types';
import styles from './Slider.module.scss';

export const Slider = forwardRef<HTMLInputElement, SliderProps>(({
    label,
    sliderSize = 'medium',
    showValue = false,
    className = '',
    value,
    defaultValue,
    min = 0,
    max = 100,
    onChange,
    ...props
}, ref) => {
    const sizeKey = sliderSize.charAt(0).toUpperCase() + sliderSize.slice(1);

    // Track displayed value for both controlled and uncontrolled usage
    const isControlled = value !== undefined;
    const initialValue = isControlled ? Number(value) : Number(defaultValue ?? min);
    const [internalValue, setInternalValue] = useState(initialValue);

    const displayValue = isControlled ? Number(value) : internalValue;
    const percentage = ((displayValue - Number(min)) / (Number(max) - Number(min))) * 100;

    const style = {
        '--slider-track-height': sliderTokens[`trackHeight${sizeKey}` as keyof typeof sliderTokens],
        '--slider-thumb-size': sliderTokens[`thumbSize${sizeKey}` as keyof typeof sliderTokens],
        '--slider-track-color': sliderTokens.trackColor,
        '--slider-track-active-color': sliderTokens.trackActiveColor,
        '--slider-thumb-color': sliderTokens.thumbColor,
        '--slider-text-color': sliderTokens.textColor,
        '--slider-percentage': `${percentage}%`,
    } as React.CSSProperties;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
            setInternalValue(Number(e.target.value));
        }
        onChange?.(e);
    };

    return (
        <div className={`${styles.sliderWrapper} ${className}`} style={style}>
            {(label || showValue) && (
                <div className={styles.header}>
                    {label && <label className={styles.label}>{label}</label>}
                    {showValue && <span className={styles.value}>{displayValue}</span>}
                </div>
            )}
            <div className={styles.sliderContainer}>
                <input
                    ref={ref}
                    type="range"
                    className={`${styles.slider} ${styles[sliderSize]}`}
                    {...(isControlled ? { value } : { defaultValue })}
                    min={min}
                    max={max}
                    onChange={handleChange}
                    {...props}
                />
            </div>
        </div>
    );
});

Slider.displayName = 'Slider';
