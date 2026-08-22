import { Plus } from "lucide-react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";

const notes = [
    {
        id: 1,
        title: "Welcome to Pastel Notes",
        content: "This is where your notes will appear.",
        date: "Aug 22, 2026",
        color: "pink",
    },
    {
        id: 2,
        title: "Things to remember",
        content: "Add your important thoughts and ideas here.",
        date: "Aug 21, 2026",
        color: "blue",
    },
    {
        id: 3,
        title: "Study notes",
        content: "Keep your university notes organized in one place.",
        date: "Aug 20, 2026",
        color: "purple",
    },
];

function Dashboard() {
    return (
        <div className="min-h-screen bg-pastel-pink/30 text-pastel-text">
            <Navbar />

            <main className="mx-auto max-w-6xl px-4 py-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold">
                            Hi, there
                        </h1>

                        <p className="mt-1 text-sm text-pastel-muted">
                            You have {notes.length} notes saved.
                        </p>
                    </div>

                    <button className="flex items-center gap-2 rounded-2xl bg-pastel-button px-5 py-3 font-display font-bold text-white shadow-md transition hover:brightness-105">
                        <Plus size={18} />
                        New note
                    </button>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {notes.map((note) => (
                        <NoteCard key={note.id} note={note} />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;