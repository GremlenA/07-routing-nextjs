"use client";

import { useParams } from "next/navigation";
import ModalNoteClient from "./ModalNoteClient";

export default function ModalNotePage() {
  const params = useParams();
  const id = params.id as string;

  return <ModalNoteClient id={id} />;
}
