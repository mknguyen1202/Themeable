export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    error?: string;
    helperText?: string;
    variant?: 'filled' | 'outlined' | 'underlined';
    inputSize?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
}
