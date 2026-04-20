import { useState } from 'react';
import { accordionTokens } from './Accordion.tokens';
import type { AccordionProps } from './Accordion.types';
import styles from './Accordion.module.scss';

export function Accordion({
    items,
    defaultOpenIds = [],
    openIds: controlledOpenIds,
    onOpenChange,
    allowMultiple = false,
    allowToggle = true,
}: AccordionProps) {
    const [internalOpenIds, setInternalOpenIds] = useState<string[]>(defaultOpenIds);
    const openIds = controlledOpenIds !== undefined ? controlledOpenIds : internalOpenIds;

    const handleToggle = (id: string, disabled?: boolean) => {
        if (disabled) return;

        let newOpenIds: string[];

        if (openIds.includes(id)) {
            // Close item
            if (allowToggle) {
                newOpenIds = openIds.filter(openId => openId !== id);
            } else {
                return;
            }
        } else {
            // Open item
            if (allowMultiple) {
                newOpenIds = [...openIds, id];
            } else {
                newOpenIds = [id];
            }
        }

        if (onOpenChange) {
            onOpenChange(newOpenIds);
        } else {
            setInternalOpenIds(newOpenIds);
        }
    };

    const style = {
        '--accordion-border-color': accordionTokens.borderColor,
        '--accordion-bg': accordionTokens.backgroundColor,
        '--accordion-hover-bg': accordionTokens.hoverBackgroundColor,
        '--accordion-title-color': accordionTokens.titleColor,
        '--accordion-content-color': accordionTokens.contentColor,
        '--accordion-icon-color': accordionTokens.iconColor,
        '--accordion-radius': accordionTokens.borderRadius,
    } as React.CSSProperties;

    return (
        <div className={styles.accordion} style={style}>
            {items.map((item) => {
                const isOpen = openIds.includes(item.id);

                return (
                    <div
                        key={item.id}
                        className={`${styles.accordionItem} ${isOpen ? styles.open : ''} ${item.disabled ? styles.disabled : ''}`}
                    >
                        <button
                            className={styles.accordionHeader}
                            onClick={() => handleToggle(item.id, item.disabled)}
                            disabled={item.disabled}
                            aria-expanded={isOpen}
                            aria-disabled={item.disabled}
                        >
                            {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
                            <span className={styles.accordionTitle}>{item.title}</span>
                            <span className={`${styles.chevron} ${isOpen ? styles.open : ''}`}>
                                ▼
                            </span>
                        </button>
                        <div className={`${styles.accordionContent} ${isOpen ? styles.open : ''}`}>
                            <div className={styles.accordionContentInner}>
                                {item.content}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
