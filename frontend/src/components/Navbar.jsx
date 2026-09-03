import { User } from "lucide-react";

function Navbar({onProfile}) {
    return (
        <header className="border-b border-pastel-pink bg-pastel-pink/40 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3.5">
                <span className="font-display text-xl font-bold">
                    Petal Notes
                </span>

                <div className="ml-auto flex items-center gap-3">

                    <button
                        onClick={onProfile}
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