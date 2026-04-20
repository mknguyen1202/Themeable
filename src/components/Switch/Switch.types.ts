export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    label?: string;
    switchSize?: 'small' | 'medium' | 'large';
}
