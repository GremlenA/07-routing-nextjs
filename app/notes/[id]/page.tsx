import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "../../../getQueryClient";
import { fetchNoteById } from "@/lib/api";
import NotePreviewClient from "../../@modal/(.)notes/[id]/NotePreview.client";
export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient noteId={id} />
    </HydrationBoundary>
  );
}
