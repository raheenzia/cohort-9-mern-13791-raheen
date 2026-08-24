import {useState,useEffect} from "react";
import { Plus } from "lucide-react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import NoteEditor from "../modals/NoteEditor";

const API_URL = process.env.REACT_APP_API_URL;

function Dashboard(){
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingNote, setEditingNote] = useState(null);
    const [showEditor, setShowEditor] = useState(false);

    const fetchNotes = async () => {
        try{
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/api/notes`, {
                headers:{
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if(!response.ok){
                throw new Error(data.message || "Failed to fetch notes");
            }
            setNotes(data.notes.sort(
                (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
            ));
        }
        catch(error){
            setError(error.message);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    },[]);

    const handleSave = async(noteData)=> {
        try{
            const token = localStorage.getItem("token");
            const isEditing = Boolean(noteData._id);

            const url = isEditing ? `${API_URL}/api/notes/${noteData._id}` : `${API_URL}/api/notes`;

            const response  = await fetch(url,{
                method: isEditing ? "PUT" : "POST",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: noteData.title,
                    content: noteData.content,
                    color: noteData.color,
                }),
            });
            const data = await response.json();
            if(!response.ok){
                throw new Error(data.message || "Failed to save note");
            }
            
            setShowEditor(false);
            setEditingNote(null);

            await fetchNotes();
        } catch (error) {
            console.error("Failed to save note:", error);
        }
    };

    const handleDelete = async(noteId) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/api/notes/${noteId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to delete note");
            }

            setNotes((currentNotes) =>
                currentNotes.filter((note) => note._id !== noteId)
            );
        } catch (error) {
            console.error("Failed to delete note:", error);
        }
    }

     const handleNewNote = () => {
        setEditingNote(null);
        setShowEditor(true);
    };

    const handleEditNote = (note) => {
        setEditingNote(note);
        setShowEditor(true);
    };

    const handleCancel = () => {
        setShowEditor(false);
        setEditingNote(null);
    };

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

                    <button 
                        className="flex items-center gap-2 rounded-2xl bg-pastel-button px-5 py-3 font-display font-bold text-white shadow-md transition hover:brightness-105"
                        onClick={handleNewNote}
                    >
                        <Plus size={18} />
                        New note
                    </button>
                </div>

                {!loading && error && (
                    <p className="mt-8 text-center text-red-500">
                        {error}
                    </p>
                )}

                {!loading && !error && notes.length === 0 && (
                    <p className="mt-8 text-center text-pastel-muted">
                        You don't have any notes yet.
                    </p>
                )}

                {!loading && !error && notes.length > 0 && (
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {notes.map((note) => (
                            <NoteCard
                                key={note._id}
                                note={note}
                                onEdit={handleEditNote}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </main>
            {showEditor && (
                <NoteEditor
                    note={editingNote}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
}

export default Dashboard;