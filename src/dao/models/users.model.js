import { UserMongooseModel } from "./mongoose/users.mongoose.js";

class UserModel {

  getUsers() {
    return UserMongooseModel.find({},
      {
        _id: true,
        firstName: true,
        lastName: true,
        email: true
      }
    );
  }

  getUserByEmail(email) {
    return UserMongooseModel.findOne({ email: email },
      {
        _id: true,
        email: true,
        firstName: true,
        isAdmin: true,
        password: true,
      });
  }

  getUserById(id) {
    return UserMongooseModel.findById(id)
  }

  createUsers({ firstName, lastName, email, age, isAdmin, role, password }) {
    return UserMongooseModel.create({ firstName, lastName, email, age, isAdmin, role, password })
  }

  updateUsers({ _id, firstName, lastName, email }) {
    return UserMongooseModel.updateOne(
      { _id: _id },
      { firstName, lastName, email }
    )
  }

  deleteUsers(_id) {
    return UserMongooseModel.deleteOne({ _id: _id })
  }


}

export const userModel = new UserModel();