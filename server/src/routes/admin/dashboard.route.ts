import { Router } from "express";
import { requireAdmin } from "../../middleware/auth";
import { getDashboard } from "../../controller/admin/dashboard.controller";

export const adminDashboardRouter = Router();

adminDashboardRouter.use(requireAdmin);

adminDashboardRouter.get("/dashboard/lite", getDashboard);

export default adminDashboardRouter;
