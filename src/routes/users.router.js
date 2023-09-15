import express from "express";
import { userController } from "../controllers/users.controller.js";
import { isAdmin } from "../middlewares/auth.js";
export const usersRouter = express.Router();

usersRouter.get("/", /*isAdmin,*/ userController.viewAll);
usersRouter.get("/:_id", /*isAdmin,*/ userController.viewOne);
usersRouter.get("/myProfile", /*isAdmin,*/ userController.viewOne);

