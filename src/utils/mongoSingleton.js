import { connect } from "mongoose";
import env from '../config/environment.config.js';

export default class MongoSingleton {
  static instance;

  constructor() {
    connect(
      env.mongoUrl,
      {
        dbName: "ecommerce",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }

  static getInstance() {
    if (this.instance) {
      console.log("Already connected!");
      return this.instance;
    }

    this.instance = new MongoSingleton();
    console.log("Connected to mongo!");
    return this.instance;
  }
}