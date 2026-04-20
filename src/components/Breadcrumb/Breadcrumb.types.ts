export interface BreadcrumbItem {
    label: React.ReactNode;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
}

export interface BreadcrumbProps {
    items: BreadcrumbItem[];
    separator?: React.ReactNode;
    maxItems?: number;
    showRoot?: boolean;
}
