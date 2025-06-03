import { Size, Intent, Placement } from '../common/types';
import React, { Component, ReactNode, ButtonHTMLAttributes } from 'react';

/**-----------------------------------------------------------------------------------------------------
 *                      Constants and Types
 * -----------------------------------------------------------------------------------------------------
 */

export enum ButtonStateOption {
    DEFAULT = 'default',
    HOVER = 'hover',
    PRESSED = 'pressed',
    LOADING = 'loading',
    ACTIVE = 'active',
    FOCUS = 'focus',
    DISABLED = 'disabled',
}


export type State = ButtonStateOption.DEFAULT | ButtonStateOption.HOVER | ButtonStateOption.PRESSED | ButtonStateOption.LOADING | ButtonStateOption.ACTIVE | ButtonStateOption.FOCUS | ButtonStateOption.DISABLED;
export type Icon = 'none' | Placement;


export type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
export type CustomButtonProps = {
    state?: State;
    size?: Size;
    intent?: Intent;
    icon?: Icon;

    className?: string;
    children?: ReactNode;
};
export type ButtonProps = CustomButtonProps & NativeButtonProps;

