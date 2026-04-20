import { badgeTokens } from './Badge.tokens';
import type { BadgeProps } from './Badge.types';
import styles from './Badge.module.scss';

export function Badge({
    children,
    variant = 'solid',
    color = 'primary',
    size = 'medium',
    dot = false,
    removable = false,
    onRemove,
    className = '',
}: BadgeProps) {
    const style = {
        '--badge-color': badgeTokens[`${color}Color` as keyof typeof badgeTokens],
        '--badge-radius': badgeTokens.borderRadius,
        '--badge-font-size': badgeTokens[`fontSize${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof badgeTokens],
        '--badge-padding': badgeTokens[`padding${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof badgeTokens],
    } as React.CSSProperties;

    return (
        <span
            className={`${styles.badge} ${styles[variant]} ${styles[color]} ${styles[size]} ${dot ? styles.dot : ''} ${className}`}
            style={style}
        >
            {dot && <span className={styles.dotIndicator} />}
            <span className={styles.badgeContent}>{children}</span>
            {removable && (
                <button
                    className={styles.removeButton}
                    onClick={onRemove}
                    aria-label="Remove badge"
                    type="button"
                >
                    ✕
                </button>
            )}
        </span>
    );
}
