"use client";

import ModalNoteClient from "./ModalNoteClient";
import { useParams } from "next/navigation";

export default function ModalNotePage() {
  const { id } = useParams();

  return <ModalNoteClient noteId={id as string} />;
}
