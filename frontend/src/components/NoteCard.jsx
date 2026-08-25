import { Pencil, Trash2 } from "lucide-react";
import { sanitizeHtml } from "../utils/sanitizeHtml";

function NoteCard({ note, onEdit, onDelete }) {
    const backgroundColors = {
        pink: "bg-pastel-pink",
        blue: "bg-pastel-blue",
        purple: "bg-pastel-purple",
        green: "bg-pastel-green",
        yellow: "bg-pastel-yellow",
    };

    return (
        <div
            onClick={() => onEdit(note)}
            className={`group flex min-h-44 cursor-pointer flex-col rounded-3xl p-5 shadow-md transition hover:-translate-y-1 ${backgroundColors[note.color] || "bg-pastel-pink"}`}
        >
            <h2 className="font-display text-lg font-bold">
                {note.title}
            </h2>

            <div className="mt-2 flex-1 text-sm text-pastel-text/80 line-clamp-3 overflow-hidden"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(note.content) }}
            />

            <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-pastel-muted">
                    {new Date(note.updatedAt).toLocaleDateString()}
                </span>

                <div className="flex gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(note);
                        }}
                        aria-label={`Edit ${note.title}`}
                        className="rounded-xl bg-white/70 p-2 transition hover:bg-white"
                    >
                        <Pencil size={15} />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(note._id);
                        }}
                        aria-label={`Delete ${note.title}`}
                        className="rounded-xl bg-white/70 p-2 transition hover:bg-white"
                    >
                        <Trash2 size={15} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NoteCard;