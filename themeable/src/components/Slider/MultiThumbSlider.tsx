import React from 'react';
import './_slider.scss';

export interface Thumb {
    id: number;
    value: number;
}

export interface MultiThumbSliderProps {
    min?: number;
    max?: number;
    step?: number;
    thumbs: Thumb[];
    onThumbsChange: (thumbs: Thumb[]) => void;
    className?: string;
}

export class MultiThumbSlider extends React.Component<MultiThumbSliderProps> {
    trackRef = React.createRef<HTMLDivElement>();

    getPercent(value: number): number {
        const { min = 0, max = 100 } = this.props;
        return ((value - min) / (max - min)) * 100;
    }

    handleThumbDrag = (id: number, clientX: number) => {
        const { min = 0, max = 100, step = 1 } = this.props;
        if (!this.trackRef.current) return;

        const rect = this.trackRef.current.getBoundingClientRect();
        const ratio = (clientX - rect.left) / rect.width;
        let newValue = min + ratio * (max - min);
        newValue = Math.round(newValue / step) * step;
        newValue = Math.max(min, Math.min(max, newValue));

        const newThumbs = this.props.thumbs.map(t =>
            t.id === id ? { ...t, value: newValue } : t
        );

        this.props.onThumbsChange(newThumbs);
    };

    handleMouseDown = (id: number) => (event: React.MouseEvent) => {
        event.preventDefault();

        const onMouseMove = (e: MouseEvent) => {
            this.handleThumbDrag(id, e.clientX);
        };

        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    isClickOnThumb = (clientX: number): boolean => {
        const elements = document.elementsFromPoint(clientX, window.innerHeight / 2);
        return elements.some(el => el.classList.contains('slider-thumb'));
    };

    handleTrackClick = (event: React.MouseEvent) => {
        if (this.isClickOnThumb(event.clientX)) return;

        const { min = 0, max = 100 } = this.props;
        if (!this.trackRef.current) return;

        const rect = this.trackRef.current.getBoundingClientRect();
        const ratio = (event.clientX - rect.left) / rect.width;
        let newValue = min + ratio * (max - min);
        newValue = Math.round(newValue);

        const newThumb = {
            id: Date.now(),
            value: Math.max(min, Math.min(max, newValue)),
        };

        this.props.onThumbsChange([...this.props.thumbs, newThumb]);
    };

    handleDeleteThumb = (id: number) => {
        if (this.props.thumbs.length <= 2) return; // Prevent removing the last thumb
        const newThumbs = this.props.thumbs.filter(t => t.id !== id);
        this.props.onThumbsChange(newThumbs);
    };

    render() {
        const { thumbs } = this.props;

        return (
            <div className={`slider-container ${this.props.className ?? ''}`}>
                <div className="slider-track" ref={this.trackRef} onClick={this.handleTrackClick}>
                    {thumbs.map((thumb) => (
                        <div
                            key={thumb.id}
                            className="slider-thumb"
                            style={{ left: `${this.getPercent(thumb.value)}%` }}
                            onMouseDown={this.handleMouseDown(thumb.id)}
                        />
                    ))}
                </div>

                <div className="thumb-list">
                    {thumbs.map(thumb => (
                        <div key={thumb.id} className="thumb-item">
                            <span>ID: {thumb.id}, Value: {thumb.value}</span>
                            <button onClick={() => this.handleDeleteThumb(thumb.id)}>X</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}