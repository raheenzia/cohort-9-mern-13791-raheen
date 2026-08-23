import {useState,useEffect} from "react";
import { Plus } from "lucide-react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";

const API_URL = process.env.REACT_APP_API_URL;

function Dashboard(){
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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
                setNotes(data.notes);
            }
            catch(error){
                setError(error.message);
            }finally{
                setLoading(false);
            }
        };

        fetchNotes();
    },[]);

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