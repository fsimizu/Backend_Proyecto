import { UserModel } from "../dao/models/users.model.js";

class UserService {
    async getUsers() {
        return await UserModel.find({},
            {
              _id: true,
              firstName: true,
              lastName: true,
              email: true
            }
        );
    };

    async getUserByEmail(email,pass) {
        return await UserModel.find({email: email, pass: pass}
        );
    };

    async createUsers({ firstName, lastName, email, pass }) {
        return await UserModel.create({ firstName, lastName, email, pass }
        );
    };

    async updateUsers ( { _id, firstName, lastName, email } ) {
        return await UserModel.updateOne(
            { _id: _id },
            { firstName, lastName, email }
        );
    }

    async deleteUsers ( _id ) {
        return await UserModel.deleteOne({ _id: _id });
    }
};

export const userService = new UserService()