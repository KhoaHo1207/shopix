import { Router } from "express";
import { requireAdmin } from "../../middleware/auth";
import {
  getBanners,
  postBanner,
} from "../../controller/admin/setting.controller";
import upload from "../../utils/upload";

export const adminSettingRouter = Router();

adminSettingRouter.use(requireAdmin);

adminSettingRouter.get("/settings/banners", getBanners);
adminSettingRouter.post(
  "/settings/banners",
  upload.array("images", 10),
  postBanner
);

adminSettingRouter.use(requireAdmin);
