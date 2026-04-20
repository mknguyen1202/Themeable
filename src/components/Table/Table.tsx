import { useState, useMemo, useCallback, Fragment } from 'react';
import { tableTokens } from './Table.tokens';
import type { TableProps, Column, TableHeadProps, TableBodyProps, TableRowProps, TableCellProps } from './Table.types';
import styles from './Table.module.scss';

function getRowKey<T>(row: T, rowKey: TableProps<T>['rowKey'], index: number): string | number {
    if (!rowKey) return index;
    if (typeof rowKey === 'function') return rowKey(row);
    return (row as any)[rowKey as string] as string | number;
}

function getCellRawText<T>(row: T, column: Column<T>): string {
    if (!column.accessor) return '';
    const value = typeof column.accessor === 'function'
        ? column.accessor(row)
        : (row as any)[column.accessor as string];
    return String(value ?? '').toLowerCase();
}

export function Table<T = any>({
    columns: columnsProp,
    data,
    rowKey,
    variant = 'default',
    size = 'medium',
    hoverable = false,
    stickyHeader = false,
    sortable = false,
    onSort,
    selectable = false,
    onRowSelect,
    filterable = false,
    filterPlaceholder = 'Search…',
    showPagination = false,
    pageSize: pageSizeProp = 10,
    pageSizeOptions = [5, 10, 25, 50],
    showToolbar = false,
    toolbarActions,
    expandable = false,
    renderExpanded,
    getRowClassName,
    getRowStyle,
    footerRow,
    loading = false,
    emptyMessage = 'No data available',
    className = '',
}: TableProps<T>) {
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [filterText, setFilterText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(pageSizeProp);
    const [selectedKeys, setSelectedKeys] = useState<Set<string | number>>(new Set());
    const [expandedKeys, setExpandedKeys] = useState<Set<string | number>>(new Set());
    const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set());
    const [showColumnToggler, setShowColumnToggler] = useState(false);

    // Visible columns
    const columns = useMemo(
        () => columnsProp.filter(c => !hiddenColumns.has(c.key)),
        [columnsProp, hiddenColumns]
    );

    // --- Data pipeline: filter → sort → paginate ---
    const filteredData = useMemo(() => {
        if (!filterText.trim()) return data;
        const lower = filterText.toLowerCase();
        return data.filter(row =>
            columnsProp.some(col => getCellRawText(row, col).includes(lower))
        );
    }, [data, filterText, columnsProp]);

    const sortedData = useMemo(() => {
        if (!sortKey || !sortable) return filteredData;
        const col = columnsProp.find(c => c.key === sortKey);
        if (!col) return filteredData;
        return [...filteredData].sort((a, b) => {
            const cmp = getCellRawText(a, col).localeCompare(getCellRawText(b, col), undefined, { numeric: true });
            return sortDirection === 'asc' ? cmp : -cmp;
        });
    }, [filteredData, sortKey, sortDirection, sortable, columnsProp]);

    const totalRows = sortedData.length;
    const totalPages = showPagination ? Math.max(1, Math.ceil(totalRows / pageSize)) : 1;

    const pagedData = useMemo(
        () => showPagination ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize) : sortedData,
        [sortedData, showPagination, currentPage, pageSize]
    );

    const pageStart = totalRows === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const pageEnd = Math.min(currentPage * pageSize, totalRows);

    // --- Handlers ---
    const handleSort = useCallback((column: Column<T>) => {
        if (!sortable || !column.sortable) return;
        const newDir = sortKey === column.key && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortKey(column.key);
        setSortDirection(newDir);
        setCurrentPage(1);
        onSort?.(column.key, newDir);
    }, [sortable, sortKey, sortDirection, onSort]);

    const allPageSelected = pagedData.length > 0 &&
        pagedData.every((r, i) => selectedKeys.has(getRowKey(r, rowKey, (currentPage - 1) * pageSize + i)));
    const somePageSelected = !allPageSelected &&
        pagedData.some((r, i) => selectedKeys.has(getRowKey(r, rowKey, (currentPage - 1) * pageSize + i)));

    const toggleSelectAll = () => {
        const next = new Set(selectedKeys);
        if (allPageSelected) {
            pagedData.forEach((r, i) => next.delete(getRowKey(r, rowKey, (currentPage - 1) * pageSize + i)));
        } else {
            pagedData.forEach((r, i) => next.add(getRowKey(r, rowKey, (currentPage - 1) * pageSize + i)));
        }
        setSelectedKeys(next);
        onRowSelect?.(data.filter((r, i) => next.has(getRowKey(r, rowKey, i))));
    };

    const toggleSelectRow = (row: T, absIndex: number) => {
        const key = getRowKey(row, rowKey, absIndex);
        const next = new Set(selectedKeys);
        if (next.has(key)) next.delete(key); else next.add(key);
        setSelectedKeys(next);
        onRowSelect?.(data.filter((r, i) => next.has(getRowKey(r, rowKey, i))));
    };

    const toggleExpand = (key: string | number) => {
        const next = new Set(expandedKeys);
        if (next.has(key)) next.delete(key); else next.add(key);
        setExpandedKeys(next);
    };

    const toggleColumnVisibility = (key: string) => {
        const next = new Set(hiddenColumns);
        if (next.has(key)) next.delete(key); else next.add(key);
        setHiddenColumns(next);
    };

    const getCellValue = (row: T, column: Column<T>): React.ReactNode => {
        if (column.render) {
            const value = column.accessor
                ? typeof column.accessor === 'function' ? column.accessor(row) : (row as any)[column.accessor as string]
                : null;
            return column.render(value, row, data.indexOf(row));
        }
        if (column.accessor) {
            const value = typeof column.accessor === 'function'
                ? column.accessor(row)
                : (row as any)[column.accessor as string];
            return String(value ?? '');
        }
        return null;
    };

    const totalCols = columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0);
    const hasToolbar = showToolbar || filterable;

    // Page number list (collapse distant pages with ellipsis)
    const pageNumbers = useMemo(() => {
        const pages: number[] = [];
        for (let p = 1; p <= totalPages; p++) {
            if (p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2) pages.push(p);
        }
        return pages;
    }, [totalPages, currentPage]);

    const style = {
        '--table-bg': tableTokens.backgroundColor,
        '--table-border-color': tableTokens.borderColor,
        '--table-header-bg': tableTokens.headerBackgroundColor,
        '--table-header-text-color': tableTokens.headerTextColor,
        '--table-cell-text-color': tableTokens.cellTextColor,
        '--table-stripe-bg': tableTokens.stripeBackgroundColor,
        '--table-hover-bg': tableTokens.hoverBackgroundColor,
        '--table-selected-bg': tableTokens.selectedBackgroundColor,
        '--table-selected-text-color': tableTokens.selectedTextColor,
        '--table-padding': tableTokens[`padding${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof tableTokens],
        '--table-radius': tableTokens.borderRadius,
    } as React.CSSProperties;

    return (
        <div
            className={`${styles.tableWrapper} ${hasToolbar ? styles.hasToolbar : ''} ${showPagination ? styles.hasPagination : ''} ${className}`}
            style={style}
        >
            {/* ── Toolbar ── */}
            {hasToolbar && (
                <div className={styles.toolbar}>
                    <div className={styles.toolbarLeft}>
                        {filterable && (
                            <div className={styles.searchBox}>
                                <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                                </svg>
                                <input
                                    className={styles.searchInput}
                                    type="text"
                                    placeholder={filterPlaceholder}
                                    value={filterText}
                                    onChange={e => { setFilterText(e.target.value); setCurrentPage(1); }}
                                    aria-label="Search table"
                                />
                                {filterText && (
                                    <button className={styles.searchClear} onClick={() => { setFilterText(''); setCurrentPage(1); }} aria-label="Clear search">
                                        ×
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                    <div className={styles.toolbarRight}>
                        {toolbarActions}
                        <div className={styles.columnTogglerWrap}>
                            <button
                                className={styles.columnTogglerBtn}
                                onClick={() => setShowColumnToggler(v => !v)}
                                aria-label="Manage visible columns"
                                title="Columns"
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="7" height="18" rx="1" /><rect x="14" y="3" width="7" height="18" rx="1" />
                                </svg>
                            </button>
                            {showColumnToggler && (
                                <div className={styles.columnTogglerDropdown}>
                                    <div className={styles.columnTogglerTitle}>Columns</div>
                                    {columnsProp.map(col => (
                                        <label key={col.key} className={styles.columnTogglerItem}>
                                            <input
                                                type="checkbox"
                                                checked={!hiddenColumns.has(col.key)}
                                                onChange={() => toggleColumnVisibility(col.key)}
                                            />
                                            <span>{typeof col.header === 'string' ? col.header : col.key}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ── Scroll container ── */}
            <div className={styles.tableContainer}>
                <table className={`${styles.table} ${styles[variant]} ${styles[size]} ${hoverable ? styles.hoverable : ''} ${stickyHeader ? styles.stickyHeader : ''}`}>
                    <thead className={styles.tableHead}>
                        <tr>
                            {expandable && <th className={`${styles.tableHeaderCell} ${styles.controlCell}`} aria-label="Expand" />}
                            {selectable && (
                                <th className={`${styles.tableHeaderCell} ${styles.checkboxCell}`}>
                                    <input
                                        type="checkbox"
                                        checked={allPageSelected}
                                        ref={el => { if (el) el.indeterminate = somePageSelected; }}
                                        onChange={toggleSelectAll}
                                        aria-label="Select all on this page"
                                    />
                                </th>
                            )}
                            {columns.map(column => (
                                <th
                                    key={column.key}
                                    className={`${styles.tableHeaderCell} ${column.sortable && sortable ? styles.sortable : ''} ${sortKey === column.key ? styles.sorted : ''}`}
                                    style={{ width: column.width, textAlign: column.align || 'left' }}
                                    onClick={() => handleSort(column)}
                                >
                                    <div className={styles.headerContent}>
                                        {column.header}
                                        {column.sortable && sortable && (
                                            <span className={styles.sortIndicator}>
                                                {sortKey === column.key ? (sortDirection === 'asc' ? '▲' : '▼') : '⇅'}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className={styles.tableBody}>
                        {loading ? (
                            Array.from({ length: Math.min(pageSize, 6) }).map((_, i) => (
                                <tr key={i} className={styles.tableRow}>
                                    {Array.from({ length: totalCols || columnsProp.length }).map((_, j) => (
                                        <td key={j} className={styles.tableCell}>
                                            <div className={styles.skeleton} style={{ width: `${50 + ((i * 3 + j * 7) % 5) * 10}%` }} />
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : pagedData.length === 0 ? (
                            <tr>
                                <td colSpan={totalCols || columnsProp.length} className={styles.emptyCell}>
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            pagedData.map((row, rowIndex) => {
                                const absIndex = (currentPage - 1) * pageSize + rowIndex;
                                const key = getRowKey(row, rowKey, absIndex);
                                const isSelected = selectedKeys.has(key);
                                const isExpanded = expandedKeys.has(key);
                                return (
                                    <Fragment key={key}>
                                        <tr
                                            className={`${styles.tableRow} ${isSelected ? styles.selected : ''} ${getRowClassName?.(row, rowIndex) ?? ''}`}
                                            style={getRowStyle?.(row, rowIndex)}
                                        >
                                            {expandable && (
                                                <td className={`${styles.tableCell} ${styles.controlCell}`}>
                                                    <button
                                                        className={`${styles.expandBtn} ${isExpanded ? styles.expandBtnOpen : ''}`}
                                                        onClick={() => toggleExpand(key)}
                                                        aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
                                                    >▶</button>
                                                </td>
                                            )}
                                            {selectable && (
                                                <td className={`${styles.tableCell} ${styles.checkboxCell}`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => toggleSelectRow(row, absIndex)}
                                                        aria-label="Select row"
                                                    />
                                                </td>
                                            )}
                                            {columns.map(column => (
                                                <td
                                                    key={column.key}
                                                    className={styles.tableCell}
                                                    style={{ width: column.width, textAlign: column.align || 'left' }}
                                                >
                                                    {getCellValue(row, column)}
                                                </td>
                                            ))}
                                        </tr>
                                        {expandable && isExpanded && renderExpanded && (
                                            <tr className={styles.expandedRow}>
                                                <td colSpan={totalCols} className={styles.expandedCell}>
                                                    {renderExpanded(row)}
                                                </td>
                                            </tr>
                                        )}
                                    </Fragment>
                                );
                            })
                        )}
                    </tbody>

                    {footerRow && (
                        <tfoot className={styles.tableFoot}>
                            <tr>{footerRow}</tr>
                        </tfoot>
                    )}
                </table>
            </div>

            {/* ── Pagination bar ── */}
            {showPagination && (
                <div className={styles.paginationBar}>
                    <span className={styles.paginationSummary}>
                        {totalRows === 0
                            ? 'No entries'
                            : `Showing ${pageStart}–${pageEnd} of ${totalRows} ${totalRows === 1 ? 'entry' : 'entries'}`}
                    </span>
                    <div className={styles.paginationControls}>
                        <select
                            className={styles.pageSizeSelect}
                            value={pageSize}
                            onChange={e => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                            aria-label="Rows per page"
                        >
                            {pageSizeOptions.map(n => <option key={n} value={n}>{n} / page</option>)}
                        </select>
                        <button className={styles.pageBtn} onClick={() => setCurrentPage(1)} disabled={currentPage === 1} aria-label="First page">«</button>
                        <button className={styles.pageBtn} onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} aria-label="Previous page">‹</button>
                        {pageNumbers.map((p, i, arr) => (
                            <Fragment key={p}>
                                {i > 0 && arr[i - 1] !== p - 1 && <span className={styles.pageEllipsis}>…</span>}
                                <button
                                    className={`${styles.pageBtn} ${p === currentPage ? styles.pageBtnActive : ''}`}
                                    onClick={() => setCurrentPage(p)}
                                >{p}</button>
                            </Fragment>
                        ))}
                        <button className={styles.pageBtn} onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages} aria-label="Next page">›</button>
                        <button className={styles.pageBtn} onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} aria-label="Last page">»</button>
                    </div>
                </div>
            )}
        </div>
    );
}

// ── Sub-components for manual composition ──────────────────────────────────

export function TableHead({ children, className = '' }: TableHeadProps) {
    return <thead className={`${styles.tableHead} ${className}`}>{children}</thead>;
}

export function TableBody({ children, className = '' }: TableBodyProps) {
    return <tbody className={`${styles.tableBody} ${className}`}>{children}</tbody>;
}

export function TableRow({ children, onClick, selected = false, className = '' }: TableRowProps) {
    return (
        <tr
            className={`${styles.tableRow} ${onClick ? styles.clickable : ''} ${selected ? styles.selected : ''} ${className}`}
            onClick={onClick}
        >
            {children}
        </tr>
    );
}

export function TableCell({ children, header = false, align = 'left', width, colSpan, style, className = '' }: TableCellProps) {
    const Tag = header ? 'th' : 'td';
    const cellClass = header ? styles.tableHeaderCell : styles.tableCell;
    return (
        <Tag className={`${cellClass} ${className}`} style={{ width, textAlign: align, ...style }} colSpan={colSpan}>
            {children}
        </Tag>
    );
}

Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
