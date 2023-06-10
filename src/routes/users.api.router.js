import express from "express";
import { userService } from "../services/users.service.js";
export const usersApiRouter = express.Router();

usersApiRouter.get("/", async (_, res) => {
  try {
    const users = await userService.getUsers();

    return res.status(200).json({
      status: "success",
      msg: "listado de usuarios",
      payload: users,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      payload: {},
    });
  }
});

usersApiRouter.post("/", async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;
        if (!firstName || !lastName || !email) {
            console.log( "validation error: please complete firstName, lastname and email.");
            return res.status(400).json({
            status: "error",
            msg: "please complete firstName, lastname and email.",
            payload: {},
            });
        }
        const userCreated = await userService.createUsers({ firstName, lastName, email });
        return res.status(201).json({
            status: "success",
            msg: "user created",
            payload: {
              _id: userCreated._id,
              firstName: userCreated.firstName,
              lastName: userCreated.lastName,
              email: userCreated.email
            }
        });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  });
  
usersApiRouter.put("/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const { firstName, lastName, email } = req.body;
        if (!firstName || !lastName || !email || !_id) {
        console.log(
            "validation error: please complete firstName, lastname and email."
        );
        return res.status(400).json({
            status: "error",
            msg: "please complete firstName, lastname and email.",
            payload: {},
        });
        }

        try {
          const userUpdated = await userService.updateUsers({ _id: _id, firstName, lastName, email });
          if (userUpdated.matchedCount){
            return res.status(201).json({
            status: "success",
            msg: "user updated",
            payload: {              
              _id: _id,
              firstName: firstName,
              lastName: lastName,
              email: email,
            }
            });
          }
        } catch (e) {
            return res.status(500).json({
            status: "error",
            msg: "db error while updating the user" + e,
            payload: {},
            });
        }
} catch (e) {
    return res.status(500).json({
    status: "error",
    msg: "something went wrong :(" + e,
    payload: {},
    });
}
});

usersApiRouter.delete("/:_id", async (req, res) => {
    try {
      const { _id } = req.params;
      await userService.deleteUsers(( _id ));
      return res.status(200).json({
        status: "success",
        msg: "user deleted",
        payload: {},
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  });
  
  