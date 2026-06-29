import { User } from "../models/users.model.js";
import { Project } from "../models/project.models.js";
import { Task } from "../models/task.models.js";
import { SubTask } from "../models/subtask.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/asynchandler.js";
import mongoose, { Mongoose } from "mongoose";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";

const getTasks = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, "project not found");
  }
  const tasks = await Task.find({
    project: new mongoose.Types.ObjectId(projectId),
  }).populate("assignedTo", "avatar username fullName");

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
});
const createTask = asyncHandler(async (req, res) => {
  const { title, description, assignedTo, status } = req.body;
  const { projectId } = req.params;
  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "project not found");
  }
  const files = req.files || [];
  const attachments = files.map((file) => {
    return {
      url: `${process.env.SERVER_URL}/images/${file.originalname}`,
      mimetype: file.mimetype,
      size: file.size,
    };
  });

  const task = await Task.create({
    title,
    description,
    project: new mongoose.Types.ObjectId(projectId),
    assignedTo: assignedTo
      ? new mongoose.Types.ObjectId(assignedTo)
      : undefined,
    status,
    assignedBy: new mongoose.Types.ObjectId(req.user._id),
    attachments,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task created successfully"));
});

const getTaskbyId = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const task = await Task.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(taskId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "assignedTo",
        foreignField: "_id",
        as: "assignedTo",
        pipeline: [
          {
            $project: {
              _id: 1,
              username: 1,
              fullName: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "subtasks",
        localField: "_id",
        foreignField: "task",
        as: "subtask",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "createdBy",
              foreignField: "_id",
              as: "createdBy",
              pipeline: [
                {
                  $project: {
                    _id: 1,
                    username: 1,
                    fullName: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              createdBy: {
                $arrayElemAt: ["$createdBy", 0],
              },
            },
          },
        ],
      },
    },
    {
      $addFields: {
        assignedTo: {
          $arrayElemAt: ["$assignedTo", 0],
        },
      },
    },
  ]);
  if (!task || task.length == 0) {
    throw new ApiError(404, "Task not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, task[0], "Task fetched successfully"));
});

const updateTask = asyncHandler(async (req, res) => {
  const { projectId, taskId } = req.params
  const { title, description, assignedTo, status } = req.body
  const task = await Task.findById(taskId)
  if (!task) {
    throw new ApiError(404, "Task not found")
  }

  const files = req.files || [];
  const attachments = files.map((file) => {
    return {
      url: `${process.env.SERVER_URL}/images/${file.originalname}`,
      mimetype: file.mimetype,
      size: file.size,
    };
  });

  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    {
      $set: {
        ...(title && { title }),
        ...(description && { description }),
        ...(assignedTo && { assignedTo: new mongoose.Types.ObjectId(assignedTo) }),
        ...(status && { status })
      },
      ...(attachments.length > 0 && {
        $push: { attachments: { $each: attachments } }
      })
    },
    { new: true }
  )

  return res
    .status(201)
    .json(new ApiResponse(200, updatedTask, "Task updated"))
});

const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params
  const task = await Task.findById(taskId)
  if (!task) {
    throw new ApiError(404, "Task not found")
  }
  await SubTask.deleteMany({ task: taskId })
  await Task.findByIdAndDelete(taskId)

  return res
    .status(201)
    .json(new ApiResponse(200, {}, "Task Deleted successfully"))
});

const createSubTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params
  const { title } = req.body

  const task = await Task.findById(taskId)
  if (!task) {
    throw new ApiError(404, "Task not found")
  }
  const subTask = await SubTask.create({
    title,
    task: new mongoose.Types.ObjectId(taskId),
    createdBy: new mongoose.Types.ObjectId(req.user._id)
  })

  return res
    .status(201)
    .json(new ApiResponse(201, subTask, "Subtask created successfully"))
});

const updateSubTask = asyncHandler(async (req, res) => {
  const { subTaskId } = req.params
  const { title, isCompleted } = req.body

  const subTask = await SubTask.findById(subTaskId)
  if (!subTask) {
    throw new ApiError(404, "subtask not found")
  }

  const updatedSubTask = await SubTask.findByIdAndUpdate(
    subTaskId,
    {
      $set: {
        ...(title && { title }),
        ...(isCompleted != undefined && { isCompleted })
      }
    },
    { new: true }
  )
  return res
    .status(200)
    .json(new ApiResponse(200, updatedSubTask, "Subtask updated successfully"))

});

const deleteSubTask = asyncHandler(async (req, res) => {
  const { subTaskId } = req.params
  const subTask = await SubTask.findById(subTaskId)
  if (!subTask) {
    throw new ApiError(404, "subtask not found")
  }
  await SubTask.findByIdAndDelete(subTaskId)

  return res
    .status(201)
    .json(new ApiResponse(200, {}, "subtask deleted succesfully"))
});

export {
  createSubTask,
  deleteTask,
  deleteSubTask,
  updateSubTask,
  createTask,
  updateTask,
  getTaskbyId,
  getTasks,
};
