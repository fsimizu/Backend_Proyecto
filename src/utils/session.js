import session from 'express-session';
import MongoStore from 'connect-mongo';
import env from '../config/environment.config.js';

export const sessionMiddleware = session({
    store: MongoStore.create({
      mongoUrl: env.mongoUrl,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 999,
      dbName: "ecommerce",
    }),
    secret: "ae5WE$gw4%HFg45w",
    resave: true,
    saveUninitialized: true,
  })