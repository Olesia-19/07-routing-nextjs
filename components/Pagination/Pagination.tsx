import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps extends Partial<ReactPaginateProps> {
  currentPage: number;
  pageCount: number;
  onChange: (nextPage: number) => void;
}

export default function Pagination({
  currentPage,
  pageCount,
  onChange,
  ...rest
}: PaginationProps) {
  if (pageCount <= 0) return null;

  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={4}
      nextLabel="→"
      previousLabel="←"
      containerClassName={css.pagination}
      activeClassName={css.active}
      onPageChange={({ selected }) => onChange(selected + 1)}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
      {...rest}
    />
  );
}
