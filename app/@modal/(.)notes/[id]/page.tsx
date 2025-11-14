import ModalNoteClient from "./ModalNoteClient";

export default async function ModalNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ModalNoteClient noteId={id} />;
}
