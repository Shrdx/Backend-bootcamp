import { body } from "express-validator";
import { AvailableUserRole, AvailableTaskStatus } from "../utils/constants.js";

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLowercase()
      .withMessage("username must be in lowercase")
      .isLength({ min: 3 })
      .withMessage("username must be atleast 3 characters long"),
    body("password").trim().notEmpty().withMessage("password is required"),
    body("fullName").optional().trim(),
  ];
};

const userLoginValidator = () => {
  return [
    body("email").optional().isEmail().withMessage("Email is invalid"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

const userChangePasswordValidator = () => {
  return [
    body("oldPassword").notEmpty().withMessage("Old password is required"),
    body("newPassword").notEmpty().withMessage(" New password is required"),
  ];
};

const userForgotPasswordValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email required")
      .isEmail()
      .withMessage("Email is invalid"),
  ];
};

const userResetPasswordValidator = () => {
  return [body("newPassword").notEmpty().withMessage("Password is required")];
};

const createProjectValidator = () => {
  return [
    body("name").notEmpty().withMessage("name is required"),
    body("description").optional(),
  ];
};

const addMembertoprojectValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("email is invalid"),
    body("role")
      .notEmpty()
      .withMessage("Role is required")
      .isIn(AvailableUserRole)
      .withMessage("Role is invalid"),
  ];
};
const createTaskValidator = () => {
  return [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("status").optional().isIn(AvailableTaskStatus).withMessage("Invalid status"),
  ];
};

const updateTaskValidator = () => {
  return [
    body("title").optional().trim().notEmpty().withMessage("Title cannot be empty"),
    body("status").optional().isIn(AvailableTaskStatus).withMessage("Invalid status"),
  ];
};

const createSubTaskValidator = () => {
  return [
    body("title").trim().notEmpty().withMessage("Title is required"),
  ];
};

const updateSubTaskValidator = () => {
  return [
    body("title").optional().trim().notEmpty().withMessage("Title cannot be empty"),
    body("isCompleted").optional().isBoolean().withMessage("isCompleted must be a boolean"),
  ];
};

const createNoteValidator = () => {
  return [
    body("notes").trim().notEmpty().withMessage("Notes content is required"),
  ];
};

const updateNoteValidator = () => {
  return [
    body("notes").trim().notEmpty().withMessage("Notes content is required"),
  ];
};

export {
  userRegisterValidator,
  userLoginValidator,
  userChangePasswordValidator,
  userForgotPasswordValidator,
  userResetPasswordValidator,
  createProjectValidator,
  addMembertoprojectValidator,
  createTaskValidator,
  updateTaskValidator,
  createSubTaskValidator,
  updateSubTaskValidator,
  createNoteValidator,
  updateNoteValidator
};
