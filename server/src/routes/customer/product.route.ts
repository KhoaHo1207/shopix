import { Router } from "express";
import {
  getCategories,
  getProductById,
  getProducts,
} from "../../controller/customer/product.controller";

export const customerProductRouter = Router();

customerProductRouter.get("/categories", getCategories);
customerProductRouter.get("/products", getProducts);
customerProductRouter.get("/products/:id", getProductById);

export default customerProductRouter;
