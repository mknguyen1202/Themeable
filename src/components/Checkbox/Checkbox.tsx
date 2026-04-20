import { forwardRef, useEffect, useRef } from 'react';
import { checkboxTokens } from './Checkbox.tokens';
import type { CheckboxProps } from './Checkbox.types';
import styles from './Checkbox.module.scss';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
    label,
    checkboxSize = 'medium',
    indeterminate = false,
    className = '',
    ...props
}, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.indeterminate = indeterminate;
        }
    }, [indeterminate, inputRef]);

    const style = {
        '--checkbox-size': checkboxTokens[`size${checkboxSize.charAt(0).toUpperCase() + checkboxSize.slice(1)}` as keyof typeof checkboxTokens],
        '--checkbox-radius': checkboxTokens.borderRadius,
        '--checkbox-border-width': checkboxTokens.borderWidth,
        '--checkbox-border-color': checkboxTokens.borderColor,
        '--checkbox-bg': checkboxTokens.backgroundColor,
        '--checkbox-checked-bg': checkboxTokens.checkedBackgroundColor,
        '--checkbox-checked-border-color': checkboxTokens.checkedBorderColor,
        '--checkbox-text-color': checkboxTokens.textColor,
    } as React.CSSProperties;

    return (
        <label className={`${styles.checkboxWrapper} ${className}`} style={style}>
            <input
                ref={inputRef}
                type="checkbox"
                className={`${styles.checkbox} ${styles[checkboxSize]}`}
                {...props}
            />
            <span className={styles.checkmark}>
                <svg viewBox="0 0 16 16" className={styles.icon}>
                    <path d="M13.5 3L6 11L2.5 7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </span>
            {label && <span className={styles.label}>{label}</span>}
        </label>
    );
});

Checkbox.displayName = 'Checkbox';
