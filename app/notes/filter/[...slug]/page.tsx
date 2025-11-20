import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "../../../../getQueryClient";
import { fetchNotes } from "@/lib/api";
import NotesByTagClient from "./NotesByTagClient";
import { Metadata } from "next";

type Props = {
  params: { tag: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = params;

  const url = `http://localhost:3000/notes/tag/${tag}`;

  return {
    title: `Tag Filter — ${tag}`,
    description: `Notes filtered by tag: ${tag}`,

    openGraph: {
      title: `Tag Filter — ${tag}`,
      description: `Notes filtered by tag: ${tag}`,
      url,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Filtered by tag: ${tag}`,
        },
      ],
    },
  };
}


export default async function NotesByTagPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {

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
