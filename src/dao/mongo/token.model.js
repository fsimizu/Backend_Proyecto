import { TokensMongooseModel } from "./mongoose/token.mongoose.js";

export default class TokenModel {

  createToken({ email, token, expiration }) {
    return TokensMongooseModel.create({ email, token, expiration });
  };

  findToken({ email, token }) {
    return TokensMongooseModel.findOne({ token, email });
  };

}

// export const cartModel = new CartModel();