import { Router } from "express";
import {changePassword, forgotPassword, getCurrentUser, login, logoutUser, refresAcessToken, registerUser, resendEmailVerification, resetPassword, verfiyEmail} from "../controllers/auth.js"
import { validate } from "../middlewares/validator.js";
import {userRegisterValidator,  userLoginValidator, userForgotPasswordValidator, userResetPasswordValidator, userChangePasswordValidator} from "../validators/index.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router()
//unsecured routes
router.route("/register").post(userRegisterValidator(), validate, registerUser)
router.route("/login").post(userLoginValidator(), validate, login)
router.route("/verify-email/:verificationToken").get(verfiyEmail)
router.route("/refresh-token").post(refresAcessToken)
router.route("/forgot-password").post(userForgotPasswordValidator(), validate, forgotPassword)
router.route("/reset-password/:resetToken").post(userResetPasswordValidator(), validate, resetPassword)

//secure routes
router.route("/logout").post( verifyJWT, logoutUser )
router.route("/current-user").post( verifyJWT, getCurrentUser )
router.route("/change-password").post( verifyJWT, userChangePasswordValidator(), validate, changePassword )
router.route("/resend-email-verification").post( verifyJWT, resendEmailVerification )

export default router