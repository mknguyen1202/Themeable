import React from 'react';

export type SpacingToken = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type GapValue = SpacingToken | number | string;

export interface StackProps {
    children?: React.ReactNode;
    /** Main axis direction. Default: 'column' */
    direction?: 'row' | 'column';
    /** Gap between items. Named tokens map to --spacing-* CSS vars. Default: 'md' */
    gap?: GapValue;
    /** CSS align-items */
    align?: React.CSSProperties['alignItems'];
    /** CSS justify-content */
    justify?: React.CSSProperties['justifyContent'];
    /** Allow children to wrap. Default: false */
    wrap?: boolean;
    /** Insert a Divider between each child. Default: false */
    dividers?: boolean;
    /** Root element tag. Default: 'div' */
    as?: React.ElementType;
    className?: string;
    style?: React.CSSProperties;
}
