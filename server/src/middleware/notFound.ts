import type { Request, Response, NextFunction } from "express";
import { fail } from "../utils/envelop";

export function notFound(req: Request, res: Response) {
  return res.status(404).json(fail(`Route not found ${req.method}`));
}
