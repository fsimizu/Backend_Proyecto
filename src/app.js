import MongoStore from 'connect-mongo';
import express from 'express';
import handlebars from "express-handlebars";
import path from "path";
import { __dirname } from './config.js';
import { cartsApiRouter } from './routes/carts.api.router.js';
import { cartsRouter } from './routes/carts.router.js';
import { chatRouter } from './routes/chat.router.js';
import { loginRouter } from './routes/login.router.js';
import { productsApiRouter } from './routes/products.api.router.js';
import { productsRouter } from './routes/products.router.js';
import { usersApiRouter } from './routes/users.api.router.js';
import { connectMongo } from './utils/dbConnection.js';
import { connectSocketServer } from './utils/socketServer.js';

import cookieParser from 'cookie-parser';

import session from 'express-session';
import FileStore from 'session-file-store';

const app = express();
const port = 8080;
const fileStore = FileStore(session);

connectMongo();
// app.use(cookieParser());


app.use(session({
  secret: "ae5WE$gw4%HFg45w",
  resave: true,
  saveUninitialized: true,
  // store: new fileStore({ path: __dirname + '/sessions', ttl: 100, retries: 0})
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://fersimizu:ZogB7pClZEtkTnny@backend.yutifmg.mongodb.net/?retryWrites=true&w=majority",
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    ttl: 15
  })
}))


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"))

//para el handlebars
// app.engine("handlebars", handlebars.engine());

app.engine("handlebars", handlebars.engine({ 
  defaultLayout: "main", 
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true, 
  },
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.get('/', (req, res) => {
  const {firstName, email, role} = req.session.user ? req.session.user : "";
  return res.status(201).render('home', { firstName, email, role });
});

app.use("/api/products", productsApiRouter)
app.use("/api/carts", cartsApiRouter)
app.use("/products", productsRouter)
app.use("/carts", cartsRouter)
app.use("/api/users", usersApiRouter)
app.use("/chat", chatRouter)
app.use("/api/sessions", loginRouter)


const httpServer = app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
  })

connectSocketServer(httpServer);



