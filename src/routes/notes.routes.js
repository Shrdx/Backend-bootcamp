import { Router } from "express";
import {
    createNote,
    getNote,
    getNotebyId,
    updateNote,
    deleteNote,
} from "../controllers/notes.controllers.js"
import { verifyJWT, validateProjectPermission } from "../middlewares/auth.middleware.js"
import { UserRolesEnum } from "../utils/constants.js";
import { validate } from "../middlewares/validator.js";
import {
  createNoteValidator,
  updateNoteValidator,
} from "../validators/index.js";

const router = Router();
router.use(verifyJWT);

router
    .route("/:projectId")
    .get(
        validateProjectPermission([
            UserRolesEnum.ADMIN,
            UserRolesEnum.MEMBER,
            UserRolesEnum.PROJECT_ADMIN,
        ]),
        getNote
    )
    .post(
        validateProjectPermission([
            UserRolesEnum.ADMIN,
        ]),
        createNoteValidator(),
        validate,
        createNote
    )

router
    .route("/:projectId/n/:noteId")
    .get(
        validateProjectPermission([
            UserRolesEnum.ADMIN,
            UserRolesEnum.MEMBER,
            UserRolesEnum.PROJECT_ADMIN,
        ]),
        getNotebyId
    )
    .put(
        validateProjectPermission([
            UserRolesEnum.ADMIN,
        ]),
        updateNoteValidator(),
        validate,
        updateNote
    )
    .delete(
        validateProjectPermission([
            UserRolesEnum.ADMIN,
        ]),
        deleteNote
    )

export default router;