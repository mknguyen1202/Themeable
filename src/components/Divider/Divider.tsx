import { dividerTokens } from './Divider.tokens';
import type { DividerProps } from './Divider.types';
import styles from './Divider.module.scss';

export function Divider({
    orientation = 'horizontal',
    variant = 'solid',
    thickness = dividerTokens.defaultThickness,
    color = dividerTokens.defaultColor,
    spacing = dividerTokens.defaultSpacing,
    label,
    labelPosition = 'center',
    className = '',
}: DividerProps) {
    const spacingValue = typeof spacing === 'number' ? `${spacing}px` : spacing;

    const style = {
        '--divider-color': color,
        '--divider-thickness': `${thickness}px`,
        '--divider-spacing': spacingValue,
        '--divider-label-color': dividerTokens.labelColor,
    } as React.CSSProperties;

    if (label) {
        return (
            <div
                className={`${styles.dividerWithLabel} ${styles[orientation]} ${styles[labelPosition]} ${className}`}
                style={style}
                role="separator"
            >
                <div className={`${styles.dividerLine} ${styles[variant]}`} />
                <span className={styles.dividerLabel}>{label}</span>
                <div className={`${styles.dividerLine} ${styles[variant]}`} />
            </div>
        );
    }

    return (
        <hr
            className={`${styles.divider} ${styles[orientation]} ${styles[variant]} ${className}`}
            style={style}
            role="separator"
        />
    );
}
