import MongoStore from 'connect-mongo';
import express from 'express';
import handlebars from "express-handlebars";
import session from 'express-session';
import passport from 'passport';
import path from "path";
import FileStore from 'session-file-store';
import { __dirname } from './config.js';
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
import { connectMongo } from './utils/dbConnection.js';
import { connectSocketServer } from './utils/socketServer.js';

const app = express();
const port = 8080;
// const fileStore = FileStore(session)

const httpServer = app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
})

connectMongo();
connectSocketServer(httpServer);

//CONFIG EXPRESS
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.use(express.static(path.join(__dirname, 'public')));
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
      mongoUrl: "mongodb+srv://fersimizu:ZogB7pClZEtkTnny@backend.yutifmg.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 30,
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

//CONFIG RUTAS
app.use("/api/products", productsApiRouter);
app.use("/api/carts", cartsApiRouter);
app.use("/api/users", usersApiRouter);
app.use("/api/sessions", loginRouter);
app.get("/api/sessions/github", passport.authenticate('github', { scope: ['user:email'] }));
app.get('/api/sessions/githubcallback', passport.authenticate('github', { failureRedirect: '/auth/error' }), (req, res) => {
  req.session.user = req.user.username;
  // Successful authentication, redirect home.
  res.redirect('/products');
});

app.use("/", viewsRouter);
app.use("/products", productsRouter);
app.use("/carts", cartsRouter);
app.use("/chat", chatRouter);
app.use("/auth", authRouter);
app.use("*", (_,res) => {
  return res.status(404).render('error', {code: 404, msg: "Site not found."})
});

