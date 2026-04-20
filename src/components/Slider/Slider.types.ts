export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    label?: string;
    sliderSize?: 'small' | 'medium' | 'large';
    showValue?: boolean;
}
