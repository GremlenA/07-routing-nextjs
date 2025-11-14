import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "../../../../getQueryClient";
import { fetchNotes } from "@/lib/api";
import NotesByTagClient from "./NotesByTagClient";

export default async function NotesByTagPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {

  // ⬇️ ОБЯЗАТЕЛЬНО — ждём Promise
  const { slug } = await params;

  const tag = slug?.[0] ?? "all";
  const query = tag === "all" ? undefined : tag;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, query],
    queryFn: () => fetchNotes({ page: 1, tag: query }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesByTagClient initialTag={tag} />
    </HydrationBoundary>
  );
}
