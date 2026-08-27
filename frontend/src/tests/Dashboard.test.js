import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Dashboard from "../pages/Dashboard";

const mockNavigate = jest.fn();

// jest.mock("react-router-dom", () => ({
//     ...jest.requireActual("react-router-dom"),
//     useNavigate: () => mockNavigate,
// }));
jest.mock("react-router-dom", () => ({
    useNavigate: () => mockNavigate,
}));

jest.mock("../components/Navbar", () => ({ onProfile }) => (
    <button onClick={onProfile}>Profile</button>
));

jest.mock("../components/NoteCard", () => ({ note, onEdit, onDelete }) => (
    <div>
        <span>{note.title}</span>
        <button onClick={() => onEdit(note)}>Edit {note.title}</button>
        <button onClick={() => onDelete(note._id)}>
            Delete {note.title}
        </button>
    </div>
));

jest.mock("../modals/NoteEditor", () => ({ note, onSave, onCancel }) => (
    <div>
        <span>{note ? "Edit note" : "New note"}</span>
        <button onClick={onCancel}>Cancel editor</button>
        <button
            onClick={() =>
                onSave({
                    _id: note?._id,
                    title: note?.title || "New note",
                    content: note?.content || "New content",
                    color: note?.color || "pink",
                })
            }
        >
            Save note
        </button>
    </div>
));

jest.mock("../modals/Profile", () => ({ user, noteCount, onClose, onLogout }) => (
    <div>
        <span>{user?.name}</span>
        <span>{noteCount} notes written</span>
        <button onClick={onClose}>Close profile</button>
        <button onClick={onLogout}>Log out</button>
    </div>
));

const notes = [
    {
        _id: "1",
        title: "First note",
        content: "<p>Hello</p>",
        color: "pink",
        updatedAt: "2026-08-20T10:00:00.000Z",
    },
    {
        _id: "2",
        title: "Second note",
        content: "<p>World</p>",
        color: "blue",
        updatedAt: "2026-08-21T10:00:00.000Z",
    },
];

beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    localStorage.setItem("token", "test-token");
    global.fetch = jest.fn();
});

afterEach(() => {
    jest.restoreAllMocks();
});

function mockDashboardRequests() {
    global.fetch
        .mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({ notes }),
        })
        .mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({
                user: {
                    name: "meeee",
                    email: "john@example.com",
                },
            }),
        });
}

test("fetches and displays notes", async () => {
    mockDashboardRequests();

    render(<Dashboard />);

    expect(await screen.findByText("First note")).toBeInTheDocument();
    expect(screen.getByText("Second note")).toBeInTheDocument();

    expect(screen.getByText("You have 2 notes saved.")).toBeInTheDocument();
});

test("shows empty state when there are no notes", async () => {
    global.fetch
        .mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({ notes: [] }),
        })
        .mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({
                user: {
                    name: "meeee",
                    email: "john@example.com",
                },
            }),
        });

    render(<Dashboard />);

    expect(
        await screen.findByText("You don't have any notes yet.")
    ).toBeInTheDocument();
});

test("opens editor when New note is clicked", async () => {
    const user = userEvent.setup();

    mockDashboardRequests();

    render(<Dashboard />);

    await screen.findByText("First note");

    await user.click(screen.getByRole("button", { name: /New note/i }));

    // expect(screen.getByText("New note")).toBeInTheDocument();
     expect(
        screen.getByRole("button", { name: /Cancel editor/i })
    ).toBeInTheDocument();
});

test("opens editor with selected note when edit is clicked", async () => {
    const user = userEvent.setup();

    mockDashboardRequests();

    render(<Dashboard />);

    await screen.findByText("First note");

    await user.click(screen.getByRole("button", { name: "Edit First note" }));

    expect(screen.getByText("Edit note")).toBeInTheDocument();
});

test("deletes a note", async () => {
    const user = userEvent.setup();

    mockDashboardRequests();

    global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
            message: "Note deleted successfully",
        }),
    });

    global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ notes: [notes[1]] }),
    });

    global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
            user: {
                name: "meeee",
                email: "john@example.com",
            },
        }),
    });

    render(<Dashboard />);

    await screen.findByText("First note");

    await user.click(
        screen.getByRole("button", { name: "Delete First note" })
    );

    await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining("/api/notes/1"),
            expect.objectContaining({
                method: "DELETE",
            })
        );
    });
});

test("opens profile", async () => {
    const user = userEvent.setup();

    mockDashboardRequests();

    render(<Dashboard />);

    await screen.findByText("First note");

    await user.click(screen.getByRole("button", { name: "Profile" }));

    expect(screen.getByText("meeee")).toBeInTheDocument();
    expect(screen.getByText("2 notes written")).toBeInTheDocument();
});