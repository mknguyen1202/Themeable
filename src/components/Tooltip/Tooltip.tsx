import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { tooltipTokens } from './Tooltip.tokens';
import type { TooltipProps } from './Tooltip.types';
import styles from './Tooltip.module.scss';
import { useThemeContext } from '../../system/ThemeProvider/ThemeContext';
import { sizes as fontSizes } from '../../foundations/typography';

export function Tooltip({
    content,
    children,
    position = 'top',
    delay = 200,
    offset = 8,
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const { theme, family } = useThemeContext();

    const handleMouseEnter = () => {
        timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
        }, delay);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsVisible(false);
    };

    useEffect(() => {
        if (!isVisible || !triggerRef.current || !tooltipRef.current) return;

        const updatePosition = () => {
            if (!triggerRef.current || !tooltipRef.current) return;

            const triggerRect = triggerRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            let top = 0;
            let left = 0;

            const posDir = position.split('-')[0] as 'top' | 'bottom' | 'left' | 'right';
            const posAlign = position.includes('-') ? position.split('-')[1] : 'center';

            switch (posDir) {
                case 'top':
                    top = triggerRect.top - tooltipRect.height - offset;
                    if (posAlign === 'start') left = triggerRect.left;
                    else if (posAlign === 'end') left = triggerRect.right - tooltipRect.width;
                    else left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
                    break;
                case 'bottom':
                    top = triggerRect.bottom + offset;
                    if (posAlign === 'start') left = triggerRect.left;
                    else if (posAlign === 'end') left = triggerRect.right - tooltipRect.width;
                    else left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
                    break;
                case 'left':
                    left = triggerRect.left - tooltipRect.width - offset;
                    if (posAlign === 'start') top = triggerRect.top;
                    else if (posAlign === 'end') top = triggerRect.bottom - tooltipRect.height;
                    else top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
                    break;
                case 'right':
                    left = triggerRect.right + offset;
                    if (posAlign === 'start') top = triggerRect.top;
                    else if (posAlign === 'end') top = triggerRect.bottom - tooltipRect.height;
                    else top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
                    break;
            }

            setTooltipStyle({
                top: `${top}px`,
                left: `${left}px`,
            });
        };

        updatePosition();
        window.addEventListener('scroll', updatePosition);
        window.addEventListener('resize', updatePosition);

        return () => {
            window.removeEventListener('scroll', updatePosition);
            window.removeEventListener('resize', updatePosition);
        };
    }, [isVisible, position, offset]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const style = {
        '--tooltip-bg': theme.roles.text.primary,
        '--tooltip-text-color': theme.roles.surface.base,
        '--tooltip-radius': `${family.geometry.radius.sm}px`,
        '--tooltip-font-size': `${fontSizes.sm}px`,
        '--tooltip-max-width': tooltipTokens.maxWidth,
        '--tooltip-arrow-size': tooltipTokens.arrowSize,
    } as React.CSSProperties;

    const posDir = position.split('-')[0];
    const posAlign = position.includes('-') ? position.split('-')[1] : '';

    return (
        <>
            <div
                ref={triggerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={styles.trigger}
            >
                {children}
            </div>
            {isVisible &&
                createPortal(
                    <div
                        ref={tooltipRef}
                        className={[styles.tooltip, styles[posDir], posAlign ? styles[posAlign] : ''].filter(Boolean).join(' ')}
                        style={{ ...style, ...tooltipStyle }}
                    >
                        <div className={styles.tooltipContent}>{content}</div>
                        <div className={styles.arrow} />
                    </div>,
                    document.querySelector('[data-theme-id]') ?? document.body
                )}
        </>
    );
}
