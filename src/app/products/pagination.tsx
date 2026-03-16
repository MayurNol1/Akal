"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ totalPages, currentPage }: { totalPages: number, currentPage: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Build page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="pt-20 flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
      <Link 
        href={currentPage > 1 ? createPageURL(currentPage - 1) : "#"} 
        className={`w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center transition-all ${currentPage <= 1 ? 'opacity-20 cursor-not-allowed pointer-events-none' : 'hover:border-primary hover:text-primary cursor-pointer'}`}
      >
        <ChevronLeft size={18} />
      </Link>
      
      <div className="flex items-center gap-3 px-4">
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return <span key={`ellipsis-${index}`} className="px-2 text-zinc-500">...</span>;
          }
          return (
            <Link
              key={page}
              href={createPageURL(page)}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                currentPage === page 
                  ? "bg-orange-500 text-background-dark font-black" 
                  : "hover:bg-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              {page}
            </Link>
          );
        })}
      </div>

      <Link 
        href={currentPage < totalPages ? createPageURL(currentPage + 1) : "#"} 
        className={`w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center transition-all ${currentPage >= totalPages ? 'opacity-20 cursor-not-allowed pointer-events-none' : 'hover:border-primary hover:text-primary cursor-pointer'}`}
      >
        <ChevronRight size={18} />
      </Link>
    </div>
  );
}
