export interface ButtonGroupProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'medium' | 'large';
    orientation?: 'horizontal' | 'vertical';
    className?: string;
}
