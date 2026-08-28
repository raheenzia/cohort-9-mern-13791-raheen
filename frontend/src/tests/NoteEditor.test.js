import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import NoteEditor from "../modals/NoteEditor";

beforeEach(() => {
    document.execCommand = jest.fn();
});

afterEach(() => {
    jest.restoreAllMocks();
});

test("renders new note editor", () => {
    render(
        <NoteEditor
            note={null}
            onSave={jest.fn()}
            onCancel={jest.fn()}
        />
    );

    expect(screen.getByText("New note")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Give it a sweet title...")).toBeInTheDocument();
    expect(screen.getByText("Save note")).toBeInTheDocument();
});

test("renders existing note for editing", () => {
    const note = {
        _id: "1",
        title: "My note",
        content: "<p>Hello</p>",
        color: "pink",
    };

    render(
        <NoteEditor
            note={note}
            onSave={jest.fn()}
            onCancel={jest.fn()}
        />
    );

    expect(screen.getByText("Edit note")).toBeInTheDocument();
    expect(screen.getByDisplayValue("My note")).toBeInTheDocument();
});

test("calls onCancel when close button is clicked", async () => {
    const user = userEvent.setup();
    const onCancel = jest.fn();

    render(
        <NoteEditor
            note={null}
            onSave={jest.fn()}
            onCancel={onCancel}
        />
    );

    await user.click(
        screen.getByRole("button", { name: "Close note editor" })
    );

    expect(onCancel).toHaveBeenCalledTimes(1);
});

test("calls formatting command", async () => {
    const user = userEvent.setup();

    render(
        <NoteEditor
            note={null}
            onSave={jest.fn()}
            onCancel={jest.fn()}
        />
    );

    await user.click(screen.getByRole("button", { name: "Bold" }));

    expect(document.execCommand).toHaveBeenCalledWith(
        "bold",
        false,
        undefined
    );
});

test("changes note color", async () => {
    const user = userEvent.setup();

    render(
        <NoteEditor
            note={null}
            onSave={jest.fn()}
            onCancel={jest.fn()}
        />
    );

    await user.click(
        screen.getByRole("button", { name: "Select blue" })
    );

    expect(
        screen.getByRole("button", { name: "Select blue" })
    ).toHaveClass("scale-110");
});

test("calls onSave with note data", async () => {
    const user = userEvent.setup();
    const onSave = jest.fn();

    render(
        <NoteEditor
            note={null}
            onSave={onSave}
            onCancel={jest.fn()}
        />
    );

    await user.type(
        screen.getByPlaceholderText("Give it a sweet title..."),
        "Test note"
    );

    await user.click(screen.getByText("Save note"));

    expect(onSave).toHaveBeenCalledWith(
        expect.objectContaining({
            title: "Test note",
            color: "pink",
        })
    );
});