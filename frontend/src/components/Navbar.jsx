import { Search, User } from "lucide-react";

function Navbar() {
    return (
        <header className="border-b border-pastel-pink bg-pastel-pink/40 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3.5">
                <span className="font-display text-xl font-bold">
                    Petal Notes
                </span>

                <div className="ml-auto flex items-center gap-3">
                    <div className="flex w-40 items-center gap-2 rounded-2xl border border-pastel-pink bg-white px-3 py-2 sm:w-64">
                        <Search size={16} className="shrink-0 text-pastel-muted" />

                        <input
                            type="text"
                            placeholder="Search notes"
                            className="w-full bg-transparent text-sm outline-none placeholder:text-pastel-muted"
                        />
                    </div>

                    <button
                        aria-label="Open profile"
                        className="flex size-10 items-center justify-center rounded-2xl bg-pastel-pink text-pastel-text"
                    >
                        <User size={18} />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Navbar;