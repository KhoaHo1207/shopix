import { Router, type Request, type Response } from "express";
import { requireAdmin } from "../../middleware/auth";
import { asyncHandler } from "../../utils/asyncHandler";
import { Product } from "../../models/Product";
import { Category } from "../../models/Category";
import { Order } from "../../models/Order";
import { ok } from "../../utils/envelop";

type TotalSaleRow = {
  _id: null;
  totalSales: number;
};

export const getDashboard = asyncHandler(
  async (_req: Request, res: Response) => {
    const [
      totalProducts,
      totalCategories,
      totalOrders,
      totalReturnedOrders,
      salesRows,
    ] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      Order.countDocuments(),
      Order.countDocuments({ orderStatus: "returned" }),
      Order.aggregate<TotalSaleRow>([
        { $match: { paymentStatus: "paid" } },
        { $group: { _id: null, totalSales: { $sum: "$totalAmount" } } },
      ]),
    ]);

    res.status(200).json(
      ok({
        totalProducts,
        totalCategories,
        totalSales: salesRows[0]?.totalSales || 0,
        totalOrders,
        totalReturnedOrders,
      })
    );
  }
);
