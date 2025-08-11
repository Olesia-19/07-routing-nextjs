import { fetchNotes } from "@/lib/api";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const NotesByFilter = async ({ params }: Props) => {
  const { slug } = await params;
  const category = slug[0] === "All" ? "" : slug[0];
  const response = await fetchNotes("", category, 1);

  return (
    <div>
      <NotesClient initialData={response} tag={category} />;
    </div>
  );
};

export default NotesByFilter;
