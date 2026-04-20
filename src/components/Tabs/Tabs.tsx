import { useState } from 'react';
import { tabsTokens } from './Tabs.tokens';
import type { TabsProps } from './Tabs.types';
import styles from './Tabs.module.scss';

export function Tabs({
    tabs,
    defaultActiveId,
    activeId: controlledActiveId,
    onTabChange,
    variant = 'line',
    orientation = 'horizontal',
    fullWidth = false,
}: TabsProps) {
    const [internalActiveId, setInternalActiveId] = useState(defaultActiveId || tabs[0]?.id);
    const activeId = controlledActiveId !== undefined ? controlledActiveId : internalActiveId;

    const handleTabClick = (id: string, disabled?: boolean) => {
        if (disabled) return;

        if (onTabChange) {
            onTabChange(id);
        } else {
            setInternalActiveId(id);
        }
    };

    const activeTab = tabs.find(tab => tab.id === activeId);

    const style = {
        '--tabs-border-color': tabsTokens.borderColor,
        '--tabs-active-color': tabsTokens.activeColor,
        '--tabs-text-color': tabsTokens.textColor,
        '--tabs-active-text-color': tabsTokens.activeTextColor,
        '--tabs-bg': tabsTokens.backgroundColor,
        '--tabs-hover-bg': tabsTokens.hoverBackgroundColor,
        '--tabs-radius': tabsTokens.borderRadius,
    } as React.CSSProperties;

    return (
        <div className={`${styles.tabsContainer} ${styles[orientation]}`} style={style}>
            <div className={`${styles.tabList} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''}`}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`${styles.tabButton} ${activeId === tab.id ? styles.active : ''} ${tab.disabled ? styles.disabled : ''}`}
                        onClick={() => handleTabClick(tab.id, tab.disabled)}
                        disabled={tab.disabled}
                        role="tab"
                        aria-selected={activeId === tab.id}
                        aria-disabled={tab.disabled}
                    >
                        {tab.icon && <span className={styles.tabIcon}>{tab.icon}</span>}
                        <span className={styles.tabLabel}>{tab.label}</span>
                    </button>
                ))}
            </div>
            <div className={styles.tabContent}>
                {activeTab?.content}
            </div>
        </div>
    );
}
