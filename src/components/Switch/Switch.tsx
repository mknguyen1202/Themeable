import { forwardRef } from 'react';
import { switchTokens } from './Switch.tokens';
import type { SwitchProps } from './Switch.types';
import styles from './Switch.module.scss';

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(({
    label,
    switchSize = 'medium',
    className = '',
    ...props
}, ref) => {
    const sizeKey = switchSize.charAt(0).toUpperCase() + switchSize.slice(1);

    const style = {
        '--switch-width': switchTokens[`width${sizeKey}` as keyof typeof switchTokens],
        '--switch-height': switchTokens[`height${sizeKey}` as keyof typeof switchTokens],
        '--switch-thumb-size': switchTokens[`thumbSize${sizeKey}` as keyof typeof switchTokens],
        '--switch-radius': switchTokens.borderRadius,
        '--switch-bg': switchTokens.backgroundColor,
        '--switch-checked-bg': switchTokens.checkedBackgroundColor,
        '--switch-thumb-color': switchTokens.thumbColor,
        '--switch-text-color': switchTokens.textColor,
    } as React.CSSProperties;

    return (
        <label className={`${styles.switchWrapper} ${className}`} style={style}>
            <input
                ref={ref}
                type="checkbox"
                className={`${styles.switch} ${styles[switchSize]}`}
                {...props}
            />
            <span className={styles.slider}>
                <span className={styles.thumb}></span>
            </span>
            {label && <span className={styles.label}>{label}</span>}
        </label>
    );
});

Switch.displayName = 'Switch';
