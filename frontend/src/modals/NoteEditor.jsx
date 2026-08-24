import { useEffect, useRef, useState } from "react";
import {Bold, Italic, Underline,List,ListOrdered, Quote, Heading,X,Check} from "lucide-react";
import { sanitizeHtml } from "../utils/sanitizeHtml";
const colors = [
    { id: "pink", className: "bg-pastel-pink" },
    { id: "blue", className: "bg-pastel-blue" },
    { id: "green", className: "bg-pastel-green" },
    { id: "yellow", className: "bg-pastel-yellow" },
    { id: "purple", className: "bg-pastel-purple" },
];

const tools = [
    { command: "bold", icon: Bold, label: "Bold" },
    { command: "italic", icon: Italic, label: "Italic" },
    { command: "underline", icon: Underline, label: "Underline" },
    { command: "formatBlock", value: "<h2>", icon: Heading, label: "Heading" },
    {
        command: "insertUnorderedList",
        icon: List,
        label: "Bullet list",
    },
    {
        command: "insertOrderedList",
        icon: ListOrdered,
        label: "Numbered list",
    },
    {
        command: "formatBlock",
        value: "<blockquote>",
        icon: Quote,
        label: "Quote",
    },
];

function NoteEditor({ note, onSave, onCancel }) {
    const editorRef = useRef(null);
    const [title, setTitle] = useState(note?.title || "");
    const [color, setColor] = useState(note?.color || "pink");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.innerHTML =  sanitizeHtml(note?.content || "");
        }
    }, [note]);

    const handleFormat = (command, value) => {
        editorRef.current?.focus();
        document.execCommand(command, false, value);
    };

    const handleSave = async () => {
        setSaving(true);

        try {
            const content = sanitizeHtml(editorRef.current?.innerHTML || "");

            await onSave({
                _id: note?._id,
                title: title.trim() || "Untitled note",
                content: content || "<p></p>",
                color,
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm">
            <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-xl">
                
                <div
                    className={`flex items-center justify-between px-6 py-4 ${colors.find((c) => c.id === color)?.className}`}
                >
                    <h2 className="font-display text-lg font-bold text-pastel-text">
                        {note ? "Edit note" : "New note"}
                    </h2>

                    <button
                        onClick={onCancel}
                        className="rounded-full bg-white/60 p-1.5 transition hover:bg-white"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="space-y-4 px-6 py-5">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Give it a sweet title..."
                        className="w-full rounded-2xl border border-pastel-pink bg-white px-4 py-3 font-display text-lg font-bold text-pastel-text outline-none focus:ring-2 focus:ring-pastel-button"
                    />

                    {/* Toolbar */}
                    <div className="flex flex-wrap gap-1 rounded-2xl bg-pastel-lavender p-2">
                        {tools.map(({ command, value, icon: Icon, label }) => (
                            <button
                                key={label}
                                type="button"
                                title={label}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => handleFormat(command, value)}
                                className="rounded-xl bg-white p-2 text-pastel-muted shadow-sm transition hover:text-pastel-text"
                            >
                                <Icon size={16} />
                            </button>
                        ))}

                        <div className="mx-1 h-6 w-px self-center bg-pastel-pink" />

                        {colors.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                aria-label={`Select ${item.id}`}
                                onClick={() => setColor(item.id)}
                                className={`h-7 w-7 rounded-xl border-2 ${item.className} ${
                                    color === item.id
                                        ? "scale-110 border-pastel-text"
                                        : "border-transparent"
                                }`}
                            />
                        ))}
                    </div>

                    {/* Editor */}
                    <div
                        ref={editorRef}
                        contentEditable
                        suppressContentEditableWarning
                        className="note-body min-h-52 w-full rounded-2xl border border-pastel-pink bg-white px-4 py-3 text-sm leading-relaxed text-pastel-text outline-none focus:ring-2 focus:ring-pastel-button"
                    />
                </div>

                <div className="flex justify-end gap-2 border-t border-pastel-pink px-6 py-4">
                    <button
                        onClick={onCancel}
                        className="rounded-2xl border border-pastel-pink px-4 py-2.5 text-sm font-semibold text-pastel-muted transition hover:text-pastel-text"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 rounded-2xl bg-pastel-button px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:brightness-105 disabled:opacity-60"
                    >
                        <Check size={16} />
                        {saving ? "Saving..." : "Save note"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NoteEditor;