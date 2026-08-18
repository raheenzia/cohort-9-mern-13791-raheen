import mongoose from "mongoose";
import Note from "../models/note.model.js";

export const createNoteService = async (userId, title, content, color) => {
    const newNote = new Note({
        title,
        content,
        color,
        user: userId,
    });

    await newNote.save();

    return newNote;
};

export const getNotesService = async (userId) => {
    const notes = await Note.find({
        user: userId,
    }).sort({ createdAt: -1 });

    return notes;
};

export const getNoteByIdService = async (userId, noteId) => {
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        const error = new Error("Invalid note ID");
        error.statusCode = 400;
        throw error;
    }

    const note = await Note.findOne({
        _id: noteId,
        user: userId,
    });

    if (!note) {
        const error = new Error("Note not found");
        error.statusCode = 404;
        throw error;
    }

    return note;
};

export const updateNoteService = async (userId,noteId,title,content,color) => {
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        const error = new Error("Invalid note ID");
        error.statusCode = 400;
        throw error;
    }

    const note = await Note.findOne({
        _id: noteId,
        user: userId,
    });

    if (!note) {
        const error = new Error("Note not found");
        error.statusCode = 404;
        throw error;
    }

    note.title = title;
    note.content = content;

    if (color !== undefined) {
        note.color = color;
    }

    await note.save();

    return note;
};

export const deleteNoteService = async (userId, noteId) => {
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        const error = new Error("Invalid note ID");
        error.statusCode = 400;
        throw error;
    }

    const note = await Note.findOne({
        _id: noteId,
        user: userId,
    });

    if (!note) {
        const error = new Error("Note not found");
        error.statusCode = 404;
        throw error;
    }

    await note.deleteOne();

    return note;
};