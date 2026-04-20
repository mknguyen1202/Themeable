import { ToastContainer } from './ToastContainer';
import { useToast } from './useToast';
import { ToastProvider, useToastContext } from './ToastProvider';

export { ToastContainer, useToast, ToastProvider, useToastContext };

// Export everything from types
export type { Toast, ToastType, ToastPosition, ToastContainerProps } from './Toast.types';

/**
 * Toast System Usage Example:
 * 
 * 1. Add ToastContainer to your app root:
 * 
 * function App() {
 *   const { toasts, toast, success, warning, error, removeToast } = useToast();
 * 
 *   return (
 *     <div>
 *       <YourApp onShowToast={toast} />
 *       <ToastContainer 
 *         toasts={toasts} 
 *         onClose={removeToast}
 *         position="top-right"
 *         maxToasts={5}
 *       />
 *     </div>
 *   );
 * }
 * 
 * 2. Use toast functions anywhere:
 * 
 * toast('Hello!'); // info toast
 * success('Saved successfully!');
 * warning('Be careful!');
 * error('Something went wrong!');
 * 
 * // With custom duration
 * toast('Loading...', 3000);
 * 
 * // With action button
 * toast('File deleted', 5000, {
 *   label: 'Undo',
 *   onClick: () => console.log('Undo clicked')
 * });
 */
