export interface CarouselProps {
    children: React.ReactNode[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
    showArrows?: boolean;
    showDots?: boolean;
    loop?: boolean;
    gap?: number;
    /** Number of slides visible at once */
    slidesPerView?: number;
    /** Pause autoplay on hover */
    pauseOnHover?: boolean;
}
