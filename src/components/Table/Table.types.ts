export interface Column<T = any> {
    key: string;
    header: React.ReactNode;
    accessor?: keyof T | ((row: T) => React.ReactNode);
    sortable?: boolean;
    width?: string | number;
    align?: 'left' | 'center' | 'right';
    render?: (value: any, row: T, index: number) => React.ReactNode;
}

export interface TableProps<T = any> {
    columns: Column<T>[];
    data: T[];
    /** Key field or function to produce a unique row identifier */
    rowKey?: keyof T | ((row: T) => string | number);
    variant?: 'default' | 'striped' | 'bordered';
    size?: 'small' | 'medium' | 'large';
    hoverable?: boolean;
    stickyHeader?: boolean;
    /** Enable built-in client-side sorting */
    sortable?: boolean;
    onSort?: (key: string, direction: 'asc' | 'desc') => void;
    /** Adds a checkbox column for multi-row selection */
    selectable?: boolean;
    onRowSelect?: (selectedRows: T[]) => void;
    /** Shows a search box in the toolbar for global filtering */
    filterable?: boolean;
    filterPlaceholder?: string;
    /** Built-in client-side pagination */
    showPagination?: boolean;
    pageSize?: number;
    pageSizeOptions?: number[];
    /** Show the toolbar (also enables the column-visibility toggler) */
    showToolbar?: boolean;
    /** Extra React nodes rendered in the right slot of the toolbar */
    toolbarActions?: React.ReactNode;
    /** Adds a per-row expand toggle revealing renderExpanded content */
    expandable?: boolean;
    renderExpanded?: (row: T) => React.ReactNode;
    /** Painter — return a className to apply to a row */
    getRowClassName?: (row: T, index: number) => string;
    /** Painter — return inline styles to apply to a row */
    getRowStyle?: (row: T, index: number) => React.CSSProperties | undefined;
    /** Content for <tfoot> — pass <td> / Table.Cell elements */
    footerRow?: React.ReactNode;
    loading?: boolean;
    emptyMessage?: React.ReactNode;
    className?: string;
}

export interface TableHeadProps {
    children: React.ReactNode;
    className?: string;
}

export interface TableBodyProps {
    children: React.ReactNode;
    className?: string;
}

export interface TableRowProps {
    children: React.ReactNode;
    onClick?: () => void;
    selected?: boolean;
    className?: string;
}

export interface TableCellProps {
    children?: React.ReactNode;
    header?: boolean;
    align?: 'left' | 'center' | 'right';
    width?: string | number;
    colSpan?: number;
    style?: React.CSSProperties;
    className?: string;
}
