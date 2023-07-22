import { userModel } from "../dao/models/users.model.js";

class UserService {
    async getUsers() {
        return await UserModel.getUsers();
    };
    
    async getUserByEmail(email) {
        try {
            return await userModel.getUserByEmail(email)
        } catch (error) {
            return null
        }
    };

    async getUserById(id) {
        try {
            return await userModel.getUserById(id)
        } catch (error) {
            return null
        }
    };

    async createUsers({ firstName, lastName, email, age, isAdmin, role, password }) {
        return await userModel.createUsers({ firstName, lastName, email, age, isAdmin, role, password });
    };

    async updateUsers({ _id, firstName, lastName, email }) {
        return await userModel.updateUsers({ _id, firstName, lastName, email })
    }

    async deleteUsers(_id) {
        return await userModel.deleteUsers(_id);
    }
};

export const userService = new UserService()