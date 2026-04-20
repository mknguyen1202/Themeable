import React from 'react';
import type { ContainerProps, ContainerSize } from './Container.types';

const MAX_WIDTHS: Record<ContainerSize, string> = {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
};

const NAMED_SIZES = new Set<string>(['xs', 'sm', 'md', 'lg', 'xl', '2xl']);

function resolveMaxWidth(maxWidth: ContainerProps['maxWidth']): string {
    if (maxWidth == null) return MAX_WIDTHS.lg;
    if (typeof maxWidth === 'number') return `${maxWidth}px`;
    if (NAMED_SIZES.has(maxWidth as string)) return MAX_WIDTHS[maxWidth as ContainerSize];
    return maxWidth as string;
}

function resolvePadding(padding: ContainerProps['padding']): string | undefined {
    if (padding === false || padding == null) return undefined;
    if (padding === true) return '0 var(--spacing-md)';
    return `0 ${padding}`;
}

export function Container({
    children,
    maxWidth = 'lg',
    padding = true,
    center = true,
    as: Tag = 'div',
    className,
    style,
}: ContainerProps) {
    const containerStyle: React.CSSProperties = {
        width: '100%',
        maxWidth: resolveMaxWidth(maxWidth),
        padding: resolvePadding(padding),
        marginInline: center ? 'auto' : undefined,
        boxSizing: 'border-box',
        ...style,
    };

    return (
        <Tag className={className} style={containerStyle}>
            {children}
        </Tag>
    );
}
