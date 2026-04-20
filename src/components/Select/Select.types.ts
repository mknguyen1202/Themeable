export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    label?: string;
    error?: string;
    helperText?: string;
    variant?: 'filled' | 'outlined' | 'underlined';
    selectSize?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
    options: Array<{ value: string; label: string }>;
}
