import mongoose from "mongoose";
import Note from "../models/note.model.js";
import logger from "../config/logger.js";

export const createNoteService = async (userId, title, content, color) => {
    try{
        const newNote = new Note({
            title,
            content,
            color,
            user: userId,
        });

            await newNote.save();
            logger.info(
                {userId,noteId: newNote._id,},
                "Note created"
            );

            return newNote;
    } catch (error) {
        if (error.statusCode) {
            throw error;
        }

        const servError = new Error("Failed to create note");
        servError.statusCode = 500;
        throw servError;
    }
};

export const getNotesService = async (userId) => {
    try{
        const notes = await Note.find({
            user: userId,
        }).sort({ createdAt: -1 });

        return notes;
    } catch (error) {
        if (error.statusCode) {
            throw error;
        }
        const servError = new Error("Failed to get notes");
        servError.statusCode = 500;
        throw servError;
    }
};

export const getNoteByIdService = async (userId, noteId) => {
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        const error = new Error("Invalid note ID");
        error.statusCode = 400;
        throw error;
    }

    try {
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
    } catch (error) {
        if (error.statusCode) {
            throw error;
        }

        const servError = new Error("Failed to get note");
        servError.statusCode = 500;
        throw servError;
        
    }
};

export const updateNoteService = async (userId,noteId,title,content,color) => {
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        const error = new Error("Invalid note ID");
        error.statusCode = 400;
        throw error;
    }

    try {
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

        logger.info(
            {userId,noteId: note._id,},
            "Note updated"
        );

        return note;
    } catch (error) {
        if (error.statusCode) {
            throw error;
        }

        const servError = new Error("Failed to update note");
        servError.statusCode = 500;
        throw servError;
    }
};

export const deleteNoteService = async (userId, noteId) => {
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        const error = new Error("Invalid note ID");
        error.statusCode = 400;
        throw error;
    }

    try {
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

        logger.info(
            {userId,noteId: note._id,},
            "Note deleted"
        );

        return note;
    } catch (error) {
        if (error.statusCode) {
            throw error;
        }
        
        const servError = new Error("Failed to delete note");
        servError.statusCode = 500;
        throw servError;
    }
};