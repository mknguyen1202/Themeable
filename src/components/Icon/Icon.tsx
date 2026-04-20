import { iconTokens } from './Icon.tokens';
import type { IconProps } from './Icon.types';
import styles from './Icon.module.scss';

export function Icon({
    name,
    size = iconTokens.defaultSize,
    color = iconTokens.defaultColor,
    strokeWidth = iconTokens.defaultStrokeWidth,
    className = '',
    children,
    ...props
}: IconProps) {
    const style = {
        '--icon-size': typeof size === 'number' ? `${size}px` : size,
        '--icon-color': color,
        '--icon-stroke-width': strokeWidth,
    } as React.CSSProperties;

    return (
        <svg
            className={`${styles.icon} ${className}`}
            style={style}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            {children}
        </svg>
    );
}

// Preset icons
export const Icons = {
    Check: (props: Omit<IconProps, 'children'>) => (
        <Icon {...props}>
            <polyline points="20 6 9 17 4 12" />
        </Icon>
    ),
    X: (props: Omit<IconProps, 'children'>) => (
        <Icon {...props}>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </Icon>
    ),
    ChevronDown: (props: Omit<IconProps, 'children'>) => (
        <Icon {...props}>
            <polyline points="6 9 12 15 18 9" />
        </Icon>
    ),
    ChevronUp: (props: Omit<IconProps, 'children'>) => (
        <Icon {...props}>
            <polyline points="18 15 12 9 6 15" />
        </Icon>
    ),
    ChevronLeft: (props: Omit<IconProps, 'children'>) => (
        <Icon {...props}>
            <polyline points="15 18 9 12 15 6" />
        </Icon>
    ),
    ChevronRight: (props: Omit<IconProps, 'children'>) => (
        <Icon {...props}>
            <polyline points="9 18 15 12 9 6" />
        </Icon>
    ),
    Menu: (props: Omit<IconProps, 'children'>) => (
        <Icon {...props}>
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
        </Icon>
    ),
    Search: (props: Omit<IconProps, 'children'>) => (
        <Icon {...props}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
        </Icon>
    ),
    Settings: (props: Omit<IconProps, 'children'>) => (
        <Icon {...props}>
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
        </Icon>
    ),
    User: (props: Omit<IconProps, 'children'>) => (
        <Icon {...props}>
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </Icon>
    ),
    Home: (props: Omit<IconProps, 'children'>) => (
        <Icon {...props}>
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </Icon>
    ),
    Heart: (props: Omit<IconProps, 'children'>) => (
        <Icon {...props}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </Icon>
    ),
    Star: (props: Omit<IconProps, 'children'>) => (
        <Icon {...props}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </Icon>
    ),
    Info: (props: Omit<IconProps, 'children'>) => (
        <Icon {...props}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
        </Icon>
    ),
    AlertCircle: (props: Omit<IconProps, 'children'>) => (
        <Icon {...props}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
        </Icon>
    ),
    MoreVertical: (props: Omit<IconProps, 'children'>) => (
        <Icon {...props}>
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="19" r="1" />
        </Icon>
    ),
    Plus: (props: Omit<IconProps, 'children'>) => (
        <Icon {...props}>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </Icon>
    ),
};
