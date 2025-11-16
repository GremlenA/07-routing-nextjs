"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

export default function NotePreviewClient({ noteId }: { noteId: string }) {
  const router = useRouter();

  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled: !!noteId,              // <-- ГОЛОВНЕ ВИПРАВЛЕННЯ
    refetchOnMount: true,           // <-- так теж можна для безпеки
  });

  if (isLoading) {
    return (
      <Modal onClose={() => router.back()}>
        <p>Loading...</p>
      </Modal>
    );
  }

  if (error || !note) {
    return (
      <Modal onClose={() => router.back()}>
        <p>Failed to load note</p>
        <button onClick={() => router.back()}>Close</button>
      </Modal>
    );
  }

  return (
    <Modal onClose={() => router.back()}>
      <h2>{note.title}</h2>

      <p><strong>Tag:</strong> {note.tag}</p>

      <p>{note.content}</p>

      <p>
        <strong>Created:</strong>{" "}
        {new Date(note.createdAt).toLocaleString()}
      </p>

      <button onClick={() => router.back()}>Close</button>
    </Modal>
  );
}
