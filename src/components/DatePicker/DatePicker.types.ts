export interface DatePickerProps {
    value?: Date | null;
    onChange?: (date: Date | null) => void;
    label?: string;
    placeholder?: string;
    helperText?: string;
    error?: string;
    disabled?: boolean;
    readOnly?: boolean;
    minDate?: Date;
    maxDate?: Date;
    /** Locale for month/day names, defaults to 'en-US' */
    locale?: string;
    /** Show today button in footer */
    showTodayButton?: boolean;
    /** Show clear button */
    clearable?: boolean;
}
