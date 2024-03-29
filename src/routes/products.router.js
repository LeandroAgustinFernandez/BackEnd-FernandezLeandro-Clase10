import { Router } from "express";
import ProductManager from "../class/ProductManager.js";
const router = Router();

const productManager = new ProductManager("./products.json");

router.get("/", async (request, response) => {
  let { limit } = request.query;
  let res = await productManager.getProducts(limit);
  response.send({ products: res });
});

router.get("/:pid", async (request, response) => {
  let { pid } = request.params;
  let res = await productManager.getProductById(pid);
  res?.error
    ? response.status(404).send({ ...res })
    : response.send({ product: res });
});

router.post("/", async (request, response) => {
  const io = request.app.get("socketio");
  let res = await productManager.addProduct(request.body);
  let res2 = await productManager.getProducts();
  response.send(res)
  io.emit('products',res2)
});

router.delete("/:pid", async (request, response) => {
  let { pid } = request.params;
  const io = request.app.get("socketio"); 
  let res = await productManager.deleteProduct(parseInt(pid));
  let res2 = await productManager.getProducts();
  response.send(res)
  io.emit('products',res2)
});

router.put("/:pid", async (request, response) => {
  let { pid } = request.params;
  let res = await productManager.updateProduct(parseInt(pid), request.body);
  res?.error
    ? response.status(400).send({ ...res })
    : response.send({ product: res });
});


export default router;
