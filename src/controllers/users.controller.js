import { userService } from "../services/users.service.js";
import CustomError from "../services/errors/custom-error.js";
import EErros from "../services/errors/enums.js";
import { generateUserErrorInfo } from "../services/errors/info.js";
import { logger } from "../utils/logger.js";

import { uploader } from "../utils/multer.js";

class UserController {

    getAll = async (_, res) => {
        try {
            const users = await userService.getUsers();

            return res.status(200).json({
                status: "success",
                msg: "listado de usuarios",
                payload: users,
            });
        } catch (e) {
            logger.error(e);
            return res.status(500).json({
                status: "error",
                errorCode: e.code,
                errorName: e.name,
                errorMessage: e.message,
                errorCause: e.cause,
            });
        }
    }

    postOne = async (req, res) => {
        try {
            const { firstName, lastName, email } = req.body;

            if (!firstName || !lastName || !email) {
                CustomError.createError({
                    name: "User creation error",
                    cause: generateUserErrorInfo({ firstName, lastName, email }),
                    message: "Error trying to create user",
                    code: EErros.INVALID_TYPES_ERROR,
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
        } catch (error) {
            return res.status(500).json({
                status: "error",
                errorCode: e.code,
                errorName: e.name,
                errorMessage: e.message,
                errorCause: e.cause,
            });

        }
    }


    editOne = async (req, res) => {
        try {
            const { _id } = req.params;
            const { firstName, lastName, email } = req.body;

            if (!firstName || !lastName || !email) {
                CustomError.createError({
                    name: "User creation error",
                    cause: generateUserErrorInfo({ firstName, lastName, email }),
                    message: "Error trying to create user",
                    code: EErros.INVALID_TYPES_ERROR,
                });
            }

            try {
                const userUpdated = await userService.updateUsers({ _id: _id, firstName, lastName, email });
                if (userUpdated.matchedCount) {
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
                    errorCode: e.code,
                    errorName: e.name,
                    errorMessage: e.message,
                    errorCause: e.cause,
                });

            }


        } catch (e) {
            return res.status(500).json({
                status: "error",
                errorCode: e.code,
                errorName: e.name,
                errorMessage: e.message,
                errorCause: e.cause,
            });
        }
    }

    deleteOne = async (req, res) => {
        try {
            const { _id } = req.params;
            await userService.deleteUsers((_id));
            return res.status(200).json({
                status: "success",
                msg: "user deleted",
                payload: {},
            });
        } catch (e) {
            logger.error(e);
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                payload: {},
            });
        }
    }

    uploadFile = async (req, res) => {
        
//Crear un endpoint en el router de usuarios api/users/:uid/documents con el método POST 
// que permita subir uno o múltiples archivos. Utilizar el middleware de Multer para poder recibir 
// los documentos que se carguen y actualizar en el usuario su status para hacer saber que 
// ya subió algún documento en particular.

        try {
            if (!req.files) {
                return res.status(400).json({
                    status: "error",
                    msg: "No file uploaded",
                    payload: {},
                });
            }
            const { _id } = req.params;
            
            console.log(req.files);
            
            return res.status(200).json({
                status: "success",
                msg: "user deleted",
                payload: {},
            });

        } catch (e) {
            logger.error(e);
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                payload: {},
            });
        }
    }

    switchRole = async (req, res) => {
        try {
            const { _id } = req.params;
            const { role } = await userService.switchRole(_id);

            return res.status(200).json({
                status: "success",
                msg: `user ${_id} has now a role ${role}`,
                payload: {},
            });

        } catch (e) {
            logger.error('Error in the user controller. ' + e.message);
            return res.status(500).json({
                status: "error",
                errorCode: e.code,
                errorName: e.name,
                errorMessage: e.message,
                errorCause: e.cause,
            });
        }
    }

    viewOne = async (req, res) => {
        const { _id } = req.params;
        const user = await userService.getUserById(_id);
        return res
                .status(201)
                .render('users-edit', {user});
    }

    viewAll = async (req, res) => {
        const users = await userService.getUsers();
        return res
                .status(201)
                .render('users-all', {users});
    }

}

export const userController = new UserController();