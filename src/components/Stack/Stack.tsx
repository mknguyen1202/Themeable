import React, { Children } from 'react';
import type { StackProps, GapValue } from './Stack.types';
import { Divider } from '../Divider/Divider';

export function resolveGap(gap: GapValue): string {
    if (typeof gap === 'number') return `${gap}px`;
    if (gap === 'none') return '0';
    const tokens = ['xs', 'sm', 'md', 'lg', 'xl'];
    if (tokens.includes(gap as string)) return `var(--spacing-${gap})`;
    return gap as string;
}

export function Stack({
    children,
    direction = 'column',
    gap = 'md',
    align,
    justify,
    wrap = false,
    dividers = false,
    as: Tag = 'div',
    className,
    style,
}: StackProps) {
    const gapValue = resolveGap(gap);

    const baseStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap ? 'wrap' : undefined,
        ...style,
    };

    if (!dividers) {
        return (
            <Tag className={className} style={{ ...baseStyle, gap: gapValue }}>
                {children}
            </Tag>
        );
    }

    const childArray = Children.toArray(children).filter(Boolean);
    const withDividers: React.ReactNode[] = [];
    childArray.forEach((child, i) => {
        withDividers.push(child);
        if (i < childArray.length - 1) {
            withDividers.push(
                <Divider
                    key={`__stack-divider-${i}`}
                    orientation={direction === 'row' ? 'vertical' : 'horizontal'}
                    spacing={0}
                />
            );
        }
    });

    return (
        <Tag className={className} style={{ ...baseStyle, gap: gapValue }}>
            {withDividers}
        </Tag>
    );
}
