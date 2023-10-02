import CustomError from "../services/errors/custom-error.js";
import EErros from "../services/errors/enums.js";
import { generateUserErrorInfo } from "../services/errors/info.js";
import { userService } from "../services/users.service.js";
import { logger } from "../utils/logger.js";
import { GetUsersDTO } from "../dao/DTO/users.dto.js";

class UserController {

    getAll = async (_, res) => {
        try {
            const users = await userService.getUsers();
            const filteredUsers = new GetUsersDTO(users)
            return res.status(200).json({
                status: "Success",
                msg: "List of users",
                payload: filteredUsers,
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
                        status: "Success",
                        msg: "User updated",
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
        try {
            if (!req.files) {
                return res.status(400).json({
                    status: "Error",
                    msg: "No file uploaded",
                    payload: {},
                });
            }
            return res.status(200).json({
                status: "Success",
                msg: "Photo updated",
                payload: {},
            });
        } catch (e) {
            logger.error(e);
            return res.status(500).json({
                status: "Error",
                msg: "Something went wrong :(",
                payload: {},
            });
        }
    }

    uploadDocument = async (req, res) => {
        try {
            const {_id} = req.params
            const document = {
                name: req.files[0].filename,
                reference: req.files[0].path
            }

            if (req.files.length < 1) {
                throw new Error ("No files selected")
            }

            const user = await userService.uploadDocument({_id, document});
            return res.status(200).redirect(`/users/${_id}`);

        } catch (e) {
            logger.error(e);
            return res.status(500).render('error', { code: 500, msg: e })
        }
    }

    switchRole = async (req, res) => {
        try {
            const { _id } = req.params;
            const { role } = await userService.switchRole(_id);
            
            if (req.session.user._id === _id) {
                req.session.user.role = role;
            }

            return res.status(200).json({
                status: "Success",
                msg: `The user has now a role ${role}`,
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
        const { isAdmin } = req.session.user;
        const user = await userService.getUserById(_id);

        return res
                .status(201)
                .render('users-edit', {user, isAdmin});
    }

    viewAll = async (req, res) => {
        const users = await userService.getUsers();
        const { cart, _id } = req.session.user;
        return res
                .status(201)
                .render('users-all', {users, _id, cart });
    }

    viewProfile = async (req, res) => {
        const { _id } = req.params;
        const user = await userService.getUserById(_id);
        return res
                .status(201)
                .render('users-profile', {user});
    }

    viewDocuments = async (req, res) => {
        const { _id } = req.params;
        const user = await userService.getUserById(_id);
        return res
                .status(201)
                .render('users-documents', {user});
    }

    deleteInactiveUsers = async (req, res) => {
        try {
            const inactiveUsers = await userService.deleteInactiveUsers();
            
            if (inactiveUsers.deletedCount > 0) {
                return res.status(200).json({
                    status: "Success",
                    msg: `${inactiveUsers.deletedCount} user(s) deleted.`,
                    payload: {},
                });
            }
            else {
                return res.status(200).json({
                    status: "Success",
                    msg: "No users deleted. All users are active.",
                    payload: {},
                });
            }
        } catch (e) {
            logger.error(e);
            return res.status(500).json({
                status: "Unexpected error",
                msg: "Error deleting inactive users",
                payload: {},
            });
        }
    }

}

export const userController = new UserController();