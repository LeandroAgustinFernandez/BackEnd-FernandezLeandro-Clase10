import { Router } from "express";
import CartManager from "../class/CartManager.js";
const router = Router();

const cartManager = new CartManager("./carts.json");

router.post("/", async (request, response) => {
  let res = await cartManager.addCart();
  response.send({ ...res });
});

router.get("/:cid", async (request, response) => {
  let { cid } = request.params;
  let res = await cartManager.getCart(parseInt(cid));
  res?.error
    ? response.status(404).send({ ...res })
    : response.send({ cart: res });
});

router.post("/:cid/product/:pid", async (request, response) => {
  let { cid, pid } = request.params;
  let res = await cartManager.addProductToCart(parseInt(cid), parseInt(pid));
  res?.error
    ? response.status(400).send({ ...res })
    : response.send({ ...res });
});

export default router;