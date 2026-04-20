export interface MenuItem {
    id: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
    disabled?: boolean;
    divider?: boolean;
    danger?: boolean;
    shortcut?: string;
    onClick?: () => void;
    submenu?: MenuItem[];
}

export interface MenuProps {
    items: MenuItem[];
    onItemClick?: (item: MenuItem) => void;
    className?: string;
}

export interface MenuTriggerProps {
    children: React.ReactNode;
    menu: React.ReactNode;
    position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
    closeOnClick?: boolean;
}
