import { UserMongooseModel } from "./mongoose/users.mongoose.js";

export default class UserModel {

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

    console.log('en el modelo ', email, password);
    
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


}

// export const userModel = new UserModel();