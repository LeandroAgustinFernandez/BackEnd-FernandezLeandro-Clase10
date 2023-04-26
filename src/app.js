import cartRouter from "./routes/cart.router.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/view.router.js";
import handlebars from "express-handlebars";
import express from "express";
import cors from 'cors'
import { __dirname, PORT } from "./utils.js";
import { Server } from "socket.io";

import ProductManager from "./class/ProductManager.js";
const productManager = new ProductManager("./products.json");

const app = express();

const socketio = app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
const io = new Server(socketio);

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);

app.set('socketio',io)

io.on("connection", async (socket) => {
  console.log(`cliente conectado`);
  const productos = await productManager.getProducts();
  socket.emit("products", productos);
});
