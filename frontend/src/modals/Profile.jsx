import { LogOut, Mail, User, X } from "lucide-react";

function Profile({ user, noteCount, onClose, onLogout }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-xl">

                <div className="flex items-center justify-between bg-pastel-pink/40 px-6 py-4">
                    <h2 className="font-display text-lg font-bold text-pastel-text">
                        Your profile
                    </h2>

                    <button
                        onClick={onClose}
                        aria-label="Close profile"
                        className="rounded-full bg-white/60 p-1.5 transition hover:bg-white"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="px-6 py-6">

                    <div className="flex items-center gap-4">
                        <div className="flex size-16 items-center justify-center rounded-3xl bg-pastel-pink font-display text-2xl font-bold text-pastel-text">
                            {user?.name?.[0]?.toUpperCase() || "?"}
                        </div>

                        <div>
                            <p className="font-display text-xl font-bold text-pastel-text">
                                {user?.name}
                            </p>

                            <p className="text-sm text-pastel-muted">
                                {noteCount} {noteCount === 1 ? "note" : "notes"} written
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 space-y-2">

                        <div className="flex items-center gap-3 rounded-2xl bg-pastel-lavender px-4 py-3">
                            <User size={16} className="text-pastel-muted" />

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-pastel-muted">
                                    Name
                                </p>
                                <p className="text-sm font-semibold text-pastel-text">
                                    {user?.name}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-2xl bg-pastel-lavender px-4 py-3">
                            <Mail size={16} className="text-pastel-muted" />

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-pastel-muted">
                                    Email
                                </p>
                                <p className="text-sm font-semibold text-pastel-text">
                                    {user?.email}
                                </p>
                            </div>
                        </div>

                    </div>

                    <button
                        onClick={onLogout}
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-pastel-pink/30 px-4 py-3 text-sm font-bold text-red-500 transition hover:bg-red-100"
                    >
                        <LogOut size={16} />
                        Log out
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Profile;