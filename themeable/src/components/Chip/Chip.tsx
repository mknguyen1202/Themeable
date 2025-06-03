import { ChipProps } from "./types";
import React, { ReactNode } from 'react';
import './_chip.scss'; // Assuming you have a corresponding SCSS file for styles


export class Chip extends React.Component<ChipProps> {
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
        let classList = `chip`;

        // if (!!this.props.size && this.props.size !== 'regular') {
        //     classList += ` button-size--${this.props.size}`;
        // }

        if (!!this.props.intent && this.props.intent !== 'default') {
            classList += ` chip-intent--${this.props.intent}`;
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
        const targetProps = {
            className: this.getClasses(),
            disabled: this.getDisabled(),
            // ...rest,
        };

        const { texture, textureConfig, className, children, ...nativeProps } = this.props;

        // Apply texture styles if provided
        const textureStyles = texture ? { background: `url(${texture})`, ...textureConfig } : {};

        return (
            <span
                className={`chip ${className || ''}`}
                style={textureStyles}
                {...nativeProps}
            >
                {children}
            </span>
        );
    }
}