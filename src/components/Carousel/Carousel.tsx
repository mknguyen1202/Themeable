import { useState, useEffect, useRef, useCallback } from 'react';
import { carouselTokens } from './Carousel.tokens';
import type { CarouselProps } from './Carousel.types';
import styles from './Carousel.module.scss';

export function Carousel({
    children,
    autoPlay = false,
    autoPlayInterval = 4000,
    showArrows = true,
    showDots = true,
    loop = true,
    gap = 16,
    slidesPerView = 1,
    pauseOnHover = true,
}: CarouselProps) {
    const total = children.length;
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);
    const [slideWidth, setSlideWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Measure container width to compute slide width
    useEffect(() => {
        const measure = () => {
            if (!containerRef.current) return;
            const totalGaps = (slidesPerView - 1) * gap;
            setSlideWidth((containerRef.current.offsetWidth - totalGaps) / slidesPerView);
        };
        measure();
        const ro = new ResizeObserver(measure);
        if (containerRef.current) ro.observe(containerRef.current);
        return () => ro.disconnect();
    }, [slidesPerView, gap]);

    const goTo = useCallback((index: number) => {
        if (index < 0) {
            setCurrent(loop ? total - 1 : 0);
        } else if (index >= total) {
            setCurrent(loop ? 0 : total - 1);
        } else {
            setCurrent(index);
        }
    }, [total, loop]);

    const prev = () => goTo(current - 1);
    const next = useCallback(() => goTo(current + 1), [current, goTo]);

    // AutoPlay
    useEffect(() => {
        if (!autoPlay || isPaused || total <= 1) return;
        const id = setInterval(next, autoPlayInterval);
        return () => clearInterval(id);
    }, [autoPlay, autoPlayInterval, isPaused, next, total]);

    const canPrev = loop || current > 0;
    const canNext = loop || current < total - 1;

    const trackOffset = slideWidth > 0
        ? -(current * (slideWidth + gap))
        : 0;

    const style = {
        '--car-arrow-bg': carouselTokens.arrowBg,
        '--car-arrow-hover-bg': carouselTokens.arrowHoverBg,
        '--car-arrow-color': carouselTokens.arrowColor,
        '--car-dot-color': carouselTokens.dotColor,
        '--car-dot-active-color': carouselTokens.dotActiveColor,
        '--car-dot-size': carouselTokens.dotSize,
        '--car-dot-active-size': carouselTokens.dotActiveSize,
    } as React.CSSProperties;

    return (
        <div
            style={style}
            onMouseEnter={pauseOnHover ? () => setIsPaused(true) : undefined}
            onMouseLeave={pauseOnHover ? () => setIsPaused(false) : undefined}
        >
            <div className={styles.carousel} ref={containerRef}>
                <div
                    ref={trackRef}
                    className={styles.track}
                    style={{
                        transform: `translateX(${trackOffset}px)`,
                        gap: `${gap}px`,
                    }}
                >
                    {children.map((child, i) => (
                        <div
                            key={i}
                            className={styles.slide}
                            style={{ width: slideWidth > 0 ? `${slideWidth}px` : `calc(${100 / slidesPerView}% - ${gap * (slidesPerView - 1) / slidesPerView}px)` }}
                        >
                            {child}
                        </div>
                    ))}
                </div>

                {showArrows && total > 1 && (
                    <>
                        <button
                            type="button"
                            className={`${styles.arrow} ${styles.arrowPrev}`}
                            onClick={prev}
                            disabled={!canPrev}
                            aria-label="Previous slide"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className={`${styles.arrow} ${styles.arrowNext}`}
                            onClick={next}
                            disabled={!canNext}
                            aria-label="Next slide"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </>
                )}
            </div>

            {showDots && total > 1 && (
                <div className={styles.dots} role="tablist" aria-label="Carousel navigation">
                    {children.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            role="tab"
                            aria-selected={i === current}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                            onClick={() => goTo(i)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
