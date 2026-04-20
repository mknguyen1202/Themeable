import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { menuTokens } from './Menu.tokens';
import type { MenuProps, MenuItem, MenuTriggerProps } from './Menu.types';
import styles from './Menu.module.scss';

export function Menu({ items, onItemClick, className = '' }: MenuProps) {
    const style = {
        '--menu-bg': menuTokens.backgroundColor,
        '--menu-border-color': menuTokens.borderColor,
        '--menu-radius': menuTokens.borderRadius,
        '--menu-item-text-color': menuTokens.itemTextColor,
        '--menu-item-hover-bg': menuTokens.itemHoverBackgroundColor,
        '--menu-danger-color': menuTokens.dangerColor,
        '--menu-disabled-color': menuTokens.disabledColor,
        '--menu-divider-color': menuTokens.dividerColor,
        '--menu-shortcut-color': menuTokens.shortcutColor,
        '--menu-shadow': menuTokens.shadow,
    } as React.CSSProperties;

    const handleItemClick = (item: MenuItem) => {
        if (item.disabled || item.divider) return;

        if (item.onClick) {
            item.onClick();
        }

        if (onItemClick) {
            onItemClick(item);
        }
    };

    return (
        <div className={`${styles.menu} ${className}`} style={style} role="menu">
            {items.map((item) => {
                if (item.divider) {
                    return <div key={item.id} className={styles.menuDivider} role="separator" />;
                }

                return (
                    <button
                        key={item.id}
                        className={`${styles.menuItem} ${item.disabled ? styles.disabled : ''} ${item.danger ? styles.danger : ''}`}
                        onClick={() => handleItemClick(item)}
                        disabled={item.disabled}
                        role="menuitem"
                    >
                        {item.icon && <span className={styles.menuIcon}>{item.icon}</span>}
                        <span className={styles.menuLabel}>{item.label}</span>
                        {item.shortcut && <span className={styles.menuShortcut}>{item.shortcut}</span>}
                        {item.submenu && <span className={styles.submenuIndicator}>›</span>}
                    </button>
                );
            })}
        </div>
    );
}

export function MenuTrigger({
    children,
    menu,
    position = 'bottom-left',
    closeOnClick = true,
}: MenuTriggerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
    const triggerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen || !triggerRef.current || !menuRef.current) return;

        const updatePosition = () => {
            if (!triggerRef.current || !menuRef.current) return;

            const triggerRect = triggerRef.current.getBoundingClientRect();
            const menuRect = menuRef.current.getBoundingClientRect();
            let top = 0;
            let left = 0;

            switch (position) {
                case 'bottom-left':
                    top = triggerRect.bottom + 4;
                    left = triggerRect.left;
                    break;
                case 'bottom-right':
                    top = triggerRect.bottom + 4;
                    left = triggerRect.right - menuRect.width;
                    break;
                case 'top-left':
                    top = triggerRect.top - menuRect.height - 4;
                    left = triggerRect.left;
                    break;
                case 'top-right':
                    top = triggerRect.top - menuRect.height - 4;
                    left = triggerRect.right - menuRect.width;
                    break;
            }

            setMenuStyle({
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
    }, [isOpen, position]);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (
                menuRef.current &&
                triggerRef.current &&
                !menuRef.current.contains(e.target as Node) &&
                !triggerRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        const handleMenuClick = () => {
            if (closeOnClick) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        if (menuRef.current) {
            menuRef.current.addEventListener('click', handleMenuClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            if (menuRef.current) {
                menuRef.current.removeEventListener('click', handleMenuClick);
            }
        };
    }, [isOpen, closeOnClick]);

    return (
        <>
            <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)} className={styles.menuTrigger}>
                {children}
            </div>
            {isOpen &&
                createPortal(
                    <div ref={menuRef} className={styles.menuPortal} style={menuStyle}>
                        {menu}
                    </div>,
                    document.querySelector('[data-theme-id]') ?? document.body
                )}
        </>
    );
}

// Named exports
Menu.Trigger = MenuTrigger;
