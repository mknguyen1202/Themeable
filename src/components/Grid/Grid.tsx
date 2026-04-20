import React from 'react';
import { resolveGap } from '../Stack/Stack';
import type { GridProps, GridItemProps } from './Grid.types';

function GridItem({
    children,
    colSpan,
    rowSpan,
    align,
    justify,
    as: Tag = 'div',
    className,
    style,
}: GridItemProps) {
    const itemStyle: React.CSSProperties = {
        gridColumn: colSpan ? `span ${colSpan}` : undefined,
        gridRow: rowSpan ? `span ${rowSpan}` : undefined,
        alignSelf: align,
        justifySelf: justify,
        ...style,
    };
    return (
        <Tag className={className} style={itemStyle}>
            {children}
        </Tag>
    );
}

function Grid({
    children,
    columns = 1,
    gap = 'md',
    rowGap,
    columnGap,
    align,
    justify,
    as: Tag = 'div',
    className,
    style,
}: GridProps) {
    const templateColumns =
        typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns;

    const gridStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: templateColumns,
        gap: rowGap == null && columnGap == null ? resolveGap(gap ?? 'md') : undefined,
        rowGap: rowGap != null ? resolveGap(rowGap) : undefined,
        columnGap: columnGap != null ? resolveGap(columnGap) : undefined,
        alignItems: align,
        justifyItems: justify,
        ...style,
    };

    return (
        <Tag className={className} style={gridStyle}>
            {children}
        </Tag>
    );
}

Grid.Item = GridItem;

export { Grid };
