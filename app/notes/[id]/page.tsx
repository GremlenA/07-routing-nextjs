import NotePreview from "@/components/NotePreview/NotePreview";

export default function NoteDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <main style={{ padding: "20px" }}>
      <NotePreview noteId={id} />
    </main>
  );
}
