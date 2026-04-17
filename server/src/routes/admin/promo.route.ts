import { Router } from "express";
import { requireAdmin } from "../../middleware/auth";
import {
  getPromo,
  postPromo,
  patchPromo,
  deletePromo,
} from "../../controller/admin/promo.controller";

export const adminPromoRouter = Router();

adminPromoRouter.use(requireAdmin);

adminPromoRouter.get("/promos", getPromo);
adminPromoRouter.post("/promos", postPromo);
adminPromoRouter.patch("/promos/:promoId", patchPromo);
adminPromoRouter.delete("/promos/:promoId", deletePromo);

adminPromoRouter.use(requireAdmin);
