import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './_style.scss';

const PolarController: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const knobRef = useRef<HTMLDivElement>(null);
    const maxRadius = 150; // Max radius in pixels

    const handleDrag = (event: MouseEvent) => {
        if (containerRef.current && knobRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const x = event.clientX - rect.left - centerX;
            const y = event.clientY - rect.top - centerY;
            const distance = Math.sqrt(x ** 2 + y ** 2);
            const angle = Math.atan2(y, x);
            const limitedDistance = Math.min(distance, maxRadius);
            setPosition({
                x: Math.cos(angle) * limitedDistance,
                y: Math.sin(angle) * limitedDistance,
            });
        }
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const x = event.clientX - rect.left - centerX;
        const y = event.clientY - rect.top - centerY;
        const distance = Math.sqrt(x ** 2 + y ** 2);
        const angle = Math.atan2(y, x);
        const limitedDistance = Math.min(distance, maxRadius);
        setPosition({
            x: Math.cos(angle) * limitedDistance,
            y: Math.sin(angle) * limitedDistance,
        });
    };

    const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };

    const startDrag = () => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };


    const moveToPoint = (event: MouseEvent) => {
        console.log(event);
        if (!containerRef.current) {
            console.log("containerRef is null");
            return;
        }
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const x = event.clientX - rect.left - centerX;
        const y = event.clientY - rect.top - centerY;
        const distance = Math.sqrt(x ** 2 + y ** 2);
        const angle = Math.atan2(y, x);
        const limitedDistance = Math.min(distance, maxRadius);
        setPosition({
            x: Math.cos(angle) * limitedDistance,
            y: Math.sin(angle) * limitedDistance,
        });
    };

    useEffect(() => {
        const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleDrag);
            window.removeEventListener('mouseup', handleMouseUp);
        };
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousedown', moveToPoint);
        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousedown', moveToPoint);
        };
    }, []);




    return (
        <>
            <div className="polar-controller" ref={containerRef}>
                {[0.2, 0.4, 0.6, 0.8].map((factor, index) => (
                    <>
                        <div key={index}
                            className="polar-circle"
                            style={{
                                width: maxRadius * 2 * factor,
                                height: maxRadius * 2 * factor
                            }}
                        />
                        <label
                            style={{
                                transform: `
                                    translate(-50%, -50%) 
                                    translate(0px, 
                                    ${maxRadius * factor + 6}px)
                                `,
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                color: "grey",
                                fontSize: "10px",
                            }}
                        >{factor * 100}%</label>
                    </>
                ))}
                <div className="center-dot" />
                <svg className="connector-line" width="100%" height="100%">
                    <line
                        x1="50%"
                        y1="50%"
                        x2={`${50 + (position.x / maxRadius) * 50}%`}
                        y2={`${50 + (position.y / maxRadius) * 50}%`}
                        stroke="black"
                        strokeWidth="2"
                    />
                </svg>
                <div
                    className="knob"
                    ref={knobRef}
                    style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
                    onMouseDown={startDrag}
                />

            </div>
            <div>
                {position.x.toFixed(2)} {position.y.toFixed(2)}
            </div>
        </>


    );
};

export default PolarController;
