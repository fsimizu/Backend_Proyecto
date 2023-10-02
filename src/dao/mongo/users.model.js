import { UserMongooseModel } from "./mongoose/users.mongoose.js";

export default class UserModel {

  getUsers() {
    return UserMongooseModel.find({},
      {
        _id: true,
        firstName: true,
        lastName: true,
        email: true,
        lastConnection: true,
        role: true,
        cart: true,
        verified: true,
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
        role: true,
        password: true,
        cart: true,
      });
  }

  getUserById(id) {
    return UserMongooseModel.findById(id)
  }

  createUsers({ firstName, lastName, email, age, isAdmin, role, password, cart }) {
    return UserMongooseModel.create({ firstName, lastName, email, age, isAdmin, role, password, cart })
  }

  updateUsers({ _id, firstName, lastName, email }) {
    return UserMongooseModel.updateOne(
      { _id: _id },
      { firstName, lastName, email }
    )
  }

  updatePassword({ email, password }) {
    return UserMongooseModel.updateOne(
      { email: email },
      { password }
    )
  }

  deleteUsers(_id) {
    return UserMongooseModel.deleteOne({ _id: _id })
  }

  assignCart(userId, cartId) {
    return UserMongooseModel.findByIdAndUpdate(userId, cartId, { new: true });
  }

  updateLastConnection({_id}) {
    const lastConnection = new Date();
    return UserMongooseModel.findByIdAndUpdate({ _id }, { lastConnection }, { new: true });
  }

  deleteInactiveUsers(hoursInactive) {
    return UserMongooseModel.deleteMany({ lastConnection: { $lt: new Date(Date.now() - hoursInactive * 1000 * 60 * 60) } });
  }

}

// export const userModel = new UserModel();