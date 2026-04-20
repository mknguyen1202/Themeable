import { useState, useRef, useEffect, useCallback } from 'react';
import { timePickerTokens } from './TimePicker.tokens';
import type { TimePickerProps, TimeValue } from './TimePicker.types';
import styles from './TimePicker.module.scss';

const pad = (n: number) => String(n).padStart(2, '0');

function formatDisplay(value: TimeValue, hourCycle: 12 | 24, showSeconds: boolean): string {
    let h = value.hours;
    let suffix = '';
    if (hourCycle === 12) {
        suffix = h >= 12 ? ' PM' : ' AM';
        h = h % 12 || 12;
    }
    const base = `${pad(h)}:${pad(value.minutes)}`;
    return showSeconds && value.seconds !== undefined
        ? `${base}:${pad(value.seconds)}${suffix}`
        : `${base}${suffix}`;
}

function range(start: number, end: number, step = 1): number[] {
    const result: number[] = [];
    for (let i = start; i <= end; i += step) result.push(i);
    return result;
}

interface ScrollColumnProps {
    items: number[];
    selected: number;
    onSelect: (v: number) => void;
    format?: (v: number) => string;
}

function ScrollColumn({ items, selected, onSelect, format = pad }: ScrollColumnProps) {
    const listRef = useRef<HTMLDivElement>(null);
    const itemHeight = 34; // 2.125rem at 16px base

    // Scroll to selected on mount and when selection changes
    useEffect(() => {
        const el = listRef.current;
        if (!el) return;
        const idx = items.indexOf(selected);
        if (idx === -1) return;
        el.scrollTop = idx * itemHeight;
    }, [selected, items]);

    const handleScroll = useCallback(() => {
        const el = listRef.current;
        if (!el) return;
        const idx = Math.round(el.scrollTop / itemHeight);
        const clamped = Math.max(0, Math.min(idx, items.length - 1));
        if (items[clamped] !== selected) {
            onSelect(items[clamped]);
        }
    }, [items, selected, onSelect]);

    return (
        <div
            ref={listRef}
            className={styles.column}
            onScroll={handleScroll}
        >
            {items.map(v => (
                <div
                    key={v}
                    className={`${styles.item} ${v === selected ? styles.itemSelected : ''}`}
                    onClick={() => {
                        onSelect(v);
                        const el = listRef.current;
                        if (el) {
                            const idx = items.indexOf(v);
                            el.scrollTop = idx * itemHeight;
                        }
                    }}
                    role="option"
                    aria-selected={v === selected}
                >
                    {format(v)}
                </div>
            ))}
        </div>
    );
}

export function TimePicker({
    value,
    onChange,
    label,
    placeholder = 'Select time',
    helperText,
    error,
    disabled = false,
    readOnly = false,
    showSeconds = false,
    hourCycle = 24,
    minuteStep = 1,
    secondStep = 1,
    clearable = true,
}: TimePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    // Derive internal state from value
    const hours24 = value?.hours ?? 0;
    const minutes = value?.minutes ?? 0;
    const seconds = value?.seconds ?? 0;
    const isPM = hourCycle === 12 && hours24 >= 12;

    const hours12Display = hourCycle === 12 ? (hours24 % 12 || 12) : hours24;

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

    const toggle = () => {
        if (disabled || readOnly) return;
        setIsOpen(o => !o);
    };

    const update = (patch: Partial<TimeValue>) => {
        const base: TimeValue = { hours: hours24, minutes, seconds, ...patch };
        onChange?.(base);
    };

    const setHour = (h: number) => {
        if (hourCycle === 12) {
            // Keep AM/PM, just change the 1–12 display value
            const adjusted = isPM ? (h === 12 ? 12 : h + 12) : (h === 12 ? 0 : h);
            update({ hours: adjusted });
        } else {
            update({ hours: h });
        }
    };

    const setAmPm = (pm: boolean) => {
        let h = hours24;
        if (pm && h < 12) h += 12;
        if (!pm && h >= 12) h -= 12;
        update({ hours: h });
    };

    const setNow = () => {
        const now = new Date();
        onChange?.({ hours: now.getHours(), minutes: now.getMinutes(), seconds: now.getSeconds() });
        setIsOpen(false);
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange?.(null);
    };

    const hourItems = hourCycle === 12 ? range(1, 12) : range(0, 23);
    const minuteItems = range(0, 59, minuteStep);
    const secondItems = range(0, 59, secondStep);

    const style = {
        '--tp-input-bg': timePickerTokens.inputBg,
        '--tp-border-color': timePickerTokens.inputBorderColor,
        '--tp-focus-border': timePickerTokens.inputFocusBorderColor,
        '--tp-text-color': timePickerTokens.inputTextColor,
        '--tp-placeholder': timePickerTokens.inputPlaceholderColor,
        '--tp-label-color': timePickerTokens.labelColor,
        '--tp-error-color': timePickerTokens.errorColor,
        '--tp-helper-color': timePickerTokens.helperColor,
        '--tp-popup-bg': timePickerTokens.popupBg,
        '--tp-popup-border': timePickerTokens.popupBorderColor,
        '--tp-col-header': timePickerTokens.columnHeaderColor,
        '--tp-item-color': timePickerTokens.itemTextColor,
        '--tp-item-hover-bg': timePickerTokens.itemHoverBg,
        '--tp-selected-bg': timePickerTokens.itemSelectedBg,
        '--tp-selected-color': timePickerTokens.itemSelectedColor,
        '--tp-sep-color': timePickerTokens.separatorColor,
        '--tp-radius': timePickerTokens.borderRadius,
        '--tp-popup-radius': timePickerTokens.popupRadius,
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
                <span className={styles.clockIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                    </svg>
                </span>
                <span className={`${styles.triggerText} ${!value ? styles.placeholder : ''}`}>
                    {value ? formatDisplay(value, hourCycle, showSeconds) : placeholder}
                </span>
                {clearable && value && !disabled && !readOnly && (
                    <button type="button" className={styles.clearBtn} onClick={handleClear} aria-label="Clear time">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </button>

            {isOpen && (
                <div className={styles.popup} role="dialog" aria-label="Time picker">
                    {/* Column headers */}
                    <div className={styles.columnHeaders}>
                        <div className={styles.columnHeader}>{hourCycle === 12 ? 'Hour' : 'HH'}</div>
                        <div style={{ width: 10, flexShrink: 0 }} />
                        <div className={styles.columnHeader}>MM</div>
                        {showSeconds && <><div style={{ width: 10, flexShrink: 0 }} /><div className={styles.columnHeader}>SS</div></>}
                        {hourCycle === 12 && <div className={styles.ampmHeader}>AM/PM</div>}
                    </div>

                    {/* Scroll columns */}
                    <div className={styles.columns}>
                        <ScrollColumn
                            items={hourItems}
                            selected={hours12Display}
                            onSelect={setHour}
                        />
                        <span className={styles.separator}>:</span>
                        <ScrollColumn
                            items={minuteItems}
                            selected={minutes}
                            onSelect={m => update({ minutes: m })}
                        />
                        {showSeconds && (
                            <>
                                <span className={styles.separator}>:</span>
                                <ScrollColumn
                                    items={secondItems}
                                    selected={seconds}
                                    onSelect={s => update({ seconds: s })}
                                />
                            </>
                        )}
                        {hourCycle === 12 && (
                            <div className={styles.ampmColumn}>
                                <button
                                    type="button"
                                    className={`${styles.ampmBtn} ${!isPM ? styles.ampmBtnSelected : ''}`}
                                    onClick={() => setAmPm(false)}
                                >
                                    AM
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.ampmBtn} ${isPM ? styles.ampmBtnSelected : ''}`}
                                    onClick={() => setAmPm(true)}
                                >
                                    PM
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className={styles.footer}>
                        {clearable && value && (
                            <button type="button" className={styles.clearFooterBtn} onClick={() => { onChange?.(null); setIsOpen(false); }}>
                                Clear
                            </button>
                        )}
                        <button type="button" className={styles.nowBtn} onClick={setNow}>
                            Now
                        </button>
                    </div>
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
