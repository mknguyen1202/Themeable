import { createContext, useContext, useState, useCallback } from 'react';
import { ToastContainer } from './ToastContainer';
import type { Toast, ToastType, ToastPosition } from './Toast.types';

let toastIdCounter = 0;

interface ToastContextValue {
    toast: (message: React.ReactNode, duration?: number, action?: Toast['action']) => string;
    success: (message: React.ReactNode, duration?: number, action?: Toast['action']) => string;
    warning: (message: React.ReactNode, duration?: number, action?: Toast['action']) => string;
    error: (message: React.ReactNode, duration?: number, action?: Toast['action']) => string;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({
    children,
    position = 'top-right',
    maxToasts = 5
}: {
    children: React.ReactNode;
    position?: ToastPosition;
    maxToasts?: number;
}) {
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

    const value: ToastContextValue = {
        toast,
        success,
        warning,
        error,
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastContainer toasts={toasts} onClose={removeToast} position={position} maxToasts={maxToasts} />
        </ToastContext.Provider>
    );
}

export function useToastContext(): ToastContextValue {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToastContext must be used within a ToastProvider');
    }
    return context;
}
