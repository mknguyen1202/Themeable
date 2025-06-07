import React from 'react';
import { ButtonGroupProps } from "./type";

export class ButtonGroup extends React.Component<ButtonGroupProps> {
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
        let classList = `button-group`;

        if (!!this.props.intent && this.props.intent !== 'default') {
            classList += ` button-group-intent--${this.props.intent}`;
        }

        if (!!this.props.className) {
            classList += ` ${this.props.className}`;
        }

        return classList;
    }

    render() {
        return (
            <div className={this.getClasses()}>
                {this.props.children}
            </div>
        );
    }
}