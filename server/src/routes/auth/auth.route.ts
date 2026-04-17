import { Router } from "express";
import { requiredAuth } from "../../middleware/auth";
import { me, sync } from "../../controller/auth/auth.controller";

export const authRouter = Router();

authRouter.post("/sync", requiredAuth, sync);
authRouter.get("/me", requiredAuth, me);
export default authRouter;
