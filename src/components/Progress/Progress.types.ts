export type ProgressVariant = 'bar' | 'circle';
export type ProgressColor = 'primary' | 'success' | 'warning' | 'danger' | string;
export type ProgressSize = 'sm' | 'md' | 'lg';

export interface ProgressProps {
    /** Current value, 0–100. Omit or set indeterminate=true for indeterminate state. */
    value?: number;
    /** Show an animated indeterminate state instead of a specific value. */
    indeterminate?: boolean;
    /** Visual variant — horizontal bar or circular arc. */
    variant?: ProgressVariant;
    /** Colour mapped to intent tokens, or any CSS colour string. */
    color?: ProgressColor;
    /** Preset size. */
    size?: ProgressSize;
    /** Bar only — add a striped pattern. */
    striped?: boolean;
    /** Bar only — animate the stripes (requires striped=true). */
    animated?: boolean;
    /** Show the numeric percentage inside / next to the indicator. */
    showValue?: boolean;
    /** Accessible label for screen readers. */
    label?: string;
    /** Additional class name for the root element. */
    className?: string;
}
