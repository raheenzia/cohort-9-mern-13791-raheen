import { expect } from "chai";
import sinon from "sinon";
import esmock from "esmock";

describe("Note Controllers", () => {
    let createNote;
    let getNotes;
    let getNoteById;
    let updateNote;
    let deleteNote;

    let createNoteService;
    let getNotesService;
    let getNoteByIdService;
    let updateNoteService;
    let deleteNoteService;

    beforeEach(async () => {
        createNoteService = sinon.stub();
        getNotesService = sinon.stub();
        getNoteByIdService = sinon.stub();
        updateNoteService = sinon.stub();
        deleteNoteService = sinon.stub();

        ({
            createNote,
            getNotes,
            getNoteById,
            updateNote,
            deleteNote,
        } = await esmock("../../src/controllers/note.controller.js", {
            "../../src/services/note.service.js": {
                createNoteService,
                getNotesService,
                getNoteByIdService,
                updateNoteService,
                deleteNoteService,
            },
        }));
    });

    function createResponse() {
        return {
            status: sinon.stub().returnsThis(),
            json: sinon.stub().returnsThis(),
        };
    }

    describe("createNote", () => {
        it("should reject missing title or content", async () => {
            const req = {
                body: {
                    title: "",
                    content: "",
                },
            };

            const res = createResponse();

            await createNote(req, res);

            expect(res.status.calledWith(400)).to.equal(true);
            expect(
                res.json.calledWith({
                    message: "Title and content are required",
                })
            ).to.equal(true);

            expect(createNoteService.called).to.equal(false);
        });

        it("should create a note successfully", async () => {
            const note = {
                _id: "note123",
                title: "Test note",
                content: "Content",
            };

            createNoteService.resolves(note);

            const req = {
                user: {
                    userId: "user123",
                },
                body: {
                    title: " Test note ",
                    content: "Content",
                    color: "pink",
                },
            };

            const res = createResponse();

            await createNote(req, res);

            expect(res.status.calledWith(201)).to.equal(true);
            expect(
                res.json.calledWith({
                    message: "Note created successfully",
                    note,
                })
            ).to.equal(true);

            expect(
                createNoteService.calledWith(
                    "user123",
                    "Test note",
                    "Content",
                    "pink"
                )
            ).to.equal(true);
        });
    });

    describe("getNotes", () => {
        it("should return the user's notes", async () => {
            const notes = [
                { _id: "1", title: "Note 1" },
                { _id: "2", title: "Note 2" },
            ];

            getNotesService.resolves(notes);

            const req = {
                user: {
                    userId: "user123",
                },
            };

            const res = createResponse();

            await getNotes(req, res);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.json.calledWith({ notes })).to.equal(true);
        });
    });

    describe("getNoteById", () => {
        it("should return a note successfully", async () => {
            const note = {
                _id: "note123",
                title: "Test note",
            };

            getNoteByIdService.resolves(note);

            const req = {
                user: {
                    userId: "user123",
                },
                params: {
                    id: "note123",
                },
            };

            const res = createResponse();

            await getNoteById(req, res);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(res.json.calledWith({ note })).to.equal(true);
        });
    });

    describe("updateNote", () => {
        it("should reject missing title or content", async () => {
            const req = {
                body: {
                    title: "",
                    content: "",
                },
            };

            const res = createResponse();

            await updateNote(req, res);

            expect(res.status.calledWith(400)).to.equal(true);
            expect(
                res.json.calledWith({
                    message: "Title and content are required",
                })
            ).to.equal(true);

            expect(updateNoteService.called).to.equal(false);
        });

        it("should update a note successfully", async () => {
            const note = {
                _id: "note123",
                title: "Updated",
                content: "Updated content",
            };

            updateNoteService.resolves(note);

            const req = {
                user: {
                    userId: "user123",
                },
                params: {
                    id: "note123",
                },
                body: {
                    title: " Updated ",
                    content: "Updated content",
                    color: "blue",
                },
            };

            const res = createResponse();

            await updateNote(req, res);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(
                res.json.calledWith({
                    message: "Note updated successfully",
                    note,
                })
            ).to.equal(true);

            expect(
                updateNoteService.calledWith(
                    "user123",
                    "note123",
                    "Updated",
                    "Updated content",
                    "blue"
                )
            ).to.equal(true);
        });
    });

    describe("deleteNote", () => {
        it("should delete a note successfully", async () => {
            deleteNoteService.resolves();

            const req = {
                user: {
                    userId: "user123",
                },
                params: {
                    id: "note123",
                },
            };

            const res = createResponse();

            await deleteNote(req, res);

            expect(res.status.calledWith(200)).to.equal(true);
            expect(
                res.json.calledWith({
                    message: "Note deleted successfully",
                })
            ).to.equal(true);

            expect(
                deleteNoteService.calledWith(
                    "user123",
                    "note123"
                )
            ).to.equal(true);
        });
    });
});