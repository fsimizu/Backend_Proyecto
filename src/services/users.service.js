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
            const user = await userModel.getUserById(id);
            if (user.role === 'admin' || user.role === 'premium') {
                user.isPremium = true;
            }
            else { user.isPremium = false }

            if (user.documents.some(doc => doc.name.includes("identification"))) {
                user.hasIdentification = true
            }
            else { user.hasIdentification = false }

            if (user.documents.some(doc => doc.name.includes("address"))) {
                user.hasAddress = true
            }
            else { user.hasAddress = false }

            if (user.documents.some(doc => doc.name.includes("account"))) {
                user.hasAccount = true
            }
            else { user.hasAccount = false }


            return user
        } catch (error) {
            return error
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

    async updateLastConnection({ _id }) {
        try {
            return await userModel.updateLastConnection({ _id });
        } catch (error) {
            logger.error(e);
            throw new Error('Error updating last connection. ' + e)
        }
    }

    async uploadDocument({ _id, document }) {
        const user = await userModel.getUserById(_id);
        user.documents.push(document);

        if (
            user.documents.some(doc => doc.name.includes("identification")) &&
            user.documents.some(doc => doc.name.includes("address")) &&
            user.documents.some(doc => doc.name.includes("account"))
        ) {
            user.verified = true
        }

        await user.save();
        return user
    }


    async switchRole(_id) {
        try {
            const user = await userModel.getUserById(_id);
            if (user.role === 'user' && user.verified) {
                user.role = 'premium';
            }
            else if (user.role === 'premium') {
                user.role = 'user';
            }
            else {
                throw new Error("The user is not verified and can't be promoted to premium.")
            }
            await user.save();
            return user
        } catch (e) {
            logger.error(e);
            throw new Error('Error in the user service. ' + e)
        }
    }

    async deleteInactiveUsers() {
        try {
            const hoursInactive = 2*24
            const usersdeleted = await userModel.deleteInactiveUsers(hoursInactive);
            return usersdeleted;
        } catch (error) {
            logger.error(e);
            throw new Error('Error in the user service. ' + e)
        }
    }
};

export const userService = new UserService()