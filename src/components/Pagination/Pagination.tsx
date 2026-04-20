import { useMemo } from 'react';
import { paginationTokens } from './Pagination.tokens';
import type { PaginationProps } from './Pagination.types';
import styles from './Pagination.module.scss';

const DOTS = '...';

function range(start: number, end: number) {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    siblingCount = 1,
    showFirstLast = true,
    showPrevNext = true,
    disabled = false,
}: PaginationProps) {
    const paginationRange = useMemo(() => {
        const totalPageNumbers = siblingCount + 5;

        if (totalPageNumbers >= totalPages) {
            return range(1, totalPages);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPages;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount;
            const leftRange = range(1, leftItemCount);
            return [...leftRange, DOTS, totalPages];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount;
            const rightRange = range(totalPages - rightItemCount + 1, totalPages);
            return [firstPageIndex, DOTS, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }

        return [];
    }, [totalPages, siblingCount, currentPage]);

    const handlePageChange = (page: number) => {
        if (disabled || page < 1 || page > totalPages || page === currentPage) return;
        onPageChange(page);
    };

    const style = {
        '--pagination-button-color': paginationTokens.buttonColor,
        '--pagination-active-color': paginationTokens.activeColor,
        '--pagination-active-text-color': paginationTokens.activeTextColor,
        '--pagination-border-color': paginationTokens.borderColor,
        '--pagination-hover-bg': paginationTokens.hoverBackgroundColor,
        '--pagination-disabled-color': paginationTokens.disabledColor,
        '--pagination-radius': paginationTokens.borderRadius,
    } as React.CSSProperties;

    return (
        <nav className={styles.pagination} style={style} aria-label="Pagination">
            <ul className={styles.paginationList}>
                {showFirstLast && (
                    <li>
                        <button
                            className={styles.pageButton}
                            onClick={() => handlePageChange(1)}
                            disabled={disabled || currentPage === 1}
                            aria-label="First page"
                        >
                            ⟨⟨
                        </button>
                    </li>
                )}

                {showPrevNext && (
                    <li>
                        <button
                            className={styles.pageButton}
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={disabled || currentPage === 1}
                            aria-label="Previous page"
                        >
                            ⟨
                        </button>
                    </li>
                )}

                {paginationRange.map((pageNumber, index) => {
                    if (pageNumber === DOTS) {
                        return (
                            <li key={`dots-${index}`}>
                                <span className={styles.dots}>{DOTS}</span>
                            </li>
                        );
                    }

                    return (
                        <li key={pageNumber}>
                            <button
                                className={`${styles.pageButton} ${pageNumber === currentPage ? styles.active : ''}`}
                                onClick={() => handlePageChange(pageNumber as number)}
                                disabled={disabled}
                                aria-label={`Page ${pageNumber}`}
                                aria-current={pageNumber === currentPage ? 'page' : undefined}
                            >
                                {pageNumber}
                            </button>
                        </li>
                    );
                })}

                {showPrevNext && (
                    <li>
                        <button
                            className={styles.pageButton}
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={disabled || currentPage === totalPages}
                            aria-label="Next page"
                        >
                            ⟩
                        </button>
                    </li>
                )}

                {showFirstLast && (
                    <li>
                        <button
                            className={styles.pageButton}
                            onClick={() => handlePageChange(totalPages)}
                            disabled={disabled || currentPage === totalPages}
                            aria-label="Last page"
                        >
                            ⟩⟩
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
}
