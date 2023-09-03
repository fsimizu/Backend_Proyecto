// import { userModel } from "../dao/mongo/users.model.js";
import { UserModel } from '../dao/factory.js';
import { logger } from "../utils/logger.js";

const userModel = new UserModel();

class UserService {
    async getUsers() {
        return await userModel.getUsers();
    };
    
    async getUserByEmail(email) {
        try {
            return await userModel.getUserByEmail(email)
        } catch (error) {
            return error
        }
    };

    async getUserById(id) {
        try {
            return await userModel.getUserById(id)
        } catch (error) {
            return null
        }
    };

    async createUsers({ firstName, lastName, email, age, isAdmin, role, password, cart }) {
        return await userModel.createUsers({ firstName, lastName, email, age, isAdmin, role, password, cart });
    };

    async updateUsers({ _id, firstName, lastName, email }) {
        return await userModel.updateUsers({ _id, firstName, lastName, email })
    }

    async deleteUsers(_id) {
        return await userModel.deleteUsers(_id);
    }

    async switchRole(_id) {
        try {
            const user = await userModel.getUserById(_id);
            if (user.role === 'user') {
                user.role = 'premium';
            }
            else if (user.role === 'premium') {
                user.role = 'user';
            }
            await user.save();
            return user
        } catch (e) {
            logger.error(e);
            throw new Error('Error calling the model. ' + e)
        }
    }
};

export const userService = new UserService()