import { Router } from "express";
import { requireAdmin } from "../../middleware/auth";
import { getOrders, patchOrder } from "../../controller/admin/order.controller";

export const adminOrderRouter = Router();

adminOrderRouter.use(requireAdmin);

adminOrderRouter.get("/orders", getOrders);
adminOrderRouter.patch("/orders/:orderId/status", patchOrder);

adminOrderRouter.use(requireAdmin);
