import { spinnerTokens } from './Spinner.tokens';
import type { SpinnerProps } from './Spinner.types';
import styles from './Spinner.module.scss';

export function Spinner({
    size = 'medium',
    color = spinnerTokens.defaultColor,
    thickness = spinnerTokens.defaultThickness,
    speed = 'normal',
    label = 'Loading...',
}: SpinnerProps) {
    const sizeValue = typeof size === 'number'
        ? `${size}px`
        : spinnerTokens[`size${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof spinnerTokens];

    const style = {
        '--spinner-size': sizeValue,
        '--spinner-color': color,
        '--spinner-thickness': `${thickness}px`,
        '--spinner-speed': spinnerTokens[`speed${speed.charAt(0).toUpperCase() + speed.slice(1)}` as keyof typeof spinnerTokens],
    } as React.CSSProperties;

    return (
        <div className={styles.spinnerWrapper} style={style} role="status" aria-label={label}>
            <svg
                className={styles.spinner}
                viewBox="0 0 50 50"
            >
                <circle
                    className={styles.spinnerCircle}
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                />
            </svg>
            <span className={styles.visuallyHidden}>{label}</span>
        </div>
    );
}
