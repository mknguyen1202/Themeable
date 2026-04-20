export interface DividerProps {
    orientation?: 'horizontal' | 'vertical';
    variant?: 'solid' | 'dashed' | 'dotted';
    thickness?: number;
    color?: string;
    spacing?: number | string;
    label?: React.ReactNode;
    labelPosition?: 'left' | 'center' | 'right';
    className?: string;
}
