import React, { useState } from 'react';
import { SliderProps } from './types';

interface SliderState {
    thumbs: Array<{ value: number }>;
}

export class Slider extends React.Component<SliderProps> {
    trackRef = React.createRef<HTMLDivElement>();

    getPercent(value: number) {
        const min = this.props.min ?? 0;
        const max = this.props.max ?? 100;
        return ((value - min) / (max - min)) * 100;
    }

    handleThumbDrag = (index: number, clientX: number) => {
        if (!this.trackRef.current) return;
        const track = this.trackRef.current;
        const rect = track.getBoundingClientRect();
        const { min = 0, max = 100 } = this.props;

        const ratio = (clientX - rect.left) / rect.width;
        let newValue = min + ratio * (max - min);
        newValue = Math.max(min, Math.min(max, newValue));

        const newThumbs = [...this.props.thumbs];
        // newThumbs[index] = { value: Math.round(newValue) };
        this.props.onThumbsChange(newThumbs);
    };

    handleMouseDown = (index: number) => (event: React.MouseEvent) => {
        const onMouseMove = (e: MouseEvent) => {
            this.handleThumbDrag(index, e.clientX);
        };

        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    handleAddThumb = () => {
        const { min = 0 } = this.props;
        // this.props.onThumbsChange([...this.props.thumbs, { value: min }]);
    };

    render() {
        return (
            <div className={`slider-container ${this.props.className ?? ''}`}>
                <div className="slider-track" ref={this.trackRef}>
                    {this.props.thumbs.map((thumb, index) => (
                        <div
                            key={index}
                            className="slider-thumb"
                            style={{ left: `${this.getPercent(thumb.value)}%` }}
                            onMouseDown={this.handleMouseDown(index)}
                        />
                    ))}
                </div>
                <button onClick={this.handleAddThumb}>Add Thumb</button>
            </div>
        );
    }
}