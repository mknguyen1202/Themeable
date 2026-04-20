import { breadcrumbTokens } from './Breadcrumb.tokens';
import type { BreadcrumbProps } from './Breadcrumb.types';
import styles from './Breadcrumb.module.scss';

export function Breadcrumb({
    items,
    separator = '/',
    maxItems,
    showRoot = true,
}: BreadcrumbProps) {
    let displayItems = [...items];

    // Handle maxItems with ellipsis
    if (maxItems && items.length > maxItems) {
        const firstItem = items[0];
        const lastItems = items.slice(-(maxItems - 1));
        displayItems = [firstItem, { label: '...' }, ...lastItems];
    }

    // Hide root if specified
    if (!showRoot && displayItems.length > 1) {
        displayItems = displayItems.slice(1);
    }

    const style = {
        '--breadcrumb-text-color': breadcrumbTokens.textColor,
        '--breadcrumb-active-text-color': breadcrumbTokens.activeTextColor,
        '--breadcrumb-link-color': breadcrumbTokens.linkColor,
        '--breadcrumb-separator-color': breadcrumbTokens.separatorColor,
        '--breadcrumb-font-size': breadcrumbTokens.fontSize,
    } as React.CSSProperties;

    return (
        <nav className={styles.breadcrumb} style={style} aria-label="Breadcrumb">
            <ol className={styles.breadcrumbList}>
                {displayItems.map((item, index) => {
                    const isLast = index === displayItems.length - 1;
                    const isEllipsis = item.label === '...';

                    return (
                        <li key={index} className={styles.breadcrumbItem}>
                            {!isLast && item.href ? (
                                <a href={item.href} className={styles.breadcrumbLink}>
                                    {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
                                    {item.label}
                                </a>
                            ) : !isLast && item.onClick ? (
                                <button onClick={item.onClick} className={styles.breadcrumbButton}>
                                    {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
                                    {item.label}
                                </button>
                            ) : (
                                <span className={`${styles.breadcrumbText} ${isLast ? styles.active : ''}`}>
                                    {item.icon && !isEllipsis && <span className={styles.itemIcon}>{item.icon}</span>}
                                    {item.label}
                                </span>
                            )}
                            {!isLast && <span className={styles.separator}>{separator}</span>}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
