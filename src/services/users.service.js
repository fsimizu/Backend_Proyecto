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

    async createUsers({ firstName, lastName, email }) {
        return UserModel.create({ firstName, lastName, email }
        );
    };

    async updateUsers ( {_id, firstName, lastName, email} ) {
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