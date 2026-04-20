export interface PopoverProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    align?: 'start' | 'center' | 'end';
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    closeOnClickOutside?: boolean;
    offset?: number;
}
