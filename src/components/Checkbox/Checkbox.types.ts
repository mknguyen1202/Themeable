export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    label?: string;
    checkboxSize?: 'small' | 'medium' | 'large';
    indeterminate?: boolean;
}
