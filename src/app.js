import cookieParser from 'cookie-parser';
import express from 'express';
import "express-async-errors";
import compression from "express-compression";
import handlebars from "express-handlebars";
import passport from 'passport';
import path from "path";
import swaggerUiExpress from "swagger-ui-express";
import { __dirname } from './config.js';
import env from './config/environment.config.js';
import { iniPassport } from './config/passport.config.js';
import errorHandler from "./middlewares/error.js";
import { authRouter } from './routes/auth.router.js';
import { cartsApiRouter } from './routes/carts.api.router.js';
import { cartsRouter } from './routes/carts.router.js';
import { chatRouter } from './routes/chat.router.js';
import { loginRouter } from './routes/login.router.js';
import { productsApiRouter } from './routes/products.api.router.js';
import { productsRouter } from './routes/products.router.js';
import { usersApiRouter } from './routes/users.api.router.js';
import { usersRouter } from './routes/users.router.js';
import { viewsRouter } from './routes/views.router.js';
import { addLogger, logger, loggerTest } from './utils/logger.js';
import { createMockProducts } from './utils/mocking.js';
import { sessionMiddleware } from './utils/session.js';
import { connectSocketServer } from './utils/socketServer.js';
import { specs } from './utils/swagger.js';

const app = express();
const port = env.port;
app.use(addLogger);
app.use(compression({ brotli: { enabled: true, zlib: {} } }));

const httpServer = app.listen(port, () => {
  logger.info(`Example app listening on port http://localhost:${port}`);
})
connectSocketServer(httpServer);

//SWAGGER DOCUMENTATION
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

//CONFIG EXPRESS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('coder-secret'));
app.use(express.static('public'));

//HANDLEBARS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");
app.engine("handlebars", handlebars.engine({
  defaultLayout: "main",
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
}));

//MONGO SESSION
app.use(sessionMiddleware);

//PASSPORT
iniPassport();
app.use(passport.initialize());
app.use(passport.session());

//CONFIG RUTAS API
app.use("/api/products", productsApiRouter);
app.use("/api/carts", cartsApiRouter);
app.use("/api/users", usersApiRouter);
app.use("/api/sessions", loginRouter);

//CONFIG RUTAS VIEWS
app.use("/", viewsRouter);
app.use("/products", productsRouter);
app.use("/carts", cartsRouter);
app.use("/users", usersRouter);
app.use("/chat", chatRouter);
app.use("/auth", authRouter);

//DESAFIOS MOCKING Y LOGGER
app.use("/mockingproducts", createMockProducts);
app.get("/loggertest", loggerTest);

//ERROR HANDLER
app.use(errorHandler);

//FALLBACK
app.use("*", (_, res) => {
  return res.status(404).render('error', { code: 404, msg: "Site not found." })
});