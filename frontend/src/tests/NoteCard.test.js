import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import NoteCard from "../components/NoteCard";

const note = {
    _id: "123",
    title: "Study notes",
    content: "<p>Important stuff</p>",
    color: "pink",
    updatedAt: "2026-08-22T10:00:00.000Z",
};

test("renders note information", () => {
    render(
        <NoteCard
            note={note}
            onEdit={jest.fn()}
            onDelete={jest.fn()}
        />
    );

    expect(screen.getByText("Study notes")).toBeInTheDocument();
    expect(screen.getByText("Important stuff")).toBeInTheDocument();
});

test("calls onEdit when edit button is clicked", async () => {
    const user = userEvent.setup();
    const onEdit = jest.fn();

    render(
        <NoteCard
            note={note}
            onEdit={onEdit}
            onDelete={jest.fn()}
        />
    );

    await user.click(
        screen.getByRole("button", { name: "Edit Study notes" })
    );

    expect(onEdit).toHaveBeenCalledWith(note);
});

test("calls onDelete with note id when delete button is clicked", async () => {
    const user = userEvent.setup();
    const onDelete = jest.fn();

    render(
        <NoteCard
            note={note}
            onEdit={jest.fn()}
            onDelete={onDelete}
        />
    );

    await user.click(
        screen.getByRole("button", { name: "Delete Study notes" })
    );

    expect(onDelete).toHaveBeenCalledWith("123");
});

test("calls onEdit when the note card itself is clicked", async () => {
    const user = userEvent.setup();
    const onEdit = jest.fn();

    render(
        <NoteCard
            note={note}
            onEdit={onEdit}
            onDelete={jest.fn()}
        />
    );

    await user.click(screen.getByText("Study notes"));

    expect(onEdit).toHaveBeenCalledWith(note);
});