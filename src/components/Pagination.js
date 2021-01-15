import React, { useEffect, useState } from "react";
import "../css/Pagination.css";

export default function Pagination({
  lastPage,
  selectedPage,
  onPageChange,
  align,
}) {
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (selectedPage !== 1) {
      setHasPreviousPage(true);
    }
    if (selectedPage !== lastPage) {
      setHasNextPage(true);
    }
    const p = [];
    for (let i = 1; i <= lastPage; i++) {
      p.push(i);
    }
    setPages(p);
  }, [lastPage, selectedPage]);

  return (
    <div className="pagination" style={{ float: align || "left" }}>
      {hasPreviousPage && (
        <a
          onClick={(e) => {
            e.preventDefault();
            onPageChange(selectedPage - 1);
          }}
          href={`#page-${selectedPage - 1}`}
        >
          &laquo;
        </a>
      )}
      {pages.map((page) => {
        return (
          <a
            onClick={(e) => {
              e.preventDefault();
              onPageChange(page);
            }}
            className={selectedPage === page ? "active" : ""}
            key={page}
            href={`#page-${page}`}
          >
            {page}
          </a>
        );
      })}
      {hasNextPage && (
        <a
          onClick={(e) => {
            e.preventDefault();
            onPageChange(selectedPage + 1);
          }}
          href={`#page-${selectedPage + 1}`}
        >
          &raquo;
        </a>
      )}
    </div>
  );
}
