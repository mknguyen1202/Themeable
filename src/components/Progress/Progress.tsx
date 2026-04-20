import React from 'react';
import { progressTokens } from './Progress.tokens';
import type { ProgressProps, ProgressColor } from './Progress.types';
import styles from './Progress.module.scss';

const CIRCLE_RADIUS = 20; // viewBox is 50×50, radius chosen to leave stroke room
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

function resolveColor(color: ProgressColor): string {
    switch (color) {
        case 'primary': return progressTokens.colorPrimary;
        case 'success': return progressTokens.colorSuccess;
        case 'warning': return progressTokens.colorWarning;
        case 'danger': return progressTokens.colorDanger;
        default: return color;
    }
}

export function Progress({
    value = 0,
    indeterminate = false,
    variant = 'bar',
    color = 'primary',
    size = 'md',
    striped = false,
    animated = false,
    showValue = false,
    label,
    className = '',
}: ProgressProps) {
    const clampedValue = Math.min(100, Math.max(0, value));
    const resolvedColor = resolveColor(color);

    const height = progressTokens[`height${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof progressTokens];
    const circleSize = progressTokens[`circle${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof progressTokens];
    const stroke = progressTokens[`stroke${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof progressTokens];
    const fontSize = progressTokens[`fontSize${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof progressTokens];

    const dashOffset = CIRCUMFERENCE - (clampedValue / 100) * CIRCUMFERENCE;

    if (variant === 'circle') {
        const cssVars = {
            '--progress-color': resolvedColor,
            '--progress-track-color': progressTokens.trackColor,
            '--progress-circle-size': circleSize,
            '--progress-stroke-width': stroke,
            '--progress-circumference': `${CIRCUMFERENCE}`,
            '--progress-dash-offset': `${dashOffset}`,
            '--progress-font-size': fontSize,
        } as React.CSSProperties;

        const classNames = [
            styles.circle,
            indeterminate ? styles.indeterminate : '',
            className,
        ].filter(Boolean).join(' ');

        return (
            <div
                className={classNames}
                style={cssVars}
                role="progressbar"
                aria-valuenow={indeterminate ? undefined : clampedValue}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={label}
            >
                <div className={styles.circleInner}>
                    <svg className={styles.circleSvg} viewBox="0 0 50 50" aria-hidden="true">
                        <circle
                            className={styles.circleTrack}
                            cx="25" cy="25" r={CIRCLE_RADIUS}
                        />
                        <circle
                            className={styles.circleFill}
                            cx="25" cy="25" r={CIRCLE_RADIUS}
                        />
                    </svg>
                    {showValue && !indeterminate && (
                        <span className={styles.circleValueText}>{clampedValue}%</span>
                    )}
                </div>
                {label && <span className={styles.circleLabelText}>{label}</span>}
            </div>
        );
    }

    // Bar variant
    const cssVars = {
        '--progress-color': resolvedColor,
        '--progress-track-color': progressTokens.trackColor,
        '--progress-height': height,
        '--progress-value-pct': `${clampedValue}%`,
        '--progress-font-size': fontSize,
    } as React.CSSProperties;

    const classNames = [
        styles.bar,
        striped ? styles.striped : '',
        striped && animated ? styles.animated : '',
        indeterminate ? styles.indeterminate : '',
        className,
    ].filter(Boolean).join(' ');

    const hasLabel = !!label;
    const hasTopRow = hasLabel || (showValue && !indeterminate);

    return (
        <div
            className={classNames}
            style={cssVars}
            role="progressbar"
            aria-valuenow={indeterminate ? undefined : clampedValue}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={!hasLabel ? undefined : label}
        >
            {hasTopRow && (
                <div className={styles.barLabelRow}>
                    {hasLabel && <span className={styles.barLabelText}>{label}</span>}
                    {showValue && !indeterminate && (
                        <span className={styles.barValueText}>{clampedValue}%</span>
                    )}
                </div>
            )}
            <div className={styles.track}>
                <div className={styles.fill} />
            </div>
        </div>
    );
}
