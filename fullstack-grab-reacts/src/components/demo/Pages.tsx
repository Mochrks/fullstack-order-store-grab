import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Pages({
  currentPage,
  onPageChange,
  totalItems,
  itemsPerPage,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePreviousPage = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {currentPage === 1 ? (
              <></>
            ) : (
              <PaginationItem>
                <PaginationPrevious onClick={handlePreviousPage} />
              </PaginationItem>
            )}
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  onClick={() => onPageChange(pageNumber)}
                  isActive={currentPage === pageNumber}
                  className={
                    currentPage === 1 && pageNumber === 1 ? "disabled" : ""
                  }
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {currentPage === totalPages ? (
            <></>
          ) : (
            <PaginationItem>
              <PaginationNext onClick={handleNextPage} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
}
