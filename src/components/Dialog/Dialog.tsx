import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useThemeContext } from '../../system/ThemeProvider/ThemeContext';
import { dialogTokens } from './Dialog.tokens';
import type { DialogProps } from './Dialog.types';
import styles from './Dialog.module.scss';

export function Dialog({
    isOpen,
    onClose,
    title,
    children,
    size = 'medium',
    showCloseButton = true,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    footer,
}: DialogProps) {
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

    const style = {
        '--dialog-radius': `${family.geometry.radius.lg}px`,
        '--dialog-bg': family.surface.background({ level: 3, base: theme.roles.surface.base, raised: theme.roles.surface.raised, overlay: theme.roles.surface.overlay, mode: theme.mode }),
        '--dialog-overlay-color': dialogTokens.overlayColor,
        '--dialog-title-color': theme.roles.text.primary,
        '--dialog-border-color': borderColor,
        '--dialog-width': size === 'fullscreen' ? '100vw' : dialogTokens[`width${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof dialogTokens],
        '--dialog-max-height': size === 'fullscreen' ? '100vh' : dialogTokens.maxHeight,
        '--text-secondary': theme.roles.text.secondary,
        '--text-primary': theme.roles.text.primary,
        '--spacing-lg': '1.5rem',
        '--spacing-sm': '0.5rem',
    } as React.CSSProperties;

    if (!isOpen) return null;

    const content = (
        <div className={styles.dialogOverlay} style={style} onClick={closeOnOverlayClick ? onClose : undefined}>
            <div className={`${styles.dialog} ${styles[size]}`} onClick={(e) => e.stopPropagation()}>
                {(title || showCloseButton) && (
                    <div className={styles.dialogHeader}>
                        {title && <h2 className={styles.dialogTitle}>{title}</h2>}
                        {showCloseButton && (
                            <button className={styles.closeButton} onClick={onClose} aria-label="Close dialog">
                                ✕
                            </button>
                        )}
                    </div>
                )}
                <div className={styles.dialogContent}>{children}</div>
                {footer && <div className={styles.dialogFooter}>{footer}</div>}
            </div>
        </div>
    );

    return createPortal(content, document.querySelector('[data-theme-id]') ?? document.body);
}
