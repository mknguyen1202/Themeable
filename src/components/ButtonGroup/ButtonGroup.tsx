import { buttonGroupTokens } from './ButtonGroup.tokens';
import type { ButtonGroupProps } from './ButtonGroup.types';
import styles from './ButtonGroup.module.scss';

export function ButtonGroup({
    children,
    variant = 'primary',
    size = 'medium',
    orientation = 'horizontal',
    className = '',
}: ButtonGroupProps) {
    const style = {
        '--btn-group-gap': buttonGroupTokens.gap,
        '--btn-group-radius': buttonGroupTokens.borderRadius,
    } as React.CSSProperties;

    return (
        <div
            className={`${styles.buttonGroup} ${styles[variant]} ${styles[size]} ${styles[orientation]} ${className}`}
            style={style}
        >
            {children}
        </div>
    );
}
