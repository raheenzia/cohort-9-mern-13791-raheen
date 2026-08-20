import { createNoteService,getNotesService,getNoteByIdService,updateNoteService, deleteNoteService} from "../services/note.service.js";

export const createNote = async (req, res) => {
    try {
        const { title, content, color } = req.body;

        if (
            typeof title !== "string" ||
            typeof content !== "string" ||
            !title.trim() ||
            !content.trim()
        ) {
            return res.status(400).json({
                message: "Title and content are required",
            });
        }

        if (color !== undefined && typeof color !== "string") {
            return res.status(400).json({
                message: "Color must be a string",
            });
        }

        const note = await createNoteService(
            req.user.userId,
            title.trim(),
            content,
            color
        );

        return res.status(201).json({
            message: "Note created successfully",
            note,
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || "Something went wrong",
        });
    }
};

export const getNotes = async (req, res) => {
    try {
        const notes = await getNotesService(req.user.userId);

        return res.status(200).json({
            notes,
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || "Something went wrong",
        });
    }
};

export const getNoteById = async (req, res) => {
    try {
        const note = await getNoteByIdService(
            req.user.userId,
            req.params.id
        );

        return res.status(200).json({
            note,
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || "Something went wrong",
        });
    }
};

export const updateNote = async (req, res) => {
    try {
        const { title, content, color } = req.body;

        if (
            typeof title !== "string" ||
            typeof content !== "string" ||
            !title.trim() ||
            !content.trim()
        ) {
            return res.status(400).json({
                message: "Title and content are required",
            });
        }

        if (color !== undefined && typeof color !== "string") {
            return res.status(400).json({
                message: "Color must be a string",
            });
        }

        const note = await updateNoteService(
            req.user.userId,
            req.params.id,
            title.trim(),
            content,
            color
        );

        return res.status(200).json({
            message: "Note updated successfully",
            note,
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || "Something went wrong",
        });
    }
};

export const deleteNote = async (req, res) => {
    try {
        await deleteNoteService(
            req.user.userId,
            req.params.id
        );

        return res.status(200).json({
            message: "Note deleted successfully",
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || "Something went wrong",
        });
    }
};