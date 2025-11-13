"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";

// ✅ Modal and Form
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

import css from "../../NotesPage.module.css";

export default function NotesByTagPage({ params }: { params: { tag: string } }) {
  const tag = params.tag;
  const [query, setQuery] = useState(tag === "all" ? "" : tag);
  const [page, setPage] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ✅ Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => setIsModalOpen(false);
  const handleModalSuccess = () => setIsModalOpen(false);

  const { data, isLoading } = useQuery({
    queryKey: ["notes", page, query],
    queryFn: () => fetchNotes(query === "" ? {} : { search: query, page }),
  });

  return (
    <main className={css.page}>
      {/* Search + Create button */}
      <div className={css.toolbar}>
        <SearchBox
          value={query}
          onChange={(v) => {
            setQuery(v);
            setPage(1);
          }}
        />

        {/* ✅ open modal */}
        <button className={css.addButton} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </div>

      {/* Loading */}
      {isLoading && <p>Loading...</p>}

      {/* Notes */}
      {data?.notes && data.notes.length > 0 ? (
        <NoteList
          notes={data.notes}
          deletingId={deletingId}
          setDeletingId={setDeletingId}
        />
      ) : (
        !isLoading && <p>No notes found</p>
      )}

      {/* Pagination */}
      {data && data.totalPages && data.totalPages > 1 && (
        <Pagination
          totalPages={data.totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}

      {/* ✅ Modal with Formik NoteForm */}
      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <NoteForm onCancel={handleModalClose} onSuccess={handleModalSuccess} />
        </Modal>
      )}
    </main>
  );
}
