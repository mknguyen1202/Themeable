import { useState, useCallback } from 'react';
import type { Toast, ToastType } from './Toast.types';

let toastIdCounter = 0;

export function useToast() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback(
        (message: React.ReactNode, type: ToastType = 'info', duration = 5000, action?: Toast['action']) => {
            const id = `toast-${++toastIdCounter}`;
            const toast: Toast = { id, message, type, duration, action };

            setToasts((prev) => [...prev, toast]);
            return id;
        },
        []
    );

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const toast = useCallback(
        (message: React.ReactNode, duration?: number, action?: Toast['action']) =>
            addToast(message, 'info', duration, action),
        [addToast]
    );

    const success = useCallback(
        (message: React.ReactNode, duration?: number, action?: Toast['action']) =>
            addToast(message, 'success', duration, action),
        [addToast]
    );

    const warning = useCallback(
        (message: React.ReactNode, duration?: number, action?: Toast['action']) =>
            addToast(message, 'warning', duration, action),
        [addToast]
    );

    const error = useCallback(
        (message: React.ReactNode, duration?: number, action?: Toast['action']) =>
            addToast(message, 'error', duration, action),
        [addToast]
    );

    return {
        toasts,
        toast,
        success,
        warning,
        error,
        removeToast,
    };
}
