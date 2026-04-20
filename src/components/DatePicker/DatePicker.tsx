import { useState, useRef, useEffect } from 'react';
import { datePickerTokens } from './DatePicker.tokens';
import type { DatePickerProps } from './DatePicker.types';
import styles from './DatePicker.module.scss';

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function isSameDay(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();
}

function startOfMonth(year: number, month: number) {
    return new Date(year, month, 1);
}

function formatDisplay(date: Date, locale = 'en-US'): string {
    return date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
}

function buildCalendarDays(year: number, month: number): Date[] {
    const first = startOfMonth(year, month);
    const startDay = first.getDay(); // 0 = Sun
    const days: Date[] = [];

    // Fill leading days from previous month
    for (let i = startDay - 1; i >= 0; i--) {
        days.push(new Date(year, month, -i));
    }

    // Fill days of current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
        days.push(new Date(year, month, d));
    }

    // Fill trailing days to complete the grid (always 6 rows)
    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
        days.push(new Date(year, month + 1, d));
    }

    return days;
}

export function DatePicker({
    value,
    onChange,
    label,
    placeholder = 'Select a date',
    helperText,
    error,
    disabled = false,
    readOnly = false,
    minDate,
    maxDate,
    locale = 'en-US',
    showTodayButton = true,
    clearable = true,
}: DatePickerProps) {
    const today = new Date();
    const [isOpen, setIsOpen] = useState(false);
    const [viewYear, setViewYear] = useState((value ?? today).getFullYear());
    const [viewMonth, setViewMonth] = useState((value ?? today).getMonth());
    const rootRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Sync view with external value change
    useEffect(() => {
        if (value) {
            setViewYear(value.getFullYear());
            setViewMonth(value.getMonth());
        }
    }, [value]);

    const toggle = () => {
        if (disabled || readOnly) return;
        setIsOpen(o => !o);
    };

    const handleDayClick = (day: Date) => {
        onChange?.(day);
        setIsOpen(false);
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange?.(null);
    };

    const prevMonth = () => {
        if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
        else setViewMonth(m => m - 1);
    };
    const nextMonth = () => {
        if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
        else setViewMonth(m => m + 1);
    };

    const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString(locale, { month: 'long', year: 'numeric' });
    const calDays = buildCalendarDays(viewYear, viewMonth);

    const isDayDisabled = (d: Date) => {
        if (minDate && d < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true;
        if (maxDate && d > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true;
        return false;
    };

    const style = {
        '--dp-input-bg': datePickerTokens.inputBg,
        '--dp-border-color': datePickerTokens.inputBorderColor,
        '--dp-focus-border': datePickerTokens.inputFocusBorderColor,
        '--dp-text-color': datePickerTokens.inputTextColor,
        '--dp-placeholder': datePickerTokens.inputPlaceholderColor,
        '--dp-label-color': datePickerTokens.labelColor,
        '--dp-error-color': datePickerTokens.errorColor,
        '--dp-helper-color': datePickerTokens.helperColor,
        '--dp-cal-bg': datePickerTokens.calendarBg,
        '--dp-cal-border': datePickerTokens.calendarBorderColor,
        '--dp-cal-header-color': datePickerTokens.calendarHeaderColor,
        '--dp-day-color': datePickerTokens.dayTextColor,
        '--dp-day-muted': datePickerTokens.dayMutedColor,
        '--dp-day-hover-bg': datePickerTokens.dayHoverBg,
        '--dp-selected-bg': datePickerTokens.daySelectedBg,
        '--dp-selected-color': datePickerTokens.daySelectedColor,
        '--dp-today-border': datePickerTokens.dayTodayBorderColor,
        '--dp-radius': datePickerTokens.borderRadius,
        '--dp-cal-radius': datePickerTokens.calendarRadius,
    } as React.CSSProperties;

    return (
        <div
            ref={rootRef}
            className={`${styles.wrapper} ${error ? styles.error : ''}`}
            style={style}
        >
            {label && <label className={styles.label}>{label}</label>}

            <button
                type="button"
                className={styles.trigger}
                onClick={toggle}
                disabled={disabled}
                aria-haspopup="dialog"
                aria-expanded={isOpen}
            >
                <span className={styles.calIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                </span>
                <span className={`${styles.triggerText} ${!value ? styles.placeholder : ''}`}>
                    {value ? formatDisplay(value, locale) : placeholder}
                </span>
                {clearable && value && !disabled && !readOnly && (
                    <button type="button" className={styles.clearBtn} onClick={handleClear} aria-label="Clear date">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </button>

            {isOpen && (
                <div className={styles.calendarPopup} role="dialog" aria-label="Calendar">
                    <div className={styles.calHeader}>
                        <button type="button" className={styles.navBtn} onClick={prevMonth} aria-label="Previous month">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>
                        <span className={styles.monthYear}>{monthLabel}</span>
                        <button type="button" className={styles.navBtn} onClick={nextMonth} aria-label="Next month">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>

                    <div className={styles.weekdays}>
                        {DAYS_OF_WEEK.map(d => (
                            <div key={d} className={styles.weekday}>{d}</div>
                        ))}
                    </div>

                    <div className={styles.days}>
                        {calDays.map((day, i) => {
                            const isCurrentMonth = day.getMonth() === viewMonth;
                            const isToday = isSameDay(day, today);
                            const isSelected = value ? isSameDay(day, value) : false;
                            const isDisabled = isDayDisabled(day);

                            return (
                                <button
                                    key={i}
                                    type="button"
                                    className={[
                                        styles.day,
                                        !isCurrentMonth ? styles.dayOtherMonth : '',
                                        isToday ? styles.dayToday : '',
                                        isSelected ? styles.daySelected : '',
                                        isDisabled ? styles.dayDisabled : '',
                                    ].join(' ')}
                                    onClick={() => !isDisabled && handleDayClick(day)}
                                    aria-label={day.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                                    aria-pressed={isSelected}
                                    disabled={isDisabled}
                                >
                                    {day.getDate()}
                                </button>
                            );
                        })}
                    </div>

                    {(showTodayButton || clearable) && (
                        <div className={styles.footer}>
                            {clearable && value && (
                                <button type="button" className={styles.clearCalBtn} onClick={() => { onChange?.(null); setIsOpen(false); }}>
                                    Clear
                                </button>
                            )}
                            {showTodayButton && (
                                <button type="button" className={styles.todayBtn} onClick={() => { handleDayClick(today); }}>
                                    Today
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}

            {error ? (
                <span className={styles.errorText}>{error}</span>
            ) : helperText ? (
                <span className={styles.helperText}>{helperText}</span>
            ) : null}
        </div>
    );
}
