import { forwardRef } from 'react';
import { radioTokens } from './Radio.tokens';
import type { RadioProps } from './Radio.types';
import styles from './Radio.module.scss';

export const Radio = forwardRef<HTMLInputElement, RadioProps>(({
    label,
    radioSize = 'medium',
    className = '',
    ...props
}, ref) => {
    const style = {
        '--radio-size': radioTokens[`size${radioSize.charAt(0).toUpperCase() + radioSize.slice(1)}` as keyof typeof radioTokens],
        '--radio-border-width': radioTokens.borderWidth,
        '--radio-border-color': radioTokens.borderColor,
        '--radio-bg': radioTokens.backgroundColor,
        '--radio-checked-bg': radioTokens.checkedBackgroundColor,
        '--radio-checked-border-color': radioTokens.checkedBorderColor,
        '--radio-dot-size': radioTokens.dotSize,
        '--radio-text-color': radioTokens.textColor,
    } as React.CSSProperties;

    return (
        <label className={`${styles.radioWrapper} ${className}`} style={style}>
            <input
                ref={ref}
                type="radio"
                className={`${styles.radio} ${styles[radioSize]}`}
                {...props}
            />
            <span className={styles.radiomark}>
                <span className={styles.dot}></span>
            </span>
            {label && <span className={styles.label}>{label}</span>}
        </label>
    );
});

Radio.displayName = 'Radio';
