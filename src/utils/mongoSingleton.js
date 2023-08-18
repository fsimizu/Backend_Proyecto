import { connect } from "mongoose";
import env from '../config/environment.config.js';
import { logger } from "./logger.js";

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
      logger.info("Already connected!");
      return this.instance;
    }

    this.instance = new MongoSingleton();
    logger.info("Connected to mongo!")
    return this.instance;
  }
}