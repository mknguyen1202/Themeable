import React, { Component, ReactNode, ButtonHTMLAttributes } from 'react';
import { ButtonStateOption, ButtonProps } from './types';
import './_button.scss';


export class Button extends React.Component<ButtonProps> {

    // isDisabled(): boolean {
    //     if (!!this.props.state && this.props.state === ButtonStateOption.LOADING) {
    //         return true;
    //     }

    //     if (!!this.props.state && this.props.state === ButtonStateOption.DISABLED) {
    //         return true;
    //     }

    //     return false;
    // }


    // getClasses(): string {
    //     let classList = `button`;

    //     //TODO: implement logic to add classes based on props
    //     let propsMap = {
    //         'regular': ` button-size--${this.props.size}`,
    //         'default': ` button-intent--${this.props.intent}`,
    //         'none': ` button-icon--none`
    //     };


    //     return classList;
    // }

    // getChildren = (): ReactNode => {
    //     let children = this.props.children;

    //     //TODO: implement logic to render children
    //     // Children can be a string, a ReactNode or an array of ReactNode

    //     return children;
    // }

    // render() {

    //     //TODO: implement logic to render button with props 
    //     return <button>{this.getChildren()}</button>;
    // }

    //--------------------------------------------------------------------------------------

    getDisabled(): boolean {
        // if (!!this.props.loading) {
        //     return true;
        // }

        // if (!!this.props.disabled) {
        //     return true;
        // }

        return false;
    }

    getClasses(): string {
        let classList = `button`;

        // if (!!this.props.size && this.props.size !== 'regular') {
        //     classList += ` button-size--${this.props.size}`;
        // }

        if (!!this.props.intent && this.props.intent !== 'primary') {
            classList += ` button-intent--${this.props.intent}`;
        }

        // if (!!this.props.minimal) {
        //     classList += ` button--minimal`;
        // }

        if (!!this.props.className) {
            classList += ` ${this.props.className}`;
        }

        return classList;
    }

    getChildren(): ReactNode {
        let children = (
            <>
                {/* {this.props.leftIcon ? (
                    <span className="button-icon--left">{this.props.leftIcon}</span>
                ) : null}
                {this.props.children}
                {this.props.rightIcon ? (
                    <span className="button-icon--right">{this.props.rightIcon}</span>
                ) : null} */}
            </>
        );

        // if (!!this.props.loading) {
        //     return (
        //         <>
        //             <span className="spinner--overlay">
        //                 <Spinner
        //                     intent={this.props.intent || 'default'}
        //                     size={this.props.size}
        //                 />
        //             </span>
        //             <span className="visibility--hidden">{children}</span>
        //         </>
        //     );
        // }

        return <>{this.props.children}</>;
    }












    render() {
        const {
            // loading,
            // minimal,
            disabled,
            size,
            intent,
            // leftIcon,
            // rightIcon,
            className,
            children,
            ...rest
        } = this.props;

        const targetProps = {
            className: this.getClasses(),
            disabled: this.getDisabled(),
            ...rest,
        };

        return <button {...targetProps}>{this.getChildren()}</button>;
    }
}



