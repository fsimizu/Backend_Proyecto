import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import express from 'express';
import handlebars from "express-handlebars";
import session from 'express-session';
// import jwt from 'jsonwebtoken';
import passport from 'passport';
import path from "path";
import { __dirname } from './config.js';
import env from './config/environment.config.js';
import { iniPassport } from './config/passport.config.js';
import { authRouter } from './routes/auth.router.js';
import { cartsApiRouter } from './routes/carts.api.router.js';
import { cartsRouter } from './routes/carts.router.js';
import { chatRouter } from './routes/chat.router.js';
import { loginRouter } from './routes/login.router.js';
import { productsApiRouter } from './routes/products.api.router.js';
import { productsRouter } from './routes/products.router.js';
import { usersApiRouter } from './routes/users.api.router.js';
import { viewsRouter } from './routes/views.router.js';
// import { connectMongo } from './utils/dbConnection.js';
import { connectSocketServer } from './utils/socketServer.js';
import compression from "express-compression";
import errorHandler from "./middlewares/error.js";
import { logger, addLogger } from './utils/logger.js';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

const app = express();
const port = env.port;

app.use(addLogger);

app.get("/loggertest", (req, res) => {
  req.logger.silly("log de un silly");
  req.logger.debug("log de un debug");
  req.logger.info("log de una info");
  req.logger.warn("log de una warn");
  req.logger.error("log de una error");
  return res.json("testing")
});

app.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);

//app.use(cors()); //esto se deberia restringir solo a la url donde se depliega el front.

const httpServer = app.listen(port, () => {
  logger.info(`Example app listening on port http://localhost:${port}`);
})

connectSocketServer(httpServer);

//Swagger
const swaggerOptions = {
  definition: {
      openapi: "3.0.1",
      info: {
          title: "E-commerce application",
          description: "This in an e-commerce app",
      },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};
const specs = swaggerJSDoc(swaggerOptions);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

//CONFIG EXPRESS
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser('coder-secret'));
app.use(express.static('public'));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");
app.engine("handlebars", handlebars.engine({ 
  defaultLayout: "main", 
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true, 
  },
  })
);

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: env.mongoUrl,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 999,
      dbName: "ecommerce",
    }),
    secret: "ae5WE$gw4%HFg45w",
    resave: true,
    saveUninitialized: true,
    // store: new fileStore({ path: __dirname + '/sessions', ttl: 100, retries: 0})
  }))

iniPassport();
app.use(passport.initialize());
app.use(passport.session());


//MULTERRRRR - Falla el uploader!
import { uploader } from './utils/multer.js';
app.post("/upload", uploader.single("file"),
(req,res) =>  {res.send("ok")} )
// uploader.single("file"), (req,res)=>{
//   res.send("ok")
// })



//CONFIG RUTAS API
app.use("/api/products", productsApiRouter);
app.use("/api/carts", cartsApiRouter);
app.use("/api/users", usersApiRouter);
app.use("/api/sessions", loginRouter);

//CONFIG RUTAS VIEWS
app.use("/", viewsRouter);
app.use("/products", productsRouter);
app.use("/carts", cartsRouter);
app.use("/chat", chatRouter);
app.use("/auth", authRouter);

//desafio mocking
import { faker } from '@faker-js/faker';
app.use("/mockingproducts", (req, res) => {
  const products = [];
  for (let i = 0; i < 100; i++) {
    products.push({
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      category: faker.commerce.department(),
      price: faker.commerce.price({ min: 1000, max: 10000 }),
      thumbnail: faker.image.urlLoremFlickr({ category: 'food' }),
      code: faker.string.uuid(),
      stock: faker.commerce.price({ min: 0, max: 20, dec: 0 }),
    });
  }
  return res.json({ products })
}
);

//ERROR HANDLER
app.use(errorHandler);

app.use("*", (_,res) => {
  return res.status(404).render('error', {code: 404, msg: "Site not found."})
});

// const SECRET = 'coderSecret';
// app.use('/api/jwt-login', (req, res) => {
//   const { email, password } = req.body;
//   // console.log(email, password);
//   if (email == 'pepe@pepe.com' && password == '123') {
//     const token = jwt.sign({ email, role: 'user' }, SECRET, { expiresIn: '24h' });

//     return res
//       .cookie('token', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
//       .status(200)
//       .json({
//         status: 'success',
//         msg: 'login success!!',
//         payload: token,
//       });
//   } else {
//     return res.status(400).json({
//       status: 'error',
//       msg: 'no se puede ingresar',
//       data: {},
//     });
//   }
// });

// app.get('/api/jwt-profile', passportCall('jwt'), checkAuth('admin'), (req, res) => {
//   console.log('hola');
//   return res.json({ user: req.user });
// });

// app.get('/api/jwt-profile', passport.authenticate('jwt', {session: false}), (req, res) => {
//   return res.json({ user: req.user });
// });

// app.get('/api/jwt-profile', (req, res) => {
//   const token = req.cookies.token;
//   // const token = req.headers['authorization'].split(' ')[1];
//   console.log(token);
//   try {
//     const decoded = jwt.verify(token, SECRET);
//     return res.status(200).json({
//       status: 'success',
//       msg: 'your profile',
//       payload: decoded,
//     });
//   } catch (error) {
//     return res.status(401).json({
//       status: 'error',
//       msg: 'Unauthorized',
//       payload: {},
//     })
//   }
// });
