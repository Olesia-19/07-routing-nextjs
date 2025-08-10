import { fetchNotes } from "@/lib/api";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const NotesByFilter = async ({ params }: Props) => {
  const { slug } = await params;
  const category = slug[0] === "All" ? "" : slug[0];
  const response = await fetchNotes("", 1, category);

  return (
    <div>
      <NotesClient initialData={response} category={category} />;
    </div>
  );
};

export default NotesByFilter;
