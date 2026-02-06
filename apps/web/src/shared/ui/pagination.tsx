import { forwardRef, type HTMLAttributes } from 'react';

interface PaginationProps extends HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  ({ currentPage, totalPages, onPageChange, siblingCount = 1, className = '', ...props }, ref) => {
    const range = (start: number, end: number) =>
      Array.from({ length: end - start + 1 }, (_, i) => start + i);

    const getPageNumbers = () => {
      const totalNumbers = siblingCount * 2 + 3;
      const totalBlocks = totalNumbers + 2;

      if (totalPages <= totalBlocks) {
        return range(1, totalPages);
      }

      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

      const showLeftDots = leftSiblingIndex > 2;
      const showRightDots = rightSiblingIndex < totalPages - 1;

      if (!showLeftDots && showRightDots) {
        const leftRange = range(1, 3 + 2 * siblingCount);
        return [...leftRange, 'dots', totalPages];
      }

      if (showLeftDots && !showRightDots) {
        const rightRange = range(totalPages - (2 + 2 * siblingCount), totalPages);
        return [1, 'dots', ...rightRange];
      }

      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, 'dots', ...middleRange, 'dots', totalPages];
    };

    const pages = getPageNumbers();

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Pagination"
        className={`flex items-center gap-1 ${className}`}
        {...props}
      >
        <PaginationButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeftIcon />
        </PaginationButton>

        {pages.map((page, i) =>
          page === 'dots' ? (
            <span key={`dots-${i}`} className="px-2 text-text-muted">
              ...
            </span>
          ) : (
            <PaginationButton
              key={page}
              onClick={() => onPageChange(page as number)}
              active={currentPage === page}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </PaginationButton>
          ),
        )}

        <PaginationButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRightIcon />
        </PaginationButton>
      </nav>
    );
  },
);

Pagination.displayName = 'Pagination';

interface PaginationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

function PaginationButton({
  active,
  disabled,
  className = '',
  children,
  ...props
}: PaginationButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`
        inline-flex items-center justify-center
        min-w-[36px] h-9 px-3
        text-sm font-medium
        rounded-md
        transition-normal
        focus-ring
        ${active ? 'bg-primary text-primary-foreground' : 'text-text hover:bg-surface-2'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

function ChevronLeftIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
      <path d="M10.354 3.646a.5.5 0 010 .708L6.707 8l3.647 3.646a.5.5 0 01-.708.708l-4-4a.5.5 0 010-.708l4-4a.5.5 0 01.708 0z" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
      <path d="M5.646 3.646a.5.5 0 01.708 0l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L9.293 8 5.646 4.354a.5.5 0 010-.708z" />
    </svg>
  );
}
