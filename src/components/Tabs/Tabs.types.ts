export interface Tab {
    id: string;
    label: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
    icon?: React.ReactNode;
}

export interface TabsProps {
    tabs: Tab[];
    defaultActiveId?: string;
    activeId?: string;
    onTabChange?: (id: string) => void;
    variant?: 'line' | 'enclosed' | 'pills';
    orientation?: 'horizontal' | 'vertical';
    fullWidth?: boolean;
}
