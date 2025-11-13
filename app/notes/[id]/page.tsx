"use client";

import { useParams } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";

export default function ModalNotePage() {
  const { id } = useParams() as { id: string };

  return (
    <Modal onClose={() => window.history.back()}>
      <NotePreview id={id} />
    </Modal>
  );
}
