export interface TooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right'
    | 'top-start' | 'top-end'
    | 'bottom-start' | 'bottom-end'
    | 'left-start' | 'left-end'
    | 'right-start' | 'right-end';
    delay?: number;
    offset?: number;
}
