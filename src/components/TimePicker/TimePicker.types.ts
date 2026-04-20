export interface TimeValue {
    hours: number;   // 0–23
    minutes: number; // 0–59
    seconds?: number; // 0–59, optional
}

export interface TimePickerProps {
    value?: TimeValue | null;
    onChange?: (time: TimeValue | null) => void;
    label?: string;
    placeholder?: string;
    helperText?: string;
    error?: string;
    disabled?: boolean;
    readOnly?: boolean;
    /** Show seconds column */
    showSeconds?: boolean;
    /** 12 or 24 hour clock */
    hourCycle?: 12 | 24;
    /** Minute step increment */
    minuteStep?: number;
    /** Second step increment */
    secondStep?: number;
    clearable?: boolean;
}
