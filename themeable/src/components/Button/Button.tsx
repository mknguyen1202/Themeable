import React, { Component, ReactNode, ButtonHTMLAttributes } from 'react';
import { Size, Intent, Placement } from '../common/types';



export class Button extends React.Component<ButtonProps> {

    isDisabled(): boolean {
        if (!!this.props.state && this.props.state === ButtonStateOption.LOADING) {
            return true;
        }

        if (!!this.props.state && this.props.state === ButtonStateOption.DISABLED) {
            return true;
        }

        return false;
    }


    getClasses(): string {
        let classList = `button`;

        //TODO: implement logic to add classes based on props

        return classList;
    }

    getChildren(): ReactNode {
        let children;

       //TODO: implement logic to render children
       // Children can be a string, a ReactNode or an array of ReactNode

        return children;
    }

    render() {

        //TODO: implement logic to render button with props 
        return <button>{this.getChildren()}</button>;
    }
}



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
    icon?: Icon ;

    className?: string;
    children?: ReactNode;
};
type ButtonProps = CustomButtonProps & NativeButtonProps;

