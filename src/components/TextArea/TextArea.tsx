import { forwardRef } from 'react';
import { textAreaTokens } from './TextArea.tokens';
import type { TextAreaProps } from './TextArea.types';
import styles from './TextArea.module.scss';

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
    label,
    error,
    helperText,
    variant = 'outlined',
    textAreaSize = 'medium',
    fullWidth = false,
    resize = 'vertical',
    className = '',
    ...props
}, ref) => {
    const style = {
        '--textarea-radius': textAreaTokens.borderRadius,
        '--textarea-border-width': textAreaTokens.borderWidth,
        '--textarea-border-color': error ? textAreaTokens.errorBorderColor : textAreaTokens.borderColor,
        '--textarea-bg': textAreaTokens.backgroundColor,
        '--textarea-text-color': textAreaTokens.textColor,
        '--textarea-placeholder-color': textAreaTokens.placeholderColor,
        '--textarea-focus-border-color': error ? textAreaTokens.errorBorderColor : textAreaTokens.focusBorderColor,
        '--textarea-padding': textAreaTokens[`padding${textAreaSize.charAt(0).toUpperCase() + textAreaSize.slice(1)}` as keyof typeof textAreaTokens],
        '--textarea-font-size': textAreaTokens[`fontSize${textAreaSize.charAt(0).toUpperCase() + textAreaSize.slice(1)}` as keyof typeof textAreaTokens],
        '--textarea-min-height': textAreaTokens.minHeight,
        '--textarea-resize': resize,
    } as React.CSSProperties;

    return (
        <div className={`${styles.textAreaWrapper} ${fullWidth ? styles.fullWidth : ''}`} style={style}>
            {label && <label className={styles.label}>{label}</label>}
            <textarea
                ref={ref}
                className={`${styles.textArea} ${styles[variant]} ${styles[textAreaSize]} ${error ? styles.error : ''} ${className}`}
                {...props}
            />
            {error && <span className={styles.errorText}>{error}</span>}
            {helperText && !error && <span className={styles.helperText}>{helperText}</span>}
        </div>
    );
});

TextArea.displayName = 'TextArea';
