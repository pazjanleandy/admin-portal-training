// src/components/Training_Learning/Pagination.jsx
import React, { useMemo } from "react";

function getPageNumbers(currentPage, totalPages) {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

  const pages = [];
  const left = Math.max(2, currentPage - 1);
  const right = Math.min(totalPages - 1, currentPage + 1);

  pages.push(1);
  if (left > 2) pages.push("...");

  for (let p = left; p <= right; p++) pages.push(p);

  if (right < totalPages - 1) pages.push("...");
  pages.push(totalPages);

  return pages;
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const safePage = Math.min(Math.max(1, currentPage), totalPages);

  const pageNumbers = useMemo(
    () => getPageNumbers(safePage, totalPages),
    [safePage, totalPages]
  );

  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-end gap-3">
      <button
        className="px-5 py-2.5 bg-[#DAB619] text-white hover:bg-[#c4a015] disabled:opacity-50 disabled:cursor-not-allowed rounded-md border border-[#AAA9A9] transition-colors"
        disabled={safePage === 1}
        onClick={() => onPageChange(1)}
        type="button"
      >
        FIRST
      </button>

      <div className="inline-flex items-center rounded-md bg-white shadow-sm overflow-hidden border border-[#AAA9A9]">
        <button
          className="px-3 py-2.5 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          disabled={safePage === 1}
          onClick={() => onPageChange(safePage - 1)}
          type="button"
          aria-label="Previous page"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center px-1">
          {pageNumbers.map((page, idx) =>
            page === "..." ? (
              <span key={`ellipsis-${idx}`} className="px-4 py-2.5 text-[#7B7B7B] font-bold">
                …
              </span>
            ) : (
              <button
                key={page}
                className={`px-4 py-2.5 min-w-[40px] text-center transition-colors ${
                  page === safePage
                    ? "bg-[#D7D7D7] text-[#7B7B7B] font-semibold"
                    : "text-[#7B7B7B] hover:bg-[#F0F0F0]"
                }`}
                onClick={() => onPageChange(page)}
                type="button"
              >
                {page}
              </button>
            )
          )}
        </div>

        <button
          className="px-3 py-2.5 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          disabled={safePage === totalPages}
          onClick={() => onPageChange(safePage + 1)}
          type="button"
          aria-label="Next page"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <button
        className="px-5 py-2.5 bg-[#DAB619] text-white hover:bg-[#c4a015] disabled:opacity-50 disabled:cursor-not-allowed rounded-md border border-[#AAA9A9] transition-colors"
        disabled={safePage === totalPages}
        onClick={() => onPageChange(totalPages)}
        type="button"
      >
        LAST
      </button>
    </div>
  );
}
