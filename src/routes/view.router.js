import { Router } from "express";
import ProductManager from "../class/ProductManager.js";
const router = Router();

const productManager = new ProductManager("./products.json");

router.get("/", async (request, response) => {
  const res = await productManager.getProducts();
  response.render("index", { title: "Products", style: "home", products: res });
});

router.get("/realtimeproducts", (request, response) => {
  response.render("realTimeProducts", {
    title: "Real Time Products",
    style: "home",
  });
});
export default router;
