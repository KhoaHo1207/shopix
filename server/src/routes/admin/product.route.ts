import { Router } from "express";
import { requireAdmin } from "../../middleware/auth";

export const adminProductRouter = Router();

adminProductRouter.use(requireAdmin);

export default adminProductRouter;
