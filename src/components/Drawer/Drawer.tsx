import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useThemeContext } from '../../system/ThemeProvider/ThemeContext';
import { drawerTokens } from './Drawer.tokens';
import type { DrawerProps } from './Drawer.types';
import styles from './Drawer.module.scss';

export function Drawer({
    isOpen,
    onClose,
    title,
    children,
    position = 'right',
    size = 'medium',
    showCloseButton = true,
    closeOnOverlayClick = true,
    closeOnEscape = true,
}: DrawerProps) {
    useEffect(() => {
        if (!isOpen || !closeOnEscape) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, closeOnEscape, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const { theme, family } = useThemeContext();
    const borderColor = theme.mode === 'light' ? theme.palette.neutral[2] : theme.palette.neutral[7];

    const isHorizontal = position === 'left' || position === 'right';
    const sizeKey = `${isHorizontal ? 'width' : 'height'}${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof drawerTokens;

    const style = {
        '--drawer-bg': family.surface.background({ level: 3, base: theme.roles.surface.base, raised: theme.roles.surface.raised, overlay: theme.roles.surface.overlay, mode: theme.mode }),
        '--drawer-overlay-color': drawerTokens.overlayColor,
        '--drawer-title-color': theme.roles.text.primary,
        '--drawer-border-color': borderColor,
        '--drawer-size': drawerTokens[sizeKey],
        '--text-secondary': theme.roles.text.secondary,
        '--text-primary': theme.roles.text.primary,
        '--spacing-lg': '1.5rem',
        '--radius-lg': `${family.geometry.radius.lg}px`,
    } as React.CSSProperties;

    if (!isOpen) return null;

    const content = (
        <div className={`${styles.drawerOverlay} ${isOpen ? styles.open : ''}`} style={style} onClick={closeOnOverlayClick ? onClose : undefined}>
            <div className={`${styles.drawer} ${styles[position]} ${styles[size]}`} onClick={(e) => e.stopPropagation()}>
                {(title || showCloseButton) && (
                    <div className={styles.drawerHeader}>
                        {title && <h2 className={styles.drawerTitle}>{title}</h2>}
                        {showCloseButton && (
                            <button className={styles.closeButton} onClick={onClose} aria-label="Close drawer">
                                ✕
                            </button>
                        )}
                    </div>
                )}
                <div className={styles.drawerContent}>{children}</div>
            </div>
        </div>
    );

    return createPortal(content, document.querySelector('[data-theme-id]') ?? document.body);
}
