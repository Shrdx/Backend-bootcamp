import { User } from "../models/users.model";
import { ProjectNotes } from "../models/note.models"
import { Project } from "../models/project.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/asynchandler.js";
import mongoose from "mongoose";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";

const createNote = asyncHandler(async (req, res) => {
    const { projectId } = req.params
    const { notes } = req.body

    const project = await Project.findById(projectId)
    if (!project) {
        throw new ApiError(404, "Project not found")
    }
    const note = await ProjectNotes.create({
        project: new mongoose.Types.ObjectId(ProjectId),
        createdBy: new mongoose.Types.ObjectId(req.user._id),
        notes
    })
    return res
        .status(200)
        .json(new ApiResponse(200, note, "Note created successfully"))
})

const getNote = asyncHandler(async (req, res) => {
    const { projectId } = req.params
    const project = await ProjectNotes.findById(projectId)
    if (!project) {
        throw new ApiError(404, "Error not found")
    }
    const notes = await ProjectNotes.find({
        project: new mongoose.Types.ObjectId(projectId),
    }).populate("createdBy", "username avatar fullName",)
    return res
        .status(200)
        .json(new ApiResponse(200, notes, "Notes fetched successfully"))
})

const getNotebyId = asyncHandler(async (req, res) => {
    const { noteId } = req.params
    const note = await ProjectNotes.findById(noteId).populate(
        "createdBy",
        "username fullName avatar"
    )
    if (!note) {
        throw new ApiError(404, "Note not found")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, note, "Note fetched successfully"))
})

const updateNote = asyncHandler(async (req, res) => {
    const { noteId } = req.params
    const { notes } = req.body
    const note = await ProjectNotes.findById(noteId)
    if (!note) {
        throw new ApiError(404, "Error not found")
    }
    const updatedNote = await ProjectNotes.findByIdAndUpdate(
        noteId,
        {
            $set: {
                ...(notes && { notes })
            },
        },
        { new: true }
    )
    return res
        .status(200)
        .json(new ApiResponse(200, updatedNote, "Note updated successfully"))
})

const deleteNote = asyncHandler(async (req, res) => {
    const { noteId } = req.params
    const note = await ProjectNotes.findById(noteId)
    if (!note) {
        throw new ApiError(404, "Error not found")
    }
    const deletedNote = await ProjectNotes.findByIdAndDelete(noteId)

    return res
        .status(200)
        .json(new ApiResponse(200, deletedNote, "Note deleted successfully"))
})

export {
    createNote,
    getNote,
    getNotebyId,
    updateNote,
    deleteNote,
}