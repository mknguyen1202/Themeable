import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { lightboxTokens } from './Lightbox.tokens';
import type { LightboxProps } from './Lightbox.types';
import styles from './Lightbox.module.scss';

export function Lightbox({
    images,
    initialIndex = 0,
    isOpen,
    onClose,
    showThumbnails = true,
    showCounter = true,
    showCaptions = true,
    loop = true,
}: LightboxProps) {
    const [current, setCurrent] = useState(initialIndex);

    useEffect(() => {
        if (isOpen) setCurrent(initialIndex);
    }, [isOpen, initialIndex]);

    const canPrev = loop || current > 0;
    const canNext = loop || current < images.length - 1;

    const prev = useCallback(() => {
        setCurrent(i => (i === 0 ? (loop ? images.length - 1 : 0) : i - 1));
    }, [images.length, loop]);

    const next = useCallback(() => {
        setCurrent(i => (i === images.length - 1 ? (loop ? 0 : i) : i + 1));
    }, [images.length, loop]);

    useEffect(() => {
        if (!isOpen) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [isOpen, onClose, prev, next]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen || images.length === 0) return null;

    const img = images[current];

    const style = {
        '--lb-overlay': lightboxTokens.overlayColor,
        '--lb-control': lightboxTokens.controlColor,
        '--lb-control-hover': lightboxTokens.controlHoverColor,
        '--lb-caption-bg': lightboxTokens.captionBg,
        '--lb-caption-color': lightboxTokens.captionColor,
        '--lb-thumb-border': lightboxTokens.thumbnailBorderColor,
        '--lb-thumb-active-border': lightboxTokens.thumbnailActiveBorderColor,
        '--lb-counter': lightboxTokens.counterColor,
    } as React.CSSProperties;

    const content = (
        <div
            className={styles.overlay}
            style={style}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            tabIndex={-1}
        >
            {/* Header */}
            <div className={styles.header} onClick={e => e.stopPropagation()}>
                {showCounter && (
                    <span className={styles.counter}>{current + 1} / {images.length}</span>
                )}
                <button className={styles.controlBtn} onClick={onClose} aria-label="Close">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Main image */}
            <div className={styles.imageArea} onClick={e => e.stopPropagation()}>
                {images.length > 1 && (
                    <button
                        className={`${styles.arrow} ${styles.arrowPrev}`}
                        onClick={prev}
                        disabled={!canPrev}
                        aria-label="Previous image"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                )}

                <img
                    key={current}
                    src={img.src}
                    alt={img.alt ?? `Image ${current + 1}`}
                    className={styles.image}
                />

                {showCaptions && img.caption && (
                    <div className={styles.caption}>{img.caption}</div>
                )}

                {images.length > 1 && (
                    <button
                        className={`${styles.arrow} ${styles.arrowNext}`}
                        onClick={next}
                        disabled={!canNext}
                        aria-label="Next image"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Thumbnails */}
            {showThumbnails && images.length > 1 && (
                <div className={styles.thumbnails} onClick={e => e.stopPropagation()}>
                    {images.map((image, i) => (
                        <button
                            key={i}
                            className={`${styles.thumb} ${i === current ? styles.thumbActive : ''}`}
                            onClick={() => setCurrent(i)}
                            aria-label={`View image ${i + 1}`}
                            aria-current={i === current}
                        >
                            <img src={image.thumbnail ?? image.src} alt={image.alt ?? `Thumbnail ${i + 1}`} />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );

    return createPortal(content, document.querySelector('[data-theme-id]') ?? document.body);
}
