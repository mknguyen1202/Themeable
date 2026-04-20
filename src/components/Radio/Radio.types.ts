export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    label?: string;
    radioSize?: 'small' | 'medium' | 'large';
}
