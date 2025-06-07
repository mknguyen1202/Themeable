

import React from 'react'
import { GradientProps } from './types';

import { Button } from '../../Button/Button';
import { ButtonGroup } from '../../ButtonGroup/ButtonGroup';

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
                <h3>Gradient Configurator</h3>
                <ButtonGroup>
                    <Button >Linear</Button>
                    <Button>Radial</Button>
                </ButtonGroup>
            </div>
        );
    }
}

const GradientPreviewStrip = ({ colors }: { colors: string[] }) => {
    return (
        <div className="gradient-preview-strip" style={{ background: `linear-gradient(to right, ${colors.join(', ')})` }}>
            {/* This div will show the gradient preview */}
        </div>
    );
}

const ColorStopList = ({ stops }: { stops: string[] }) => {
    return (
        <ul className="color-stop-list">
            {stops.map((stop, index) => (
                <li key={index} className="color-stop-item" style={{ backgroundColor: stop }}>
                    {stop}
                </li>
            ))}
        </ul>
    );
}

const ColorStop = ({ color, onChange }: { color: string; onChange: (newColor: string) => void }) => {
    return (
        <div className="color-stop">
            <input
                type="color"
                value={color}
                onChange={(e) => onChange(e.target.value)}
                className="color-stop-input"
            />
            <span className="color-stop-label">{color}</span>
            <input
                type="color"
                value={parseFloat(color.replace('#', '0x'))}
                onChange={(e) => onChange(`#${parseInt(e.target.value, 16).toString(16)}`)}
                className="color-stop-number"
            />
        </div>
    );
}