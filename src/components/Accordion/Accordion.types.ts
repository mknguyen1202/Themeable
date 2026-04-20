export interface AccordionItem {
    id: string;
    title: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
    icon?: React.ReactNode;
}

export interface AccordionProps {
    items: AccordionItem[];
    defaultOpenIds?: string[];
    openIds?: string[];
    onOpenChange?: (ids: string[]) => void;
    allowMultiple?: boolean;
    allowToggle?: boolean;
}
