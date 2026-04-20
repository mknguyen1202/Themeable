export interface BadgeProps {
    children: React.ReactNode;
    variant?: 'solid' | 'outline' | 'soft';
    color?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
    size?: 'small' | 'medium' | 'large';
    dot?: boolean;
    removable?: boolean;
    onRemove?: () => void;
    className?: string;
}
