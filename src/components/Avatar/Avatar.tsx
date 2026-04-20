import { useState } from 'react';
import { avatarTokens } from './Avatar.tokens';
import type { AvatarProps } from './Avatar.types';
import styles from './Avatar.module.scss';

export function Avatar({
    src,
    alt,
    name,
    size = 'medium',
    shape = 'circle',
    fallbackIcon,
    status,
    showStatus = false,
}: AvatarProps) {
    const [imageError, setImageError] = useState(false);

    const getInitials = (name: string) => {
        const parts = name.trim().split(' ');
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
    };

    const sizeValue = typeof size === 'number' ? `${size}px` : avatarTokens[`size${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof avatarTokens];

    const style = {
        '--avatar-size': sizeValue,
        '--avatar-bg': avatarTokens.backgroundColor,
        '--avatar-text-color': avatarTokens.textColor,
        '--avatar-border-color': avatarTokens.borderColor,
        '--avatar-status-color': status ? avatarTokens[`status${status.charAt(0).toUpperCase() + status.slice(1)}` as keyof typeof avatarTokens] : undefined,
    } as React.CSSProperties;

    const showImage = src && !imageError;
    const showInitials = !showImage && name;
    const showFallback = !showImage && !showInitials;

    return (
        <div className={`${styles.avatar} ${styles[shape]}`} style={style}>
            {showImage && (
                <img
                    src={src}
                    alt={alt || name || 'Avatar'}
                    className={styles.avatarImage}
                    onError={() => setImageError(true)}
                />
            )}
            {showInitials && (
                <span className={styles.avatarInitials}>
                    {getInitials(name!)}
                </span>
            )}
            {showFallback && (
                <span className={styles.avatarFallback}>
                    {fallbackIcon || (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    )}
                </span>
            )}
            {showStatus && status && (
                <span className={`${styles.statusIndicator} ${styles[status]}`} />
            )}
        </div>
    );
}
