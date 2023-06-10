import { connect } from "mongoose";

export async function connectMongo() {
    try {
      await connect(
        "mongodb+srv://fersimizu:ZogB7pClZEtkTnny@backend.yutifmg.mongodb.net/?retryWrites=true&w=majority",
        {
          dbName: "ecommerce"
        }
      );
      console.log("plugged to mongo!");
    } catch (e) {
      console.log(e);
      throw "cannot connect to the db";
    }
  }