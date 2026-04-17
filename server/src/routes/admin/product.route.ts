import { Router } from "express";
import { requireAdmin } from "../../middleware/auth";
import upload from "../../utils/upload";
import {
  getProducts,
  postProduct,
  getCategories,
  getProductById,
  postCategory,
  putCategory,
  putProduct,
} from "../../controller/admin/product.controller";

export const adminProductRouter = Router();

adminProductRouter.use(requireAdmin);
// category routes
adminProductRouter.get("/categories", getCategories);
adminProductRouter.post("/categories", postCategory);
adminProductRouter.put("/categories/:id", putCategory);
// product routes
adminProductRouter.get("/products", getProducts);
adminProductRouter.post("/products", upload.array("images", 10), postProduct);
adminProductRouter.get("/products/:id", getProductById);
adminProductRouter.put("/products/:id", upload.array("images", 10), putProduct);

export default adminProductRouter;
