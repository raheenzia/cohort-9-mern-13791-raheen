import { expect } from "chai";
import sinon from "sinon";
import mongoose from "mongoose";
import Note from "../../src/models/note.model.js";

import {
    createNoteService,
    getNotesService,
    getNoteByIdService,
    updateNoteService,
    deleteNoteService,
} from "../../src/services/note.service.js";

describe("Note Services", () => {
    afterEach(() => {
        sinon.restore();
    });

    describe("createNoteService", () => {
        it("should create a note successfully", async () => {
            const saveStub = sinon.stub(Note.prototype, "save").resolves();

            const userId = new mongoose.Types.ObjectId();
            const note = await createNoteService(
                userId,
                "Test Note",
                "Test content",
                "pink"
            );

            expect(note.title).to.equal("Test Note");
            expect(note.content).to.equal("Test content");
            expect(note.color).to.equal("pink");
            expect(note.user.toString()).to.equal(userId.toString());
            expect(saveStub.calledOnce).to.equal(true);
        });
    });

    describe("getNotesService", () => {
        it("should return the user's notes", async () => {
            const notes = [
                { title: "Note 1" },
                { title: "Note 2" },
            ];

            const sortStub = sinon.stub().resolves(notes);

            sinon.stub(Note, "find").returns({
                sort: sortStub,
            });

            const result = await getNotesService("user123");

            expect(result).to.deep.equal(notes);
            expect(Note.find.calledOnce).to.equal(true);
            expect(sortStub.calledOnceWithExactly({
                createdAt: -1,
            })).to.equal(true);
        });
    });

    describe("getNoteByIdService", () => {
        it("should reject an invalid note ID", async () => {
            try {
                await getNoteByIdService("user123", "invalid-id");

                throw new Error("Expected service to throw");
            } catch (error) {
                expect(error.message).to.equal("Invalid note ID");
                expect(error.statusCode).to.equal(400);
            }
        });

        it("should return a note when it exists", async () => {
            const noteId = new mongoose.Types.ObjectId().toString();

            const note = {
                _id: noteId,
                user: "user123",
                title: "Test Note",
            };

            sinon.stub(Note, "findOne").resolves(note);

            const result = await getNoteByIdService(
                "user123",
                noteId
            );

            expect(result).to.deep.equal(note);
        });

        it("should reject when the note does not exist", async () => {
            const noteId = new mongoose.Types.ObjectId().toString();

            sinon.stub(Note, "findOne").resolves(null);

            try {
                await getNoteByIdService("user123", noteId);

                throw new Error("Expected service to throw");
            } catch (error) {
                expect(error.message).to.equal("Note not found");
                expect(error.statusCode).to.equal(404);
            }
        });
    });

    describe("updateNoteService", () => {
        it("should reject an invalid note ID", async () => {
            try {
                await updateNoteService(
                    "user123",
                    "invalid-id",
                    "Title",
                    "Content"
                );

                throw new Error("Expected service to throw");
            } catch (error) {
                expect(error.message).to.equal("Invalid note ID");
                expect(error.statusCode).to.equal(400);
            }
        });

        it("should update a note successfully", async () => {
            const noteId = new mongoose.Types.ObjectId();

            const note = {
                _id: noteId,
                user: "user123",
                title: "Old title",
                content: "Old content",
                color: "pink",
                save: sinon.stub().resolves(),
            };

            sinon.stub(Note, "findOne").resolves(note);

            const result = await updateNoteService(
                "user123",
                noteId.toString(),
                "New title",
                "New content",
                "blue"
            );

            expect(result.title).to.equal("New title");
            expect(result.content).to.equal("New content");
            expect(result.color).to.equal("blue");
            expect(note.save.calledOnce).to.equal(true);
        });
    });

    describe("deleteNoteService", () => {
        it("should reject an invalid note ID", async () => {
            try {
                await deleteNoteService("user123", "invalid-id");

                throw new Error("Expected service to throw");
            } catch (error) {
                expect(error.message).to.equal("Invalid note ID");
                expect(error.statusCode).to.equal(400);
            }
        });

        it("should delete a note successfully", async () => {
            const noteId = new mongoose.Types.ObjectId();

            const note = {
                _id: noteId,
                user: "user123",
                deleteOne: sinon.stub().resolves(),
            };

            sinon.stub(Note, "findOne").resolves(note);

            const result = await deleteNoteService(
                "user123",
                noteId.toString()
            );

            expect(result).to.equal(note);
            expect(note.deleteOne.calledOnce).to.equal(true);
        });

        it("should reject when the note does not exist", async () => {
            const noteId = new mongoose.Types.ObjectId().toString();

            sinon.stub(Note, "findOne").resolves(null);

            try {
                await deleteNoteService("user123", noteId);

                throw new Error("Expected service to throw");
            } catch (error) {
                expect(error.message).to.equal("Note not found");
                expect(error.statusCode).to.equal(404);
            }
        });
    });
});