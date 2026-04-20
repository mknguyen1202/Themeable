import { createPortal } from 'react-dom';
import { ToastItem } from './Toast';
import type { Toast, ToastContainerProps } from './Toast.types';
import styles from './ToastContainer.module.scss';

interface ToastContainerInternalProps extends ToastContainerProps {
    toasts: Toast[];
    onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose, position = 'top-right', maxToasts = 5 }: ToastContainerInternalProps) {
    const displayedToasts = toasts.slice(0, maxToasts);

    const content = (
        <div className={`${styles.toastContainer} ${styles[position]}`}>
            {displayedToasts.map((toast) => (
                <ToastItem key={toast.id} {...toast} onClose={onClose} />
            ))}
        </div>
    );

    return createPortal(content, document.querySelector('[data-theme-id]') ?? document.body);
}
