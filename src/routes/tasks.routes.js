import { Router } from "express";
import {
    getTasks,
    createTask,
    getTaskbyId,
    updateTask,
    deleteTask,
    createSubTask,
    updateSubTask,
    deleteSubTask,
} from "../controllers/tasks.controllers.js";
import { verifyJWT, validateProjectPermission } from "../middlewares/auth.middleware.js";
import { UserRolesEnum } from "../utils/constants.js";
import { upload } from "../middlewares/multmiddleware.js";
import { validate } from "../middlewares/validator.js";
import {
  createTaskValidator,
  updateTaskValidator,
  createSubTaskValidator,
  updateSubTaskValidator,
} from "../validators/index.js";

const router = Router();
router.use(verifyJWT)
router
    .route("/:projectId")
    .get(
        validateProjectPermission([
            UserRolesEnum.ADMIN,
            UserRolesEnum.MEMBER,
            UserRolesEnum.PROJECT_ADMIN
        ]),
        getTasks
    )
    .post(
        validateProjectPermission([
            UserRolesEnum.ADMIN,
            UserRolesEnum.PROJECT_ADMIN
        ]),
        upload.array("attachments", 10),
        createTaskValidator(),
        validate,
        createTask
    )
router
    .route("/:projectId/t/:taskId")
    .get(
        validateProjectPermission([
            UserRolesEnum.ADMIN,
            UserRolesEnum.PROJECT_ADMIN,
            UserRolesEnum.MEMBER,
        ]),
        getTaskbyId
    )
    .put(
        validateProjectPermission([
            UserRolesEnum.ADMIN,
            UserRolesEnum.PROJECT_ADMIN,
        ]),
        upload.array("attachments", 5),
        updateTaskValidator(),
        validate,
        updateTask
    )
    .delete(
        validateProjectPermission([
            UserRolesEnum.ADMIN,
            UserRolesEnum.PROJECT_ADMIN,
        ]),
        deleteTask
    )
router
    .route("/:projectId/t/:taskId/subtask")
    .post(
        validateProjectPermission([
            UserRolesEnum.ADMIN,
            UserRolesEnum.PROJECT_ADMIN,
        ]),
        createSubTaskValidator(),
        validate,
        createSubTask
    )
router
    .route("/:projectId/st/:subTaskId")
    .put(
        validateProjectPermission([
            UserRolesEnum.ADMIN,
            UserRolesEnum.PROJECT_ADMIN,
            UserRolesEnum.MEMBER,
        ]),
        updateSubTaskValidator(),
        validate,
        updateSubTask
    )
    .delete(
        validateProjectPermission([
            UserRolesEnum.ADMIN,
            UserRolesEnum.PROJECT_ADMIN,
        ]),
        deleteSubTask
    )

export default taskrouter;