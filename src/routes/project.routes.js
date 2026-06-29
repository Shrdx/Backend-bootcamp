import { Router } from "express";
import {
  updateProject,
  updateProjectMember,
  deleteProject,
  RemoveProjectMember,
  AddProjectMember,
  getProjectMember,
  getProjectbyId,
  getProjects,
  createProject,
} from "../controllers/project.controller.js";
import { validate } from "../middlewares/validator.js";
import {
  addMembertoprojectValidator,
  createProjectValidator,
} from "../validators/index.js";
import {
  verifyJWT,
  validateProjectPermission,
} from "../middlewares/auth.middleware.js";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";

const router = Router();
router.use(verifyJWT);
router
  .route("/")
  .get(getProjects)
  .post(createProjectValidator(), validate, createProject);

router
  .route("/:projectId")
  .get(
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.MEMBER,
      UserRolesEnum.PROJECT_ADMIN,
    ]),
    getProjectbyId,
  )
  .put(
    validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.MEMBER]),
    createProjectValidator(),
    validate,
    updateProject,
  )
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteProject);
router
  .route("/:projectId/members")
  .get(getProjectMember)
  .post(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    addMembertoprojectValidator(),
    validate,
    AddProjectMember,
  );
router
  .route("/:projectId/members/:userId")
  .put(validateProjectPermission([UserRolesEnum.ADMIN]), updateProjectMember)
  .delete(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    RemoveProjectMember,
  );

export default router;
