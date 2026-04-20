export interface AvatarProps {
    src?: string;
    alt?: string;
    name?: string;
    size?: 'small' | 'medium' | 'large' | number;
    shape?: 'circle' | 'square';
    fallbackIcon?: React.ReactNode;
    status?: 'online' | 'offline' | 'away' | 'busy';
    showStatus?: boolean;
}
