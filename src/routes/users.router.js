import express from "express";
import { userController } from "../controllers/users.controller.js";
import { canViewProfile, isAdmin } from "../middlewares/auth.js";
export const usersRouter = express.Router();

usersRouter.get("/", isAdmin, userController.viewAll);
usersRouter.get("/:_id", canViewProfile, userController.viewOne);
usersRouter.get("/:_id/profile", canViewProfile, userController.viewProfile);
usersRouter.get("/:_id/documents", canViewProfile, userController.viewDocuments);
