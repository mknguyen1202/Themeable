import { forwardRef } from 'react';
import { selectTokens } from './Select.tokens';
import type { SelectProps } from './Select.types';
import styles from './Select.module.scss';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
    label,
    error,
    helperText,
    variant = 'outlined',
    selectSize = 'medium',
    fullWidth = false,
    options,
    className = '',
    ...props
}, ref) => {
    const style = {
        '--select-radius': selectTokens.borderRadius,
        '--select-border-width': selectTokens.borderWidth,
        '--select-border-color': error ? selectTokens.errorBorderColor : selectTokens.borderColor,
        '--select-bg': selectTokens.backgroundColor,
        '--select-text-color': selectTokens.textColor,
        '--select-focus-border-color': error ? selectTokens.errorBorderColor : selectTokens.focusBorderColor,
        '--select-padding': selectTokens[`padding${selectSize.charAt(0).toUpperCase() + selectSize.slice(1)}` as keyof typeof selectTokens],
        '--select-font-size': selectTokens[`fontSize${selectSize.charAt(0).toUpperCase() + selectSize.slice(1)}` as keyof typeof selectTokens],
    } as React.CSSProperties;

    return (
        <div className={`${styles.selectWrapper} ${fullWidth ? styles.fullWidth : ''}`} style={style}>
            {label && <label className={styles.label}>{label}</label>}
            <div className={styles.selectContainer}>
                <select
                    ref={ref}
                    className={`${styles.select} ${styles[variant]} ${styles[selectSize]} ${error ? styles.error : ''} ${className}`}
                    {...props}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <span className={styles.arrow}>▼</span>
            </div>
            {error && <span className={styles.errorText}>{error}</span>}
            {helperText && !error && <span className={styles.helperText}>{helperText}</span>}
        </div>
    );
});

Select.displayName = 'Select';
