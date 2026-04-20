import React from 'react';

export type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ContainerProps {
    children?: React.ReactNode;
    /**
     * Max width of the container.
     * Named sizes: xs=480, sm=640, md=768, lg=1024, xl=1280, 2xl=1536 (px)
     * Or pass any CSS width string / number of px.
     * Default: 'lg'
     */
    maxWidth?: ContainerSize | number | string;
    /**
     * Horizontal padding. true → var(--spacing-md) on each side.
     * Pass a CSS value string to use a custom amount.
     * Default: true
     */
    padding?: boolean | string;
    /** Center the container with auto margins. Default: true */
    center?: boolean;
    /** Root element tag. Default: 'div' */
    as?: React.ElementType;
    className?: string;
    style?: React.CSSProperties;
}
