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
    
    async getUserByEmail(email) {
        try {
            return await UserModel.findOne({email: email},
                {
                    _id: true,
                    email: true,
                    firstName: true,
                    isAdmin: true,
                    password: true,
                });


        } catch (error) {
            return null
        }
    };

    async createUsers({ firstName, lastName, email, age, isAdmin, role, password }) {
        return await UserModel.create({ firstName, lastName, email, age, isAdmin, role, password }
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