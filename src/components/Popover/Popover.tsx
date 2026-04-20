import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { popoverTokens } from './Popover.tokens';
import type { PopoverProps } from './Popover.types';
import styles from './Popover.module.scss';
import { useThemeContext } from '../../system/ThemeProvider/ThemeContext';

export function Popover({
    trigger,
    children,
    position = 'bottom',
    align = 'center',
    isOpen: controlledIsOpen,
    onOpenChange,
    closeOnClickOutside = true,
    offset = 8,
}: PopoverProps) {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
    const triggerRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({});

    const handleToggle = () => {
        const newState = !isOpen;
        if (onOpenChange) {
            onOpenChange(newState);
        } else {
            setInternalIsOpen(newState);
        }
    };

    useEffect(() => {
        if (!isOpen || !triggerRef.current || !popoverRef.current) return;

        const updatePosition = () => {
            if (!triggerRef.current || !popoverRef.current) return;

            const triggerRect = triggerRef.current.getBoundingClientRect();
            const popoverRect = popoverRef.current.getBoundingClientRect();
            let top = 0;
            let left = 0;

            // Calculate position
            switch (position) {
                case 'top':
                    top = triggerRect.top - popoverRect.height - offset;
                    break;
                case 'bottom':
                    top = triggerRect.bottom + offset;
                    break;
                case 'left':
                    left = triggerRect.left - popoverRect.width - offset;
                    break;
                case 'right':
                    left = triggerRect.right + offset;
                    break;
            }

            // Calculate alignment
            if (position === 'top' || position === 'bottom') {
                switch (align) {
                    case 'start':
                        left = triggerRect.left;
                        break;
                    case 'center':
                        left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
                        break;
                    case 'end':
                        left = triggerRect.right - popoverRect.width;
                        break;
                }
            } else {
                switch (align) {
                    case 'start':
                        top = triggerRect.top;
                        break;
                    case 'center':
                        top = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
                        break;
                    case 'end':
                        top = triggerRect.bottom - popoverRect.height;
                        break;
                }
            }

            setPopoverStyle({
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
    }, [isOpen, position, align, offset]);

    useEffect(() => {
        if (!isOpen || !closeOnClickOutside) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (
                popoverRef.current &&
                triggerRef.current &&
                !popoverRef.current.contains(e.target as Node) &&
                !triggerRef.current.contains(e.target as Node)
            ) {
                if (onOpenChange) {
                    onOpenChange(false);
                } else {
                    setInternalIsOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, closeOnClickOutside, onOpenChange]);

    const { theme, family } = useThemeContext();
    const borderColor = theme.mode === 'light' ? theme.palette.neutral[3] : theme.palette.neutral[7];

    const style = {
        '--popover-bg': family.surface.background({ level: 2, base: theme.roles.surface.base, raised: theme.roles.surface.raised, overlay: theme.roles.surface.overlay, mode: theme.mode }),
        '--popover-radius': `${family.geometry.radius.md}px`,
        '--popover-border-color': borderColor,
        '--popover-arrow-size': popoverTokens.arrowSize,
    } as React.CSSProperties;

    return (
        <>
            <div ref={triggerRef} onClick={handleToggle} className={styles.trigger}>
                {trigger}
            </div>
            {isOpen &&
                createPortal(
                    <div
                        ref={popoverRef}
                        className={`${styles.popover} ${styles[position]} ${styles[align]}`}
                        style={{ ...style, ...popoverStyle }}
                    >
                        <div className={styles.popoverContent}>{children}</div>
                        <div className={styles.arrow} />
                    </div>,
                    document.querySelector('[data-theme-id]') ?? document.body
                )}
        </>
    );
}
