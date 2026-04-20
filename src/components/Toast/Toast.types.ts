export type ToastType = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface Toast {
    id: string;
    message: React.ReactNode;
    type?: ToastType;
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    };
}

export interface ToastProps extends Toast {
    onClose: (id: string) => void;
}

export interface ToastContainerProps {
    position?: ToastPosition;
    maxToasts?: number;
}
