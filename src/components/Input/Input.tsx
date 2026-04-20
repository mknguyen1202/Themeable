import { forwardRef } from 'react';
import { inputTokens } from './Input.tokens';
import type { InputProps } from './Input.types';
import styles from './Input.module.scss';

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    label,
    error,
    helperText,
    variant = 'outlined',
    inputSize = 'medium',
    fullWidth = false,
    className = '',
    ...props
}, ref) => {
    const style = {
        '--input-radius': inputTokens.borderRadius,
        '--input-border-width': inputTokens.borderWidth,
        '--input-border-color': error ? inputTokens.errorBorderColor : inputTokens.borderColor,
        '--input-bg': inputTokens.backgroundColor,
        '--input-text-color': inputTokens.textColor,
        '--input-placeholder-color': inputTokens.placeholderColor,
        '--input-focus-border-color': error ? inputTokens.errorBorderColor : inputTokens.focusBorderColor,
        '--input-padding': inputTokens[`padding${inputSize.charAt(0).toUpperCase() + inputSize.slice(1)}` as keyof typeof inputTokens],
        '--input-font-size': inputTokens[`fontSize${inputSize.charAt(0).toUpperCase() + inputSize.slice(1)}` as keyof typeof inputTokens],
    } as React.CSSProperties;

    return (
        <div className={`${styles.inputWrapper} ${fullWidth ? styles.fullWidth : ''}`} style={style}>
            {label && <label className={styles.label}>{label}</label>}
            <input
                ref={ref}
                className={`${styles.input} ${styles[variant]} ${styles[inputSize]} ${error ? styles.error : ''} ${className}`}
                {...props}
            />
            {error && <span className={styles.errorText}>{error}</span>}
            {helperText && !error && <span className={styles.helperText}>{helperText}</span>}
        </div>
    );
});

Input.displayName = 'Input';
