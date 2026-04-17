import { Router } from "express";
import {
  getAddress,
  postAddress,
  patchAddress,
  deleteAddress,
} from "../../controller/customer/address.controller";
import { requiredAuth } from "../../middleware/auth";

export const customerAddressRouter = Router();

customerAddressRouter.use(requiredAuth);

customerAddressRouter.get("/addresses", getAddress);
customerAddressRouter.post("/addresses", postAddress);
customerAddressRouter.patch("/addresses/:addressId", patchAddress);
customerAddressRouter.delete("/addresses/:addressId", deleteAddress);

export default customerAddressRouter;
