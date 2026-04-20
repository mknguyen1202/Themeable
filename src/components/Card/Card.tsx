import { cardTokens } from './Card.tokens';
import type { CardProps, CardHeaderProps, CardMediaProps, CardContentProps, CardActionsProps } from './Card.types';
import styles from './Card.module.scss';

export function Card({
    children,
    variant = 'elevated',
    padding = 'medium',
    hoverable = false,
    clickable = false,
    onClick,
    className = '',
    style: customStyle,
}: CardProps) {
    const style = {
        '--card-bg': cardTokens.backgroundColor,
        '--card-border-color': cardTokens.borderColor,
        '--card-radius': cardTokens.borderRadius,
        '--card-shadow': cardTokens.shadowElevated,
        '--card-shadow-hover': cardTokens.shadowHover,
        '--card-padding': cardTokens[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}` as keyof typeof cardTokens],
        // Sub-components (Header/Content/Actions) always get at least medium padding
        // so that padding="none" (used for full-bleed media) doesn't collapse them.
        '--card-inner-padding': padding === 'none' ? cardTokens.paddingMedium : cardTokens[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}` as keyof typeof cardTokens],
        ...customStyle,
    } as React.CSSProperties;

    const Component = clickable || onClick ? 'button' : 'div';

    return (
        <Component
            className={`${styles.card} ${styles[variant]} ${styles[padding]} ${hoverable ? styles.hoverable : ''} ${clickable ? styles.clickable : ''} ${className}`}
            style={style}
            onClick={onClick}
            type={Component === 'button' ? 'button' : undefined}
        >
            {children}
        </Component>
    );
}

export function CardHeader({ children, avatar, action, className = '' }: CardHeaderProps) {
    return (
        <div className={`${styles.cardHeader} ${className}`}>
            {avatar && <div className={styles.cardAvatar}>{avatar}</div>}
            <div className={styles.cardHeaderContent}>{children}</div>
            {action && <div className={styles.cardAction}>{action}</div>}
        </div>
    );
}

export function CardMedia({ src, alt = '', height = '200px', aspectRatio, className = '' }: CardMediaProps) {
    const style = {
        '--card-media-height': typeof height === 'number' ? `${height}px` : height,
        '--card-media-aspect-ratio': aspectRatio,
    } as React.CSSProperties;

    return (
        <div className={`${styles.cardMedia} ${className}`} style={style}>
            <img src={src} alt={alt} />
        </div>
    );
}

export function CardContent({ children, className = '' }: CardContentProps) {
    return (
        <div className={`${styles.cardContent} ${className}`}>
            {children}
        </div>
    );
}

export function CardActions({ children, align = 'left', className = '' }: CardActionsProps) {
    const style = {
        '--card-actions-justify': align === 'space-between' ? 'space-between' : align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
    } as React.CSSProperties;

    return (
        <div className={`${styles.cardActions} ${className}`} style={style}>
            {children}
        </div>
    );
}

// Named exports for sub-components
Card.Header = CardHeader;
Card.Media = CardMedia;
Card.Content = CardContent;
Card.Actions = CardActions;
