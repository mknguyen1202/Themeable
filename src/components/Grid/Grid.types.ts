import React from 'react';
import type { GapValue } from '../Stack/Stack.types';

export interface GridProps {
    children?: React.ReactNode;
    /**
     * Number of equal columns, or a full CSS grid-template-columns value.
     * e.g. 3  →  "repeat(3, 1fr)"
     *      "repeat(auto-fill, minmax(200px, 1fr))"
     */
    columns?: number | string;
    /** Gap between all cells. Default: 'md' */
    gap?: GapValue;
    /** Override row gap independently */
    rowGap?: GapValue;
    /** Override column gap independently */
    columnGap?: GapValue;
    /** CSS align-items for all cells */
    align?: React.CSSProperties['alignItems'];
    /** CSS justify-items for all cells */
    justify?: React.CSSProperties['justifyItems'];
    /** Root element tag. Default: 'div' */
    as?: React.ElementType;
    className?: string;
    style?: React.CSSProperties;
}

export interface GridItemProps {
    children?: React.ReactNode;
    /** Number of columns to span */
    colSpan?: number;
    /** Number of rows to span */
    rowSpan?: number;
    /** CSS align-self override */
    align?: React.CSSProperties['alignSelf'];
    /** CSS justify-self override */
    justify?: React.CSSProperties['justifySelf'];
    as?: React.ElementType;
    className?: string;
    style?: React.CSSProperties;
}
