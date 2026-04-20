export interface CardProps {
    children: React.ReactNode;
    variant?: 'elevated' | 'outlined' | 'filled';
    padding?: 'none' | 'small' | 'medium' | 'large';
    hoverable?: boolean;
    clickable?: boolean;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
}

export interface CardHeaderProps {
    children: React.ReactNode;
    avatar?: React.ReactNode;
    action?: React.ReactNode;
    className?: string;
}

export interface CardMediaProps {
    src: string;
    alt?: string;
    height?: string | number;
    aspectRatio?: string;
    className?: string;
}

export interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export interface CardActionsProps {
    children: React.ReactNode;
    align?: 'left' | 'center' | 'right' | 'space-between';
    className?: string;
}
