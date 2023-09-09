import express from "express";
import { userController } from "../controllers/users.controller.js";
import { isAdmin } from "../middlewares/auth.js";
import { uploader } from "../utils/multer.js";
export const usersApiRouter = express.Router();

usersApiRouter.get("/", /*isAdmin,*/ userController.getAll);
usersApiRouter.post("/", /*isAdmin,*/ userController.postOne);
usersApiRouter.put("/:_id", /*isAdmin,*/ userController.editOne);
usersApiRouter.delete("/:_id", isAdmin, userController.deleteOne);

usersApiRouter.post("/:_id/documents", uploader.single("file"), 
(req,res) => {
    return res.send("ok")
}
)


//userController.uploadFile);



usersApiRouter.get("/premium/:_id", userController.switchRole);

