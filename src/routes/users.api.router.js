import express from "express";
import { userController } from "../controllers/users.controller.js";
import { isAdmin } from "../middlewares/auth.js";
export const usersApiRouter = express.Router();

usersApiRouter.get("/", /*isAdmin,*/ userController.getAll);
usersApiRouter.post("/", /*isAdmin,*/ userController.postOne);
usersApiRouter.put("/:_id", /*isAdmin,*/ userController.editOne);
usersApiRouter.delete("/:_id", isAdmin, userController.deleteOne);
usersApiRouter.get("/premium/:_id", userController.switchRole);

