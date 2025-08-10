"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "@/components/Loader/Loader";
import Error from "../../error";
import css from "./Notes.module.css";

interface NotesClientProps {
  initialData: FetchNotesResponse;
  category: string;
}

export default function NotesClient({
  initialData,
  category,
}: NotesClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const handleSearch = useDebouncedCallback((search: string) => {
    setDebouncedSearch(search);
  }, 300);

  const onChange = (search: string) => {
    setSearch(search);
    setPage(1);
    handleSearch(search);
  };

  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ["notes", debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page, category),
    placeholderData: keepPreviousData,
    initialData,
    enabled: true,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onSearch={onChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            pageCount={data.totalPages}
            onChange={setPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <Loader />}

      {isError && <Error error={error} />}

      {isSuccess && data ? (
        data.notes.length > 0 ? (
          <NoteList notes={data.notes} />
        ) : (
          <p>Notes not found</p>
        )
      ) : null}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCloseModal={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
