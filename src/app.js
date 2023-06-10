import express from 'express';
import handlebars from "express-handlebars";
import path from "path";
import { __dirname } from './config.js';
import { cartsApiRouter } from './routes/carts.api.router.js';
import { chatRouter } from './routes/chat.router.js';
import { productsApiRouter } from './routes/products.api.router.js';
import { productsRouter } from './routes/products.router.js';
import { usersApiRouter } from './routes/users.api.router.js';
import { connectMongo } from './utils/dbConnection.js';
import { connectSocketServer } from './utils/socketServer.js';

const app = express();
const port = 8080;

connectMongo();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"))

//para el handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.get('/', (_, res) => {
  return res.status(201).render('home', {});
  });

app.use("/api/products", productsApiRouter)
app.use("/api/carts", cartsApiRouter)
app.use("/products", productsRouter)

app.use("/api/users", usersApiRouter)

app.use("/chat", chatRouter)

const httpServer = app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
  })

connectSocketServer(httpServer);
