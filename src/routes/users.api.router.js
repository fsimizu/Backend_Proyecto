import express from "express";
import { userController } from "../controllers/users.controller.js";
import { isAdmin } from "../middlewares/auth.js";
import { uploader } from "../utils/multer.js";
export const usersApiRouter = express.Router();

usersApiRouter.get("/", isAdmin, userController.getAll);
usersApiRouter.post("/", userController.postOne);
usersApiRouter.delete("/", isAdmin, userController.deleteInactiveUsers);

usersApiRouter.put("/:_id", userController.editOne);
usersApiRouter.delete("/:_id", isAdmin, userController.deleteOne);

usersApiRouter.post("/:_id/profiles", uploader.array("profiles"), userController.uploadFile);
usersApiRouter.post("/:_id/documents", uploader.array("documents"), userController.uploadDocument);
usersApiRouter.post("/:_id/products", uploader.array("products"), userController.uploadFile);

usersApiRouter.get("/premium/:_id", userController.switchRole);