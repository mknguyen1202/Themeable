

import React from 'react'
import { GradientProps } from './types';

export class GradientConfigurator extends React.Component<GradientProps> {
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
        let classList = `gradient-configurator`;

        if (!!this.props.type && this.props.type !== 'linear') {
            classList += ` gradient-type--${this.props.type}`;
        }

        // if (!!this.props.className) {
        //     classList += ` ${this.props.className}`;
        // }

        return classList;
    }

    render() {
        return (
            <div className={this.getClasses()}>
                {/* Render gradient configuration UI here */}
            </div>
        );
    }
}