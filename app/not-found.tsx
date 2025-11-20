import type { Metadata } from "next";

export const metadata: Metadata = {
    title:"Note-Found page",
    description:"Note-found",
   openGraph:{
    title:"Note-Found Page",
    directors:"Note-found",
     url:"http://localhost:3000/non-foundl",
     images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Preview",
      },
    ]
   }
};

export default function NotFound() {
  return (
    <main>
      <h1>404 – Сторінку не знайдено</h1>
      <p>На жаль, такої сторінки не існує.</p>
    </main>
  );
}
