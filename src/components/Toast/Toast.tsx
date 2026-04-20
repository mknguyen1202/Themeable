import { useEffect, useState } from 'react';
import { toastTokens } from './Toast.tokens';
import type { ToastProps } from './Toast.types';
import styles from './Toast.module.scss';

export function ToastItem({ id, message, type = 'info', duration = 5000, action, onClose }: ToastProps) {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (duration === 0) return;

        const timer = setTimeout(() => {
            handleClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, id]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            onClose(id);
        }, 300);
    };

    const style = {
        '--toast-bg': toastTokens.backgroundColor,
        '--toast-radius': toastTokens.borderRadius,
        '--toast-border-color': toastTokens.borderColor,
        '--toast-text-color': toastTokens.textColor,
        '--toast-accent-color': toastTokens[`${type}Color` as keyof typeof toastTokens],
        '--toast-min-width': toastTokens.minWidth,
        '--toast-max-width': toastTokens.maxWidth,
    } as React.CSSProperties;

    const icons = {
        info: 'ℹ️',
        success: '✓',
        warning: '⚠️',
        error: '✕',
    };

    return (
        <div
            className={`${styles.toast} ${styles[type]} ${isExiting ? styles.exiting : ''}`}
            style={style}
        >
            <div className={styles.toastIcon}>{icons[type]}</div>
            <div className={styles.toastContent}>
                <div className={styles.toastMessage}>{message}</div>
                {action && (
                    <button className={styles.toastAction} onClick={action.onClick}>
                        {action.label}
                    </button>
                )}
            </div>
            <button className={styles.closeButton} onClick={handleClose} aria-label="Close toast">
                ✕
            </button>
        </div>
    );
}
