// import { userModel } from "../dao/mongo/users.model.js";
import { UserModel } from '../dao/factory.js';

const userModel = new UserModel();

class UserService {
    async getUsers() {
        return await userModel.getUsers();
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

    async createUsers({ firstName, lastName, email, age, isAdmin, role, password, cart }) {
        return await userModel.createUsers({ firstName, lastName, email, age, isAdmin, role, password, cart });
    };

    async updateUsers({ _id, firstName, lastName, email }) {
        return await userModel.updateUsers({ _id, firstName, lastName, email })
    }

    async deleteUsers(_id) {
        return await userModel.deleteUsers(_id);
    }
};

export const userService = new UserService()