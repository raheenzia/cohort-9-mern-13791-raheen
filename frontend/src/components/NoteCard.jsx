import { Pencil, Trash2 } from "lucide-react";

function NoteCard({ note }) {
    const backgroundColors = {
        pink: "bg-pastel-pink",
        blue: "bg-pastel-blue",
        purple: "bg-pastel-purple",
        green: "bg-pastel-green",
        yellow: "bg-pastel-yellow",
    };

    return (
        <div
            className={`group flex min-h-44 flex-col rounded-3xl p-5 shadow-md transition hover:-translate-y-1 ${backgroundColors[note.color] || "bg-pastel-pink"
                }`}
        >
            <h2 className="font-display text-lg font-bold">
                {note.title}
            </h2>

            <p className="mt-2 flex-1 text-sm text-pastel-text/80">
                {note.content}
            </p>

            <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-pastel-muted">
                    {note.date}
                </span>

                <div className="flex gap-2">
                    <button
                        aria-label={`Edit ${note.title}`}
                        className="rounded-xl bg-white/70 p-2 transition hover:bg-white"
                    >
                        <Pencil size={15} />
                    </button>

                    <button
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